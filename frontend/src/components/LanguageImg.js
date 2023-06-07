import React from 'react';

import javaPic from "../images/java.png";
import jsPic from "../images/javascript.png";
import cppPic from "../images/cpp.png";
import cPic from "../images/c.png";
import pyPic from "../images/python.png";

export default function LanguageImg({ lang }) {
  return (
    <>
        {
            lang === "Java" ? <img style={{ width: "2rem", height: "2rem", objectFit: "cover" }} src={javaPic} alt="Java" /> :
            lang === "JavaScript" ? <img style={{ width: "2rem", height: "2rem", objectFit: "cover" }} src={jsPic} alt="Java" /> :
            lang === "Python" ? <img style={{ width: "2rem", height: "2rem", objectFit: "cover" }} src={pyPic} alt="Java" /> :
            lang === "C" ? <img style={{ width: "2rem", height: "2rem", objectFit: "cover" }} src={cPic} alt="Java" /> :
            <img style={{ width: "2rem", height: "2rem", objectFit: "cover" }} src={cppPic} alt="Java" />
        }
    </>
  );
}
