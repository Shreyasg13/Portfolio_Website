import React from "react";
import {
  DiPython,
  DiJava,
} from "react-icons/di";
import {
  SiGo,
  SiTypescript,
  SiFastapi,
  SiSpringboot,
  SiKubernetes,
  SiAmazonaws,
  SiGooglecloud,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiTerraform,
  SiDocker,
} from "react-icons/si";
import {
  BsGeoAltFill,
  BsTelephoneFill,
  BsGlobe,
  BsFillCloudFill,
} from "react-icons/bs";
import { AiFillMail, AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaMicrosoft } from "react-icons/fa";

const TECH = [
  { icon: <DiPython />, label: "Python" },
  { icon: <SiGo />, label: "Go" },
  { icon: <SiTypescript />, label: "TypeScript" },
  { icon: <DiJava />, label: "Java" },
  { icon: <SiFastapi />, label: "FastAPI" },
  { icon: <SiSpringboot />, label: "Spring Boot" },
  { icon: <span className="tt-text">vLLM</span>, label: "" },
  { icon: <span className="tt-text">LangGraph</span>, label: "" },
  { icon: <span className="tt-text">MCP</span>, label: "" },
  { icon: <SiKubernetes />, label: "Kubernetes" },
  { icon: <SiAmazonaws />, label: "AWS" },
  { icon: <SiGooglecloud />, label: "GCP" },
  { icon: <FaMicrosoft />, label: "Azure" },
  { icon: <SiPostgresql />, label: "PostgreSQL" },
  { icon: <SiRedis />, label: "Redis" },
  { icon: <SiApachekafka />, label: "Kafka" },
  { icon: <SiTerraform />, label: "Terraform" },
  { icon: <SiDocker />, label: "Docker" },
];

const STATS = [
  { num: "3,000+", lab: "Commits" },
  { num: "700+", lab: "PRs Merged" },
  { num: "10+", lab: "Production Repos" },
  { num: "2", lab: "Springer AI Publications" },
  { num: "21", lab: "Engineers Led · 4 Direct Reports" },
];

function HomeBottom() {
  return (
    <div className="hb-wrap">
      <div className="hb-ticker">
        <span className="hb-ticker-label">Technology &amp; Expertise</span>
        <div className="hb-ticker-row">
          {TECH.map((t, i) => (
            <span className="hb-tech-chip" key={i}>
              {t.icon} {t.label}
            </span>
          ))}
        </div>
      </div>

      <div className="hb-stats-row">
        {STATS.map((s) => (
          <div className="hb-stat" key={s.lab}>
            <div className="hb-stat-num">{s.num}</div>
            <div className="hb-stat-lab">{s.lab}</div>
          </div>
        ))}
      </div>

      <div className="hb-quote-map">
        <blockquote className="hb-quote hg-glass">
          “I don't just use AI.
          <br />I build platforms that make AI{" "}
          <span>reliable, scalable and production-ready.</span>”
          <footer>Shreyash Gondane</footer>
        </blockquote>

        <div className="hb-map hg-glass">
          <div className="hb-map-glow" />
          <div className="hb-map-pin">
            <span className="hd-live-dot" />
          </div>
        </div>

        <div className="hb-badges">
          <div className="hb-badge hg-glass">
            <BsFillCloudFill className="hb-badge-icon" />
            <div>
              <div className="hb-badge-title">Multi-Cloud Architect</div>
              <div className="hb-badge-sub">AWS · GCP · Azure</div>
            </div>
          </div>
          <div className="hb-badge hg-glass">
            <BsGeoAltFill className="hb-badge-icon" />
            <div>
              <div className="hb-badge-title">Jersey City, NJ</div>
              <div className="hb-badge-sub">
                <span className="hd-live-dot" /> Available Worldwide
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hb-contact-bar hg-glass">
        <span>
          <BsGeoAltFill /> Jersey City, NJ
        </span>
        <span>
          <BsTelephoneFill /> +1 929-527-9683
        </span>
        <span>
          <AiFillMail /> sg6874@nyu.edu
        </span>
        <a href="https://pdffillr.ai/documentation" target="_blank" rel="noreferrer">
          <BsGlobe /> pdffillr.ai/documentation
        </a>
        <a href="https://github.com/Shreyasg13" target="_blank" rel="noreferrer">
          <AiFillGithub /> github.com/Shreyasg13
        </a>
        <a href="https://www.linkedin.com/in/shreyash130197/" target="_blank" rel="noreferrer">
          <FaLinkedinIn /> linkedin.com/in/shreyash130197
        </a>
      </div>
    </div>
  );
}

export default HomeBottom;
