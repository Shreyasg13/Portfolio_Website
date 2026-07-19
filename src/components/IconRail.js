import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsHouseDoorFill,
  BsPersonFill,
  BsBriefcaseFill,
  BsCodeSquare,
  BsFileEarmarkTextFill,
  BsEnvelopeFill,
  BsSunFill,
  BsMoonFill,
} from "react-icons/bs";

const ITEMS = [
  { to: "/", icon: <BsHouseDoorFill /> },
  { to: "/about", icon: <BsPersonFill /> },
  { to: "/project", icon: <BsBriefcaseFill /> },
  { to: "/project", icon: <BsCodeSquare /> },
  { to: "/resume", icon: <BsFileEarmarkTextFill /> },
];

function IconRail() {
  const location = useLocation();
  const [dark, setDark] = useState(true);

  return (
    <aside className="icon-rail">
      {ITEMS.map((item, i) => (
        <Link
          key={i}
          to={item.to}
          className={`icon-rail-item ${location.pathname === item.to ? "icon-rail-item-active" : ""}`}
        >
          {item.icon}
        </Link>
      ))}
      <a href="mailto:sg6874@nyu.edu" className="icon-rail-item">
        <BsEnvelopeFill />
      </a>
      <button
        className="icon-rail-item icon-rail-toggle"
        onClick={() => setDark((d) => !d)}
        aria-label="Toggle theme"
        type="button"
      >
        {dark ? <BsSunFill /> : <BsMoonFill />}
      </button>
    </aside>
  );
}

export default IconRail;
