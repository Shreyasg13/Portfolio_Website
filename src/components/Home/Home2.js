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
              <b className="purple">Platform AI Architect</b> with{" "}
              <b className="purple">5+ years</b> of end-to-end technical ownership —{" "}
              <b>1,519+ commits · 543+ PRs · 10+ production repos · 4 direct reports</b>.
              <br />
              <br />
              Built and deployed production{" "}
              <i><b className="purple">MCP integrations and A2A Protocol infrastructure</b></i> connecting Classification, Extraction, Mapping, and Validation agents — the foundational connectivity layer of agentic AI platforms. Architected a{" "}
              <i><b className="purple">complete multi-tenant Identity Provider from scratch in Go/Echo</b></i>{" "}
              (JWT, SAML 2.0, RBAC, MFA, SSO, AI agent security registry) — an Auth0-equivalent platform, zero CVEs, ≤5ms token verification at 10K concurrent requests.
              <br />
              <br />
              Shipped the complete{" "}
              <i><b className="purple">multi-cloud scalable infrastructure stack</b></i>: Terraform (AWS/GCP/Azure), EKS, Kubernetes, Helm, OTel distributed tracing, Prometheus + Grafana observability, and enterprise compliance (FINRA, SOC-2, SEC 17a-4). Designed{" "}
              <b className="purple">LangGraph Agentic Intelligence</b> (HITL escalation) deployed across three production verticals. Contributed directly to{" "}
              <b className="purple">Scale AI's LLM Engine</b>.
              <br />
              <br />
              M.S. Computer Science,{" "}
              <b className="purple">New York University</b> — Distributed Systems, ML Infrastructure, Security & Platform Engineering. 2 Springer AI publications.
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
