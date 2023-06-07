import React, { useContext } from 'react';
import CodeContext from '../context/CodeContext';

export default function Output() {
  const myStyle = {
    marginTop: "3.1rem",
    backgroundColor: "rgb(228, 226, 226)",
    padding: "1rem",
    color: "rgb(40, 38, 38)"
  };

  const consoleStyle = { 
    whiteSpace: "pre-wrap",
    height: "100%",
    width: "100%",
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    color: "inherit",
    resize: "none",
  };

  const { result } = useContext(CodeContext);

  return (
    <div style={myStyle}>
      <h5 className='mx-2'><i className="fa-solid fa-terminal"></i></h5>
      <div>
        <textarea disabled={true} style={consoleStyle} rows={10} value={result.output}></textarea>
      </div>
      <div id='output-meta'>
        <p className='my-0'>Job ID: {result._id}</p>
        <p className='my-0'>Execution Time: {result.executionTime}</p>
        <p className='my-0'>Language: {result.language}</p>
        <p className='my-0'>Submitted At: {result.submittedAt}</p>
      </div>
    </div>
  )
}
