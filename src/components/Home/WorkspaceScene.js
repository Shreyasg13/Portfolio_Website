import React from "react";

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

      <div className="ws-desk ws-desk-no-monitors">
        {/* Code/Grafana monitor cards removed here (were .ws-monitor-row) —
            per the overhaul spec's D8: once the presenter (AvatarStage)
            occupies this space at full size, small competing UI mockups
            read as clutter rather than context. The skyline background
            above and the whiteboard/coffee/keyboard accessory row below
            stay as ambient desk framing. */}
        {/* Whiteboard (light-colored sketch board) removed here — it
            collided with the avatar twice already (a right-anchored
            avatar avoided it; centering the avatar back for the large
            "dominant figure" treatment reintroduced the collision,
            confirmed by an actual local screenshot showing its light
            background bleeding out from behind the character). Coffee
            and the keyboard glow stay as smaller, non-colliding ambient
            details. */}
        <div className="ws-accessory-row">
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
