import React from "react";
import { Link } from "react-router-dom";

const DotGrid = () => (
  <svg className="hero-stat-dots" width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
    <g fill="#e0452a">
      <circle cx="4" cy="4" r="2.4" />
      <circle cx="15" cy="4" r="2.4" />
      <circle cx="26" cy="4" r="2.4" />
      <circle cx="4" cy="15" r="2.4" />
      <circle cx="15" cy="15" r="2.4" />
      <circle cx="26" cy="15" r="2.4" />
      <circle cx="4" cy="26" r="2.4" />
      <circle cx="15" cy="26" r="2.4" />
      <circle cx="26" cy="26" r="2.4" />
    </g>
  </svg>
);

const STATS = [
  { num: "10+", labelBold: "Production", labelRest: "platforms shipped", dots: true },
  { num: "1.2M", labelBold: "Conversations/mo", labelRest: "p95 under 350ms", dots: false },
  { num: "21", labelBold: "Engineers led", labelRest: "4 direct reports", dots: false },
  { num: "0", labelBold: "CVEs", labelRest: "2 pen tests passed", dots: true },
];

function Hero() {
  return (
    <section className="hero">
      <div className="hero-ghost" aria-hidden="true">SG</div>
      <div className="hero-inner">
        <div className="hero-eyebrow">Platform Engineer · Jersey City, NJ</div>
        <h1 className="hero-h1">
          Identity, <span className="hero-hl">Agents</span>,<br />
          and Infrastructure
          <br />
          at Scale
        </h1>
        <p className="hero-lede">
          I build the platform layer that makes AI usable in production — a
          multi-tenant identity provider from scratch in Go, agentic systems
          on AWS running <b>1.2M conversations a month</b>, and document
          pipelines that turn <b>15 days of work into 5 minutes</b>.
        </p>
        <div className="hero-cta-row">
          <Link className="hero-btn" to="/resume">
            View Résumé
          </Link>
          <Link className="hero-link" to="/project">
            See the work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="hero-stats">
        {STATS.map((s, i) => (
          <div className="hero-stat" key={i}>
            {s.dots && <DotGrid />}
            <div>
              <div className="hero-stat-num">{s.num}</div>
              <div className="hero-stat-lab">
                <b>{s.labelBold}</b>
                {s.labelRest}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Hero;
