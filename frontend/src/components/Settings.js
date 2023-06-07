import React, { useContext } from 'react'
import CodeContext from '../context/CodeContext';

export default function Settings() {
  const myStyle = {
    margin: "1rem 0",
    display: "flex",
    justifyContent: "space-between"
  };

  const { theme, updateTheme, font, updateFont, liveAutocompletion, updateAutocomplete } = useContext(CodeContext);

  const setToDefault = () => {
    updateTheme("github");
    updateFont("16");
    updateAutocomplete("disable");
  };

  return (
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5" id="exampleModalLabel">Editor Settings</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <div style={myStyle}>
                        <h6>Editor Theme</h6>
                        <select className="settings-dropdown" value={theme} onChange={(event) => {updateTheme(event.target.value)}}>
                            <option value="github">GitHub (Default)</option>
                            <option value="chrome">Chrome</option>
                            <option value="dawn">Dawn</option>
                            <option value="ambiance">Ambiance</option>
                            <option value="monokai">Monokai</option>
                            <option value="dracula">Dracula</option>
                            <option value="twilight">Twilight</option>
                            <option value="tomorrow_night_bright">Tomorrow Night Bright</option>
                            <option value="tomorrow_night_blue">Tomorrow Night Blue</option>
                        </select>
                    </div>
                    <div style={myStyle}>
                        <h6>Font Size</h6>
                        <select className="settings-dropdown" value={font} onChange={(event) => {updateFont(event.target.value)}}>
                            <option value="12">12</option>
                            <option value="16">16 (Default)</option>
                            <option value="18">18</option>
                            <option value="20">20</option>
                            <option value="24">24</option>
                        </select>
                    </div>
                    <div style={myStyle}>
                        <h6>Auto Completion</h6>
                        <select className="settings-dropdown" value={liveAutocompletion} onChange={(event) => {updateAutocomplete(event.target.value)}}>
                            <option value="enable">Enable</option>
                            <option value="disable">Disable (Default)</option>
                        </select>
                    </div>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={setToDefault}>Set To Default</button>
                </div>
            </div>
        </div>
    </div>
  );
}
