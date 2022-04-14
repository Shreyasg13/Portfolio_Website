import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";
import Type1 from "./Type1";


function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am <span className="purple">Shreyash Gondane </span>
            from <span className="purple"> Brooklyn, New York.</span>
            <div style={{ padding: 20, textAlign: "Left",fontSize:14 }}>
                <Type1 />
              </div>
            {/* <br />I am a Computer Engineering Graduate student at New York University
            <br /> */}
            <br />
            Apart from coding, some other activities that I love to do!
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Playing Chess ♛♖
            </li>
            <li className="about-activity">
              <ImPointRight /> Reading Books 📘
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling 🧭
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "I dream,
             Therefore, I think.
             I seize the day
             Therefore, I am.!"{" "}
          </p>
          <footer className="blockquote-footer">Shreyash</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
