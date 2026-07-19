import React from "react";
import { Link, useLocation } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/about", label: "Expertise" },
  { to: "/project", label: "Projects" },
  { to: "/about", label: "Publications" },
  { to: "/resume", label: "Resume" },
];

function TopNav() {
  const location = useLocation();
  const activeLabel = {
    "/": "Home",
    "/about": "About",
    "/project": "Projects",
    "/resume": "Resume",
  }[location.pathname];

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
            className={`tn-pill-link ${activeLabel === l.label ? "tn-pill-link-active" : ""}`}
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
