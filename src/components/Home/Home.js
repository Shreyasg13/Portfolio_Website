import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import Home2 from "./Home2";
import HeroDense from "./HeroDense";
import SkillsRadar from "./SkillsRadar";
import Reveal from "../Reveal";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container fluid className="home-content hero-wrap" style={{ maxWidth: 1440, padding: "0 40px" }}>
          <HeroDense />
        </Container>
      </Container>
      <Reveal>
        <SkillsRadar />
      </Reveal>
      <Home2 />
    </section>
  );
}

export default Home;
