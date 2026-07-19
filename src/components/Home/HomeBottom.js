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
  BsRocketTakeoffFill,
  BsPcDisplay,
  BsBoxSeamFill,
  BsCashCoin,
  BsPeopleFill,
} from "react-icons/bs";
import { AiFillMail, AiFillGithub } from "react-icons/ai";
import { FaLinkedinIn, FaMicrosoft } from "react-icons/fa";

const TECH = [
  { icon: <DiPython />, label: "Python", color: "#3776AB" },
  { icon: <SiGo />, label: "Go", color: "#00ADD8" },
  { icon: <SiTypescript />, label: "TypeScript", color: "#3178C6" },
  { icon: <DiJava />, label: "Java", color: "#ED8B00" },
  { icon: <SiFastapi />, label: "FastAPI", color: "#009688" },
  { icon: <SiSpringboot />, label: "Spring Boot", color: "#6DB33F" },
  { icon: <span className="tt-text">vLLM</span>, label: "", color: "#e0452a" },
  { icon: <span className="tt-text">LangGraph</span>, label: "", color: "#e0452a" },
  { icon: <span className="tt-text">MCP</span>, label: "", color: "#e0452a" },
  { icon: <SiKubernetes />, label: "Kubernetes", color: "#326CE5" },
  { icon: <SiAmazonaws />, label: "AWS", color: "#FF9900" },
  { icon: <SiGooglecloud />, label: "GCP", color: "#4285F4" },
  { icon: <FaMicrosoft />, label: "Azure", color: "#0078D4" },
  { icon: <SiPostgresql />, label: "PostgreSQL", color: "#4169E1" },
  { icon: <SiRedis />, label: "Redis", color: "#DC382D" },
  { icon: <SiApachekafka />, label: "Kafka", color: "#8a8f98" },
  { icon: <SiTerraform />, label: "Terraform", color: "#7B42BC" },
  { icon: <SiDocker />, label: "Docker", color: "#2496ED" },
];

const STATS = [
  { icon: <BsRocketTakeoffFill />, color: "#a855f7", num: "3,000+", lab: "Commits" },
  { icon: <BsPcDisplay />, color: "#4fa8e0", num: "700+", lab: "PRs Merged" },
  { icon: <BsBoxSeamFill />, color: "#e0a02a", num: "10+", lab: "Production Repos" },
  { icon: <BsCashCoin />, color: "#4caf50", num: "2", lab: "Springer AI Publications" },
  { icon: <BsPeopleFill />, color: "#e0452a", num: "21", lab: "Engineers Led · 4 Direct Reports" },
];

function HomeBottom() {
  return (
    <div className="hb-wrap">
      <div className="hb-ticker">
        <span className="hb-ticker-label">Technology &amp; Expertise</span>
        <div className="hb-ticker-row">
          {TECH.map((t, i) => (
            <span className="hb-tech-chip" key={i}>
              <span style={{ color: t.color }}>{t.icon}</span> {t.label}
            </span>
          ))}
        </div>
      </div>

      <div className="hb-stats-row">
        {STATS.map((s) => (
          <div className="hb-stat" key={s.lab}>
            <span className="hb-stat-icon" style={{ background: `${s.color}22`, color: s.color }}>
              {s.icon}
            </span>
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
