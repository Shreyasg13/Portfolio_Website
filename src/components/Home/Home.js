import React from "react";
import { Container } from "react-bootstrap";
import Particle from "../Particle";
import Home2 from "./Home2";
import Hero from "./Hero";
import SkillsRadar from "./SkillsRadar";
import Reveal from "../Reveal";

function Home() {
  return (
    <section>
      <Container fluid className="home-section" id="home">
        <Particle />
        <Container className="home-content hero-wrap">
          <Hero />
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
