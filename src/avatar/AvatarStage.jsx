import React, { useEffect, useState } from "react";
import VideoAvatar from "./VideoAvatar";

// A hero that renders nothing is far worse than a hero that renders a
// cartoon — this catches render-time exceptions from VideoAvatar (video
// element load/decode errors are DOM events, not exceptions, and are
// handled separately via VideoAvatar's onError callback below; this
// boundary is the belt-and-suspenders layer for anything unexpected).
class AvatarErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch() {}

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

function useSaveData() {
  const [saveData, setSaveData] = useState(false);
  useEffect(() => {
    const conn = navigator.connection || navigator.webkitConnection || navigator.mozConnection;
    if (conn) setSaveData(!!conn.saveData);
  }, []);
  return saveData;
}

// Fallback ladder (AVATAR_UI_OVERHAUL.md section 4):
//   prefers-reduced-motion -> static poster JPG only
//   video/poster load error -> `fallback` (DigitalTwinAvatar SVG)
//   save-data: on           -> static poster JPG only
//   otherwise                -> VideoAvatar
function AvatarStage({ state, reduceMotion, fallback }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const saveData = useSaveData();

  if (videoFailed) return fallback;

  if (reduceMotion || saveData) {
    return (
      <img
        className="dt-avatar avatar-poster"
        src={`/avatar/${state}.jpg`}
        alt=""
        aria-hidden="true"
        onError={() => setVideoFailed(true)}
      />
    );
  }

  return (
    <AvatarErrorBoundary fallback={fallback}>
      <VideoAvatar state={state} onError={() => setVideoFailed(true)} />
    </AvatarErrorBoundary>
  );
}

export default AvatarStage;
