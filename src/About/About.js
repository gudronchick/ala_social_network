import React from "react";
import s from "./About.module.css";
import { NavLink } from "react-router-dom";

const About = (props) => {
  return (
    <div>
      <h3 className={s.head__title}>Some title</h3>
      <p>
        <NavLink to="/page">Go to the main page</NavLink>
      </p>
    </div>
  );
};

export default About;
