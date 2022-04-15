import React from "react";
import { Col, Row } from "react-bootstrap";
import { CgCPlusPlus } from "react-icons/cg";
import {
  DiJavascript1,
  DiReact,
  DiPython,
  DiLinux
} from "react-icons/di";
import {
  SiDataversioncontrol,
  SiNodedotjs,
  SiMysql,
  SiHtml5,
  SiFastapi
} from "react-icons/si";

function Techstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={3} md={2} className="tech-icons">
      <h4>C,C++</h4><CgCPlusPlus />
      </Col>
      <Col xs={3} md={2} className="tech-icons">
      <h4>Python</h4><DiPython />
      </Col>
      
      {/* <div >C++</div> */}
      <Col xs={3} md={2} className="tech-icons">
      <h4>Java, JavaScript</h4><DiJavascript1 />
      </Col>
      <Col xs={3} md={2} className="tech-icons">
      <h4>SQL</h4> <SiMysql />
      </Col>
      <Col xs={3} md={2} className="tech-icons" aria-details="Linux" aria-describedby="Linux">
      <h4>Linux</h4><DiLinux />
      </Col>
      <Col xs={3} md={2} className="tech-icons">
      <h4>React</h4> <DiReact />
      </Col>
      <Col xs={3} md={2} className="tech-icons">
      <h4>Java APIs</h4><SiFastapi />
      </Col>
      <Col xs={3} md={2} className="tech-icons">
      <h4>NodeJS</h4> <SiNodedotjs />
      </Col>
      <Col xs={3} md={2} className="tech-icons">
      <h4>HTML/CSS</h4><SiHtml5 />
      </Col>
      <Col xs={3} md={2} className="tech-icons">
      <h4>Data Structures and Algorithm</h4><SiDataversioncontrol />
      </Col>
      
      
    </Row>
  );
}

export default Techstack;
