import React, { useContext } from 'react';
import CodeContext from '../context/CodeContext';

export default function Input() {
  const { input, setInput, submitCode } = useContext(CodeContext);
  return (
    <div className="modal fade" id="console-input" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-body">
                    <div className="mb-3">
                        <h1 className="modal-title fs-5 mb-2" id="exampleModalLabel">Enter Inputs</h1>
                        <textarea
                            className="form-control" 
                            style={{ resize: "none" }} 
                            id="exampleFormControlTextarea1" 
                            rows="5" 
                            onChange={(event) => {setInput(event.target.value)}}
                            value={input}
                            placeholder='Enter inputs which are needed for your code!'
                        ></textarea>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={submitCode}>Submit</button>
                </div>
            </div>
        </div>
    </div>
  );
}
