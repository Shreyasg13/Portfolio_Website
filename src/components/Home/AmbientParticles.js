import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";

// GOAL.md's literal Phase 6 ask: floating particles, depth, perspective,
// subtle parallax — via React Three Fiber/Drei, per the user's explicit
// choice to accept the legacy React-17-era version pin (see the phase
// plan) rather than the CSS/canvas alternative. This does not touch or
// duplicate DigitalTwinAvatar/WorkspaceScene — it's a separate, full-bleed
// ambient layer behind the whole hero.
function ParallaxRig({ reduceMotion }) {
  const mouse = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    if (reduceMotion) return undefined;
    function onMove(e) {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduceMotion]);

  useFrame(({ camera }) => {
    if (reduceMotion) return;
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.current.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function AmbientParticles({ reduceMotion }) {
  if (reduceMotion) return null;

  return (
    <div className="ap-canvas-wrap" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }} gl={{ alpha: true }}>
        <Stars radius={50} depth={30} count={1400} factor={2.4} saturation={0} fade speed={0.4} />
        <ParallaxRig reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  );
}

export default AmbientParticles;
