import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import HeroGlass from "./HeroGlass";
import LiveSystems from "./LiveSystems";
import ActivityFeed from "./ActivityFeed";
import HomeBottom from "./HomeBottom";
import Reveal from "../Reveal";

function Home() {
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
