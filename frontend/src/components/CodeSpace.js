import React, { useContext } from "react";

import AceEditor from 'react-ace';

import CodeContext from "../context/CodeContext";

import "brace/mode/java";
import "brace/mode/javascript";
import "brace/mode/c_cpp";
import "brace/mode/python";

import "brace/theme/github";
import "brace/theme/dawn";
import "brace/theme/chrome";

import "brace/theme/ambiance";
import "brace/theme/monokai";
import "brace/theme/dracula";
import "brace/theme/twilight";
import "brace/theme/tomorrow_night_bright";
import "brace/theme/tomorrow_night_blue";

import "ace-builds/src-noconflict/ext-language_tools";

export default function CodeSpace() {
  const { mode, code, setCode, theme, font, liveAutocompletion } = useContext(CodeContext);
  console.warn = () => {};
  return (
    <AceEditor
      fontSize={font}
      style={{ width: "100%", height: "82vh", marginTop: "0.3rem" }}
      mode={mode}
      theme={theme}
      value={code}
      onChange={(newValue) => {
        setCode(newValue);
      }}
      wrapEnabled={true}
      enableSnippets={false}
      editorProps={{ $blockScrolling: true }}
      setOptions={{
        enableBasicAutocompletion: liveAutocompletion === "enable",
        enableLiveAutocompletion: liveAutocompletion === "enable",
        tabSize: 2,
        cursorStyle: "smooth",

      }}
    />
  );
}
