import React, { useEffect } from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import HeroGlass from "./HeroGlass";
import LiveSystems from "./LiveSystems";
import ActivityFeed from "./ActivityFeed";
import HomeBottom from "./HomeBottom";
import Reveal from "../Reveal";

function Home() {
  useEffect(() => {
    const cards = document.querySelectorAll(".home-section .hg-glass");
    const listeners = [];

    cards.forEach((card) => {
      const handlePointerMove = (event) => {
        const bounds = card.getBoundingClientRect();
        card.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
        card.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
      };
      const handlePointerLeave = () => {
        card.style.removeProperty("--spotlight-x");
        card.style.removeProperty("--spotlight-y");
      };

      card.addEventListener("pointermove", handlePointerMove);
      card.addEventListener("pointerleave", handlePointerLeave);
      listeners.push([card, handlePointerMove, handlePointerLeave]);
    });

    return () => {
      listeners.forEach(([card, handlePointerMove, handlePointerLeave]) => {
        card.removeEventListener("pointermove", handlePointerMove);
        card.removeEventListener("pointerleave", handlePointerLeave);
      });
    };
  }, []);

  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container fluid className="home-content hero-wrap" style={{ maxWidth: 1440, padding: "0 40px" }}>
          <HeroGlass />

          <Reveal>
            <div className="ls-row">
              <LiveSystems />
              <ActivityFeed />
            </div>
          </Reveal>

          <Reveal>
            <HomeBottom />
          </Reveal>
        </Container>
      </Container>
    </section>
  );
}

export default Home;
