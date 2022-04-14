import React from "react";
import { Col, Row } from "react-bootstrap";
import {
  SiLinux,
  SiVisualstudiocode,
  SiOracle,
  SiPycharm,
  SiEclipseche,
  SiMatrix,
  SiTensorflow
} from "react-icons/si";

function Toolstack() {
  return (
    <Row style={{ justifyContent: "center", paddingBottom: "50px" }}>
      <Col xs={3} md={1} className="tech-icons">
      <h4>Linux</h4> <SiLinux />
      </Col>
      <Col xs={3} md={1} className="tech-icons">
      <h4>VS Code</h4> <SiVisualstudiocode />
      </Col>
      <Col xs={3} md={1} className="tech-icons" font-size="10px">
      <h4>Eclipse</h4><SiEclipseche />
      </Col>
      <Col xs={3} md={1} className="tech-icons">
      <h4>Oracle Data Modeler</h4><SiOracle />
      </Col>
      <Col xs={3} md={1} className="tech-icons">
      <h4>Pycharm</h4><SiPycharm />
      </Col>
      <Col xs={3} md={1} className="tech-icons">
      <h4>MatLab</h4><SiMatrix />
      </Col>
      <Col xs={3} md={1} className="tech-icons">
      <h4>TenserFlow</h4><SiTensorflow />
      </Col>
      
      
    </Row>
  );
}

export default Toolstack;
