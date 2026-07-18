import React, { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";

function VisitorCounter() {
  const [count, setCount] = useState(null);

  useEffect(() => {
    const alreadyCounted = sessionStorage.getItem("sg-visit-counted");
    const method = alreadyCounted ? "GET" : "POST";

    fetch("/.netlify/functions/visitor-count", { method })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setCount(data.count);
        if (!alreadyCounted) sessionStorage.setItem("sg-visit-counted", "1");
      })
      .catch(() => {});
  }, []);

  if (count === null) return null;

  return (
    <span className="visitor-counter">
      <AiOutlineEye /> {count.toLocaleString()} visitors
    </span>
  );
}

export default VisitorCounter;
