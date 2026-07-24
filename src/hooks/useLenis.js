import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scoped to whichever component mounts it (Home only, today) rather than
// wired up app-wide in App.js — the /resume route embeds a PDF viewer and
// /admin* are internal consoles, neither of which should have their
// native scroll behavior touched by a smooth-scroll library meant for the
// public landing page.
function useLenis(reduceMotion = false) {
  useEffect(() => {
    if (reduceMotion) return undefined;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduceMotion]);
}

export default useLenis;
