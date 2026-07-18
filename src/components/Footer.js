import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillMail, AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import VisitorCounter from "./Home/VisitorCounter";

const VERSION = process.env.REACT_APP_GIT_SHA
  ? process.env.REACT_APP_GIT_SHA.slice(0, 7)
  : "dev";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <Container fluid className="footer">
      <Row>
        <Col md="4" className="footer-copywright">
          <h3>Designed & Built by Shreyash Gondane</h3>
        </Col>
        <Col md="4" className="footer-copywright">
          <h3>Copyright © {year} SG</h3>
          <p style={{ color: "#666", fontSize: "0.7em", margin: 0 }}>
            v{VERSION}
          </p>
          <VisitorCounter />
        </Col>
        <Col md="4" className="footer-body">
          <ul className="footer-icons">
            <li className="social-icons">
              <a
                href="https://github.com/Shreyasg13"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillGithub />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="mailto:sg6874@nyu.edu"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <AiFillMail />
              </a>
            </li>
            <li className="social-icons">
              <a
                href="https://www.linkedin.com/in/shreyash130197/"
                style={{ color: "white" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn />
              </a>
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
