import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import myImg from "../../Assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import { AiFillMail, AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

function Home2() {
  return (
    <Container fluid className="home-about-section" id="about">
      <Container>
        <Row>
          <Col md={8} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              LET ME <span className="purple"> INTRODUCE </span> MYSELF
            </h1>
            <p className="home-about-body">
              Platform engineer with <b className="purple">4+ years</b> of compounded scope — leading architecture, owning end-to-end technical vision, and shipping foundational platform primitives that other engineers depend on daily.
              <br />
              <br />
              Built and maintained production{" "}
              <i>
                <b className="purple">MCP integrations and A2A Protocol infrastructure</b>
              </i>{" "}
              — the exact connectivity layer that powers agentic AI platforms. Designed enterprise-grade{" "}
              <i>
                <b className="purple">Auth & Identity systems</b>
              </i>{" "}
              (Auth0, Okta, Cognito — JWT, SAML, MFA, RBAC, SSO) at ≤3ms token latency with zero CVEs.
              <br />
              <br />
              Shipped the complete{" "}
              <i>
                <b className="purple">multi-cloud API infrastructure stack</b>
              </i>: Terraform (AWS/GCP/Azure), cloud-agnostic deployment pipelines, OTel observability, and enterprise compliance (SOC-2, SEC 17a-4). Contributed directly to{" "}
              <b className="purple">Scale AI's LLM Engine</b> — hands-on familiarity with AI platform architecture at production scale.
              <br />
              <br />
              M.S. Computer Science,{" "}
              <b className="purple">New York University</b>. 2 Springer AI publications.
            </p>
          </Col>
          <Col md={4} className="myAvtar">
            <Tilt>
              <img src={myImg} className="img-fluid" alt="avatar" />
            </Tilt>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="home-about-social">
            <h1>FIND ME ON</h1>
            <p>
              Feel free to <span className="purple">connect </span>with me
            </p>
            <ul className="home-about-social-links">
              <li className="social-icons">
                <a
                  href="mailto:sg6874@nyu.edu"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillMail />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://www.linkedin.com/in/shreyash130197/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <FaLinkedinIn />
                </a>
              </li>
              <li className="social-icons">
                <a
                  href="https://github.com/Shreyasg13"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour home-social-icons"
                >
                  <AiFillGithub />
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
export default Home2;
