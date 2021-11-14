import { BrowserRouter } from "react-router-dom";
import {Route , Switch} from "react-router-dom";
import { useState } from "react";

function App() {
  const [url, setUrl] = useState("");

  return (
    <div>
      <label>Enter URL to Shorten </label>
      <input 
        required
        id = "url" 
        type = "text" 
        onChange = {(e)=>{setUrl(e.target.value)}}/>
        <br/>
      <button>Shorten!</button>
    </div>
  );
}

export default App;
