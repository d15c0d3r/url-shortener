import { useState } from "react";
import axios from "axios"
import TestInfo from "./TestInfo";

function App() {
  const [postUrl, setpostUrl] = useState("");
  const [postName, setpostName] = useState("");
  const [postStatus , setpostStatus] = useState(false);
  const [getName, setGetName] = useState("");
  const [getStatus , setgetStatus] = useState(false);
  const [getTestInfo, setGetTestInfo] = useState(false);
  const [urls, setUrls] = useState([]);
  
  const handleSubmit = (e)=>{
    e.preventDefault()
    setgetStatus(false)
    setGetTestInfo(false)
    axios.post("http://localhost:4001/shorten",{name : postName , url : postUrl})
      .then(res => {
        console.log(res.data)
        setpostStatus(res.data)
      })
      .catch(err => {console.log(err)})
  }

  const getURL = (e)=>{
    e.preventDefault()
    axios.get(`http://localhost:4001/name/${getName}`)
      .then(res => {
        console.log(res.data)
        if(res.data === "No Test links found") setgetStatus("No Test links found")
        else setGetTestInfo(res.data)
      })
  }

  const getAllURLs = ()=>{
    //get All URLs
  }

  return (
    <div>
    <h2>SHORTEN TEST LINK</h2>
    <form onSubmit = {(e)=>{handleSubmit(e)}}>
      <label>Enter Test Name </label>
        <input 
          required
          id = "name1" 
          type = "text" 
          onChange = {(e)=>{setpostName(e.target.value)}}/>
          <br/>
        <label>Enter URL to Shorten </label>
        <input 
          required
          id = "url" 
          type = "text" 
          onChange = {(e)=>{setpostUrl(e.target.value)}}/>
          <br/>
      <input type = "submit" value = "Shorten"/>
    </form>

    {postStatus? (<div>{postStatus}</div>): (<div></div>)}

    <h2>GET A TEST LINK</h2>
    <label>Enter Test Name </label>
    <form onSubmit = {(e)=>{getURL(e)}}>
      <input 
        required
        id = "name2" 
        type = "text" 
        onChange = {(e)=>{setGetName(e.target.value)}}/>
      <input type = "submit" value = "Get Link"/>
    </form>

    {getStatus? (<div>{getStatus}</div>): (<div></div>)}
    {getTestInfo? 
      <TestInfo name = {getTestInfo.name} visits = {getTestInfo.visits} short = {getTestInfo.short} full = {getTestInfo.full}/> : <div></div>
    }

    <h2>GET ALL TEST LINKS</h2>
    <button onClick = {(e)=>getAllURLs()}>Get Test links</button>
    </div>
  );
}

export default App;
