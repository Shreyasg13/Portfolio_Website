// Drives the DigitalTwinAvatar's mouth from the *real* volume of the TTS
// audio, via the browser's built-in Web Audio API — no new dependency.
//
// Two Web Audio details that are easy to get wrong and would either go
// silent or throw:
// 1. Once an <audio> element is wrapped in createMediaElementSource(),
//    the browser stops routing it straight to the speakers — the graph
//    must be reconnected through to audioContext.destination or
//    playback goes silent.
// 2. createMediaElementSource() can only be called ONCE per <audio>
//    element ever. speak() constructs a new Audio() per response, so a
//    fresh source node is created per attach() call; the AudioContext
//    itself is created once (lazily, on first attach — construction
//    should follow a user gesture, which is already guaranteed since
//    speak() only ever runs from a user-initiated ask()) and reused.
let audioCtx = null;
let analyser = null;
let currentSource = null;
let dataArray = null;

function ensureContext() {
  if (audioCtx) return;
  const AudioCtx = window.AudioContext || window.webkitAudioContext;
  if (!AudioCtx) return;
  audioCtx = new AudioCtx();
  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  dataArray = new Uint8Array(analyser.frequencyBinCount);
}

// Exposed separately from attach() so a caller can resume the shared
// AudioContext synchronously inside a real user gesture (see
// HeroGlass.js's unlockMobileAudio) even before any <audio> element
// exists to attach to yet — iOS Safari creates every new AudioContext
// already suspended unless resume() happens inside that gesture's call
// stack, and attach() only ever runs later, after ask()'s `await
// fetch(...)` for the AI's answer has already left that gesture behind.
function primeContext() {
  ensureContext();
  if (audioCtx && audioCtx.state === "suspended") audioCtx.resume();
}

function attach(audioEl) {
  ensureContext();
  if (!audioCtx || !audioEl) return;
  if (audioCtx.state === "suspended") audioCtx.resume();
  try {
    currentSource = audioCtx.createMediaElementSource(audioEl);
    currentSource.connect(analyser);
    analyser.connect(audioCtx.destination);
  } catch {
    // Already-wrapped element (StrictMode double-invoke, or a retry on
    // the same Audio instance) — safe to ignore, the existing graph
    // still works.
  }
}

function getLevel() {
  if (!analyser || !dataArray) return 0;
  analyser.getByteTimeDomainData(dataArray);
  let sumSquares = 0;
  for (let i = 0; i < dataArray.length; i++) {
    const centered = (dataArray[i] - 128) / 128;
    sumSquares += centered * centered;
  }
  return Math.sqrt(sumSquares / dataArray.length);
}

function useSpeechAmplitude() {
  return { attach, getLevel, primeContext };
}

export default useSpeechAmplitude;
