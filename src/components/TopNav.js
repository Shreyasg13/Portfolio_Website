import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/project", label: "Projects" },
  { to: "/resume", label: "Resume" },
];

function TopNav() {
  const location = useLocation();

  return (
    <nav className="tn-nav">
      <Link to="/" className="tn-logo">
        S
      </Link>

      <div className="tn-pill">
        {LINKS.map((l) => (
          <Link
            key={l.label}
            to={l.to}
            className={`tn-pill-link ${location.pathname === l.to ? "tn-pill-link-active" : ""}`}
          >
            {l.label}
          </Link>
        ))}
      </div>

      <a className="tn-connect" href="mailto:sg6874@nyu.edu">
        Let's Connect <BsArrowRight />
      </a>
    </nav>
  );
}

export default TopNav;
