import React from "react";

const CODE_LINES = [
  { w: "82%", c: "#7c5bd8" },
  { w: "58%", c: "#3fd092" },
  { w: "70%", c: "#e0a02a" },
  { w: "40%", c: "#46b7ff" },
  { w: "64%", c: "#e0452a" },
  { w: "30%", c: "#7c5bd8" },
];

const POD_STATUS = ["ok", "ok", "warn", "ok", "ok", "ok", "ok", "warn", "ok"];

const STICKY_NOTES = [
  { rotate: -6, color: "#f2c14e" },
  { rotate: 4, color: "#6bc78a" },
  { rotate: -3, color: "#6bb1f2" },
];

const BUILDINGS = [
  { h: 30, w: 11 },
  { h: 48, w: 14 },
  { h: 24, w: 9 },
  { h: 40, w: 12 },
  { h: 56, w: 16 },
  { h: 32, w: 11 },
  { h: 44, w: 13 },
  { h: 26, w: 10 },
];

// Buildings are laid out left-to-right by walking a running x offset, then
// a few of their windows (skipped on a stride so they don't all line up)
// get the twinkle animation — built once as plain SVG here rather than a
// separate asset so the whole scene can be styled/recolored from style.css
// like every other decorative element in this hero.
function buildSkyline() {
  const rects = [];
  let x = 0;
  BUILDINGS.forEach((b, i) => {
    rects.push(<rect key={`b-${i}`} x={x} y={70 - b.h} width={b.w} height={b.h} className="ws-building" />);
    const rows = Math.floor(b.h / 10);
    for (let r = 0; r < rows; r++) {
      if ((i + r) % 3 !== 0) continue;
      rects.push(
        <rect
          key={`w-${i}-${r}`}
          x={x + b.w / 2 - 1.5}
          y={70 - b.h + 6 + r * 10}
          width={3}
          height={3}
          className="ws-window"
          style={{ animationDelay: `${((i * 3 + r) % 7) * 0.6}s` }}
        />
      );
    }
    x += b.w + 4;
  });
  return rects;
}

const SKYLINE_RECTS = buildSkyline();

function WorkspaceScene() {
  return (
    <div className="ws-scene" aria-hidden="true">
      <svg className="ws-skyline" viewBox="0 0 320 70" preserveAspectRatio="none">
        {SKYLINE_RECTS}
      </svg>

      <div className="ws-desk">
        <div className="ws-monitor-row">
          <div className="ws-monitor ws-monitor-code">
            <div className="ws-win-chrome">
              <span /><span /><span />
              <b>editor.tsx</b>
            </div>
            <div className="ws-code-body">
              <div className="ws-code-sidebar">
                <i /><i /><i /><i /><i />
              </div>
              <div className="ws-code-lines">
                {CODE_LINES.map((l, i) => (
                  <div key={i} className="ws-code-line" style={{ width: l.w, background: l.c }} />
                ))}
                <div className="ws-code-cursor" />
              </div>
            </div>
          </div>

          <div className="ws-monitor ws-monitor-grafana">
            <div className="ws-win-chrome">
              <span /><span /><span />
              <b>grafana</b>
            </div>
            <svg className="ws-chart" viewBox="0 0 100 30" preserveAspectRatio="none">
              <path className="ws-chart-area" d="M0 26 L12 20 L22 23 L34 12 L45 18 L56 8 L67 15 L78 6 L88 13 L100 5 L100 30 L0 30 Z" />
              <path className="ws-chart-line" d="M0 26 L12 20 L22 23 L34 12 L45 18 L56 8 L67 15 L78 6 L88 13 L100 5" />
            </svg>
            <div className="ws-pods">
              {POD_STATUS.map((s, i) => (
                <i key={i} className={`ws-pod ws-pod-${s}`} style={{ animationDelay: `${(i % 5) * 0.4}s` }} />
              ))}
            </div>
            <div className="ws-stat-row">
              <b>CPU <em>64%</em></b>
              <b>MEM <em>2.1G</em></b>
            </div>
          </div>
        </div>

        <div className="ws-accessory-row">
          <div className="ws-whiteboard">
            <svg className="ws-sketch" viewBox="0 0 80 40">
              <circle cx="14" cy="12" r="6" className="ws-sketch-node" />
              <circle cx="44" cy="26" r="6" className="ws-sketch-node" />
              <circle cx="68" cy="10" r="6" className="ws-sketch-node" />
              <path d="M18 15 L40 24" className="ws-sketch-edge" />
              <path d="M50 22 L63 13" className="ws-sketch-edge" />
            </svg>
            <div className="ws-sticky-row">
              {STICKY_NOTES.map((n, i) => (
                <span
                  key={i}
                  className="ws-sticky"
                  style={{ background: n.color, transform: `rotate(${n.rotate}deg)` }}
                />
              ))}
            </div>
          </div>

          <div className="ws-coffee">
            <span className="ws-steam ws-steam-1" />
            <span className="ws-steam ws-steam-2" />
            <span className="ws-steam ws-steam-3" />
            <div className="ws-cup" />
          </div>

          <div className="ws-keyboard">
            <div className="ws-keyboard-glow" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkspaceScene;
