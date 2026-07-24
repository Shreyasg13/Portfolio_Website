#!/usr/bin/env bash
#
# encode-avatar.sh — build the six avatar-state video/poster sets consumed
# by src/avatar/avatarManifest.js from six raw source clips.
#
# Usage:
#   ./scripts/encode-avatar.sh [path/to/raw/clips]
#
# Expects six source files named "{state}_raw.mp4" (one per avatar state)
# in the given directory (default: current directory). For each state this:
#   1. Builds a seamless ping-pong loop (forward + reversed) from the raw clip.
#   2. Encodes that loop to three outputs in public/avatar/:
#        {state}.webm  — AV1/libsvtav1, primary
#        {state}.mp4   — H.264, Safari fallback
#        {state}.jpg   — poster frame
#   3. After all six states are encoded, reports each output file's size and
#      warns if any state's combined output exceeds 400KB, or if the total
#      across all 18 files exceeds 2.5MB.
#
# See public/avatar/README.md for how to produce the raw source clips.

set -euo pipefail

STATES=(idle listening thinking reasoning speaking complete)

SRC_DIR="${1:-.}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
OUT_DIR="${REPO_ROOT}/public/avatar"

STATE_SIZE_WARN_BYTES=$((400 * 1024))
TOTAL_SIZE_WARN_BYTES=$((2500 * 1024))

if ! command -v ffmpeg >/dev/null 2>&1; then
  echo "ERROR: ffmpeg not found on PATH. Install ffmpeg (with libsvtav1 and libx264 support) and try again." >&2
  exit 1
fi

mkdir -p "${OUT_DIR}"

echo "Source clips dir: ${SRC_DIR}"
echo "Output dir:       ${OUT_DIR}"
echo

for s in "${STATES[@]}"; do
  raw="${SRC_DIR}/${s}_raw.mp4"
  loop="${SRC_DIR}/${s}_loop.mp4"

  if [ ! -f "${raw}" ]; then
    echo "ERROR: missing source clip: ${raw}" >&2
    exit 1
  fi

  echo "== ${s} =="

  echo "-- building ping-pong loop"
  ffmpeg -y -i "${raw}" -filter_complex \
    "[0]split[a][b];[b]reverse[r];[a][r]concat=n=2:v=1[out]" \
    -map "[out]" "${loop}"

  echo "-- encoding AV1 webm"
  ffmpeg -y -i "${loop}" -c:v libsvtav1 -crf 38 -preset 6 \
    -vf "scale=720:-2,fps=24" -an "${OUT_DIR}/${s}.webm"

  echo "-- encoding H.264 mp4 (Safari fallback)"
  ffmpeg -y -i "${loop}" -c:v libx264 -crf 26 -preset slow \
    -vf "scale=720:-2,fps=24" -pix_fmt yuv420p -movflags +faststart \
    -an "${OUT_DIR}/${s}.mp4"

  echo "-- extracting poster jpg"
  ffmpeg -y -i "${loop}" -vframes 1 "${OUT_DIR}/${s}.jpg"

  echo
done

echo "== size report =="

total_bytes=0

for s in "${STATES[@]}"; do
  state_bytes=0
  for ext in webm mp4 jpg; do
    f="${OUT_DIR}/${s}.${ext}"
    if [ -f "${f}" ]; then
      bytes=$(wc -c < "${f}" | tr -d ' ')
    else
      bytes=0
    fi
    printf '%-40s %10d bytes\n' "${f}" "${bytes}"
    state_bytes=$((state_bytes + bytes))
    total_bytes=$((total_bytes + bytes))
  done

  if [ "${state_bytes}" -gt "${STATE_SIZE_WARN_BYTES}" ]; then
    echo "WARNING: ${s} combined output is ${state_bytes} bytes, exceeding the 400KB per-state budget"
  fi
  echo
done

echo "Total across all 18 files: ${total_bytes} bytes"

if [ "${total_bytes}" -gt "${TOTAL_SIZE_WARN_BYTES}" ]; then
  echo "WARNING: total avatar asset size ${total_bytes} bytes exceeds the 2.5MB budget"
fi
