import { useState } from "react";
import axios from "axios"
import {Button, Alert, Form, Table}from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


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
    setpostStatus(false)
    setgetStatus(false)
    setGetTestInfo(false)
    axios.post("http://localhost:4001/shorten",{name : postName , url : postUrl})
      .then(res => {
        setpostStatus(res.data)
      })
      .catch(err => {console.log(err)})
  }

  const getURL = (e)=>{
    e.preventDefault()
    setpostStatus(false)
    setgetStatus(false)
    axios.get(`http://localhost:4001/name/${getName}`)
      .then(res => {
        if(res.data === "No Test links found") setgetStatus("No Test links found")
        else setGetTestInfo(res.data)
      })
  }

  const getAllURLs = (e)=>{
    e.preventDefault()
    setpostStatus(false)
    setgetStatus(false)
    setGetTestInfo(false)
    axios.get(`http://localhost:4001/find-all/urls`)
      .then(res=>{
        if(res.data[0]){
          setUrls(res.data)
        }
      })
      .catch(err=>{
        console.log(err)
      })
  }

  return (
    <div>
      <Form onSubmit = {(e)=>{handleSubmit(e)}}>
        <Alert  
          variant='primary'>
          <h3>SHORTEN TEST LINK</h3>
        </Alert>
        <Form.Group className="mb-3" controlId="urlname">
          <Form.Control 
            type="text" 
            placeholder="Enter URL Name" 
            required
            onChange = {(e)=>{setpostName(e.target.value)}}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="url">
          <Form.Control 
            type="text" 
            placeholder="Enter URL" 
            required 
            onChange = {(e)=>{setpostUrl(e.target.value)}}/>
          {postStatus && postStatus!==`TestURL or TestName already exists!`? 
          <Form.Text 
            className="text-muted">
              <a href = {`http://localhost:4001/${postStatus}`}>{postStatus}</a>
          </Form.Text> : 
          <Form.Text className="text-primary">{postStatus}</Form.Text>}
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit">
          Shorten
        </Button>
      </Form>
      <br/>
      <Form onSubmit = {(e)=>{getURL(e)}}>
        <Alert  
          variant='primary'>
          <h3>GET A TEST LINK</h3>
        </Alert>
        <Form.Group className="mb-3">
        <Form.Control 
            type="text" 
            placeholder="Enter test name" 
            required 
            onChange = {(e)=>{setGetName(e.target.value)}}/>
        {getStatus? <Form.Text className="text-primary">{getStatus}</Form.Text> : <div></div>}
        </Form.Group>
        
        <Button 
          variant="primary" 
          type="submit">
          Get test info
        </Button>
      </Form>
      <br/>
      {getTestInfo? 
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
              <th>TestName</th>
              <th>Full URL</th>
              <th>Short URL</th>
              <th>Visits</th>
              </tr>
            </thead>
            <tbody>
              <tr hover = {true}>
              <td>{getTestInfo.name}</td>
              <td>{getTestInfo.full}</td>
              <td><a href = {`http://localhost:4001/${getTestInfo.short}`}>{getTestInfo.short}</a></td>
              <td>{getTestInfo.visits}</td>
              </tr>
            </tbody>
          </Table>
        </div> : <div></div>
      }
      <Form onSubmit = {(e)=>{getAllURLs(e)}}>
        <Alert variant = "primary"><h3>GET ALL TESTS LINKS</h3></Alert>
        <Form.Group className="mb-3">
          <Button 
            variant="primary" 
            type="submit">
            Get all tests
          </Button>
        </Form.Group>
      </Form>
      <Table striped bordered hover>
        <thead>
          <tr>
          <th>TestName</th>
          <th>Full URL</th>
          <th>Short URL</th>
          <th>Visits</th>
          </tr>
        </thead>
        {urls.map(url =>(
          <tbody key = {url._id}>
            <tr>
            <td>{url.name}</td>
            <td>{url.full}</td>
            <td><a href = {`http://localhost:4001/${url.short}`}>{url.short}</a></td>
            <td>{url.visits}</td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
}

export default App;
