import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";
import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.jpeg";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";
//import 3 from "../Assets/Projects/2.jpp";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              isBlog={false}
              title="Flight Booking System"
              description="• Prepared web application for flight booking system with web interface in PHP and back end database architecture
              Implemented using Oracle data modeler with local database in MYSQL and Enabled security features by providing encryption of of password data to run-block 1st and 2nd order SQL injection attack."
              //link="https://drive.google.com/file/d/1K7nZ0ckg5w1n8MGuVmejq3r5Dgog2ixo/view"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              isBlog={false}
              title="Advance Surveillance System in Image processing and IoT"
              description="Introduced a Software hardware system for video surveillance, human machine interaction and security purposes using
              Raspberry Pi, PyCharm with Keras, Pandas,Twillio and OpenCV usable across 10+ departments
              and Executed Haar cascade with CNN over ANN approach achieved accuracy up to 96.7% for intruder detection with real time
              image processing and IoT functionality."
              link="https://drive.google.com/file/d/1suhKQzRmWqYoEnDm40BKSm487R7nbfOi/view"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              isBlog={false}
              title="Chabot for QnA and car classifier platform"
              description="• Built chatbot application for automobile companies to address customer queires and car feature customised options as per
              customer requirements, increases 40% productivity
              and Implemented API tool with Chatterbot, NLTK library ,Cosine similarity, Naive Bayes Classifier to train dataset for reaches
              more than 85% of accuracy of NLP text generation."
              link="https://drive.google.com/file/d/1K7nZ0ckg5w1n8MGuVmejq3r5Dgog2ixo/view"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              isBlog={false}
              title="Speech Recognition Approach for Automated command based robots & Home Automation"
              description="Used the plant disease dataset from Kaggle and trained a image classifer m• Created home automation system using speech recognition on MATLAB Audio Toolbox, Deep leaning Toolbox
              and Applied Correlation and Convolution Algorithm for input pattern Recognition, waveform attains about 78% signals precision
              correction setup in Signal Processing Toolbox for command mapping."
             // link="https://github.com/soumyajit4419/Plant_AI"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              isBlog={false}
              title="Ai For Hand gesture controlled PowerPoint Presentation"
              description="• Designed script for controlling PowerPoint presentation on Hand gestures in PyCharm achieves about 92% accuracy
               and Co-ordinated in python Gaussian blur algorithm, Haar cascading,CNN for image processing for various hand gesture signs."
             // link="https://github.com/soumyajit4419/AI_For_Social_Good"
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              isBlog={false}
              title="Face Recognition and Emotion Detection"
              description="Trained a CNN classifier using Keras and tensorflow backened. The classifier sucessfully predicted the various types of emotions of human. And the highest accuracy obtained with the model was 60.1%.
              Then used Open-CV to detect the face in an image and then pass the face to the classifer to predict the emotion of a person."
              //link="https://github.com/soumyajit4419/Face_And_Emotion_Detection"
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
