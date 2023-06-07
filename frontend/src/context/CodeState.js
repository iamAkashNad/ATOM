import { useState } from "react";
import CodeContext from "./CodeContext";

const CodeState = (props) => {
  const host = process.env.REACT_APP_BACKEND_HOST;

  const getBoilerPlate = (lang) => {
    if(lang === 'C') {
      return (
`#include<stdio.h>
int main() {
  printf("Hello ATOM!");
  return 0;
}`
      );
    } else if(lang === 'C++') {
      return (
`#include<bits/stdc++.h>
using namespace std;

int main() {
  cout<<"Hello ATOM!";
  return 0;
}`
      );
    } else if(lang === "Java") {
      return (
`class Main {
  public static void main(String[] args) {
    System.out.println("Hello ATOM!");
  }
}`
      );
    } else if(lang === "JavaScript") {
      return (`console.log("Hello ATOM!");`);
    } else {
      return (`print("Hello ATOM!")`);
    }
  }


  // ---STATE---
  const [ input, setInput ] = useState("");
  const [lang, setLang] = useState(localStorage.getItem("active-language") || "C++");
  const [mode, setMode] = useState(() => {
    const activeLang = localStorage.getItem("active-language");
    if (activeLang === null) return "c_cpp";
    return activeLang === "C" || activeLang === "C++" ? "c_cpp" : activeLang.toLowerCase();
  });
  const [code, setCode] = useState(localStorage.getItem(lang) || getBoilerPlate(lang));
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [ theme, setTheme ] = useState(localStorage.getItem("theme") || "github");
  const [ font, setFont ] = useState(+localStorage.getItem("font") || 16);
  const [ liveAutocompletion, setLiveAutocompletion ] = useState(localStorage.getItem("autocomplete") || "disable");
  const [ message, setMessage ] = useState(null);
  //---STATE---

  
  //---UTIL METHODS---
  const saveCode = () => {
    localStorage.setItem(lang, code);
  };

  const resetCode = () => {
    setCode(getBoilerPlate(lang));
    setResult(null);
    localStorage.removeItem(lang);
  };

  const updateTheme = (themeValue) => {
    setTheme(themeValue);
    localStorage.setItem("theme", themeValue);
  };
  const updateFont = (fontSize) => {
    setFont(+fontSize);
    localStorage.setItem("font", fontSize);
  };

  const updateAutocomplete = (autocomplete) => {
    setLiveAutocompletion(autocomplete);
    localStorage.setItem("autocomplete", autocomplete);
  };

  const toggleAlert = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  }
  //---UTIL METHODS---


  //---RESOURCE FETCHING METHODS---
  const submitCode = async (event) => {
    event.preventDefault();
    const data = { language: lang, code, input };
    saveCode();
    setInput("");
    setResult("");
    setIsLoading(true);
    let response;
    try {
      response = await fetch(`${host}/run`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          }
      });
    } catch(error) {
      setIsLoading(false);
      return toggleAlert({ type: "warning", content: "Network connection interrupts! Make sure that you are in a stable internet connection." });
    }

    if(!response.ok) {
      setIsLoading(false);
      return toggleAlert({ type: "warning", content: "Somthing went wrong internally! Stay tuned with us...We are trying to fix it as soon as possible." });
    }

    const responseData = await response.json();

    startSendingJobDetailRequest(responseData.jobId, (intervalId) => {
      clearInterval(intervalId);
    });
  };

  const startSendingJobDetailRequest = (jobId, stopSendingJobDetailRequest) => {
    const intervalId = setInterval(() => {
      fetch(`${host}/status?id=${jobId}`).then((response) => {
        if(!response.ok) {
          setIsLoading(false);
          toggleAlert({ type: "warning", content: "Somthing went wrong internally! Stay tuned with us...We are trying to fix it as soon as possible." });
          stopSendingJobDetailRequest(intervalId);
        } else {
          response.json().then(({ job }) => {
            if(job.status !== "Pending") {
              if(job.status === "Timeout") {
                toggleAlert({ type: "warning", content: job.error });
              } else {
                setResult(job);
              }
              setIsLoading(false);
              stopSendingJobDetailRequest(intervalId);
            }
          }).catch(error => {
            toggleAlert({ type: "warning", content: "Somthing went wrong internally! Stay tuned with us...We are trying to fix it as soon as possible." });
            setIsLoading(false);
            stopSendingJobDetailRequest(intervalId);
          });
        }
      }).catch(error => {
        setIsLoading(false);
        toggleAlert({ type: "warning", content: "Network connection interrupts! Make sure that you are in a stable internet connection." });
        stopSendingJobDetailRequest(intervalId);
      });
    }, 500);
  };
  //---RESOURCE FETCHING METHODS---

  const collection = {
    input, setInput,
    lang, setLang,
    mode, setMode,
    code, setCode,
    result, setResult,
    isLoading, setIsLoading,
    theme, setTheme,
    font, setFont,
    message, setMessage,
    liveAutocompletion, setLiveAutocompletion,
    saveCode,
    resetCode,
    submitCode,
    updateFont,
    updateTheme,
    updateAutocomplete,
    getBoilerPlate
  };
  return (
    <CodeContext.Provider value={collection}>
      {props.children}
    </CodeContext.Provider>
  );
};

export default CodeState;
