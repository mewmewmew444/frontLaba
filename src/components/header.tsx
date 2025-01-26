import React from "react";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  return (
    <header style={{ padding: "10px", background: "#DDA0DD", position:"fixed", textAlign: "center" }}>
      <nav>
        <ul style={{ display: "flex", gap: "10px", listStyle: "none" }}>
          <li className="zoom"><Link to="/">Home</Link></li>
          <li className="zoom"><Link to="/about">About</Link></li>
          <li className="zoom"><Link to="/skills">Skills</Link></li>
          <li className="zoom"><Link to="/projects">Projects</Link></li>
          <li className="zoom"><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};