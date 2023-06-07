import React, { useContext } from 'react';
import Tooltip from 'rc-tooltip';

import "rc-tooltip/assets/bootstrap.css";

import CodeContext from '../context/CodeContext';
import LanguageImg from './LanguageImg';

export default function Panel() {
  const { lang, isLoading, setLang, setMode, submitCode, setCode, saveCode, setResult, resetCode, getBoilerPlate } = useContext(CodeContext);
  const clickHandler = (language) => {
    saveCode();
    setLang(language);
    setMode((language === "C" || language === "C++") ? "c_cpp" : language.toLowerCase());
    localStorage.setItem("active-language", language);
    setCode(localStorage.getItem(language) || getBoilerPlate(language));
    setResult(null);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignContent: "center" }}>
        <div className="dropdown">
            <button disabled={isLoading} className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <LanguageImg lang={lang} />
            </button>
            <ul className="dropdown-menu">
                <li><p className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {clickHandler("C")}}>C</p></li>
                <li><p className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {clickHandler("C++")}}>C++</p></li>
                <li><p className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {clickHandler("Java")}}>Java</p></li>
                <li><p className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {clickHandler("JavaScript")}}>JavaScript</p></li>
                <li><p className="dropdown-item" style={{ cursor: "pointer" }} onClick={() => {clickHandler("Python")}}>Python3</p></li>
            </ul>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Tooltip 
                  placement='bottom'
                  overlay={
                    <span>Reset Code</span>
                  }
                >
                  <div style={{ cursor: "pointer" }} onClick={resetCode}>
                    <i className="fa-solid fa-arrow-rotate-left" style={{ fontSize: "1.5rem" }}></i>
                  </div>
              </Tooltip>
              <Tooltip
                placement='bottom'
                overlay={
                  <span>Editor Settings</span>
                }
              >
                <div 
                  style={{ 
                    border: "none", 
                    fontSize: "1.5rem", 
                    cursor: "pointer", 
                    display: "inline" 
                  }}
                  type="button" data-bs-toggle="modal" data-bs-target="#exampleModal"
                >
                  <i className="fa-solid fa-gear"></i>
                </div>
              </Tooltip>
              {
                lang === "JavaScript" ? 
                <button disabled={isLoading} className="btn btn-primary" onClick={submitCode}><i className="fa-solid fa-play"></i>{" "}Run</button> :
                <button disabled={isLoading} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#console-input"><i className="fa-solid fa-play"></i>{" "}Run</button>
              }
        </div>
    </div>
  )
}
