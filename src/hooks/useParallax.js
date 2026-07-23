import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Genuinely new motion capability, not a duplicate of the existing
// IntersectionObserver-based useReveal/Reveal (src/hooks/useReveal.js) —
// that fires once on enter; this is continuously scrubbed to scroll
// position via GSAP ScrollTrigger, which is the part neither useReveal
// nor the hero's Framer Motion entrance already cover.
function useParallax(ref, { distance = 60, reduceMotion = false } = {}) {
  useEffect(() => {
    if (reduceMotion) return undefined;
    const node = ref.current;
    if (!node) return undefined;
    const tween = gsap.fromTo(
      node,
      { y: -distance / 2 },
      {
        y: distance / 2,
        ease: "none",
        scrollTrigger: {
          trigger: node,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [ref, distance, reduceMotion]);
}

export default useParallax;
