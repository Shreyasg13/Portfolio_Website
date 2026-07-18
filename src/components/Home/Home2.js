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
              <b className="purple">5+ years</b> of end-to-end ownership —{" "}
              <b>3,000+ commits · 700+ PRs · 10+ production repos · 4 direct reports · team of 21</b>.
              <br />
              <br />
              Principal architect of{" "}
              <i><b className="purple">a governed multi-tenant AI platform</b></i> serving 4 product verticals (healthcare triage, financial advisor, workflow orchestration, data-quality) through a single endpoint. Self-hosted{" "}
              <i><b className="purple">vLLM inference: Qwen3-32B INT4 AWQ · Qwen3-VL vision · DeepSeek-R1</b></i>{" "}
              on GPU spot fleets with EKS Auto Mode + Karpenter + KEDA autoscaling and AWS Bedrock fallback routing.
              <br />
              <br />
              Built production{" "}
              <i><b className="purple">MCP + A2A Protocol infrastructure</b></i> and a complete{" "}
              <i><b className="purple">multi-tenant Identity Provider in Go/Echo</b></i>{" "}
              (Auth0-equivalent — JWT, SAML 2.0, RBAC, MFA, SSO, AI agent security registry) — zero CVEs, sub-5ms token verification at 10K concurrent. Shipped{" "}
              <b className="purple">LangGraph agentic systems</b> at 1.2M conversations/month, p95 &lt; 350ms. Authored multi-cloud Terraform (AWS/GCP/Azure).
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
