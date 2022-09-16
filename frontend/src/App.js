//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
const axios = require('axios');

function App() {


  /*retreive from backend*/

  const [newTweet, setNewTweet] = useState("");
  const [createRes, setCreateRes] = useState("");

  const [delID, setDelID] = useState("");
  const [delRes, setDelRes] = useState("");

  const [retID, setRetID] = useState("");
  const [retRes, setRetRes] = useState("");

  useEffect(() => {
    /*fetch("/retrieve?tweetId=1570534434428026880").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
    <p>{backendData.message}</p>
    */
  }, [])

  const handleCreateTweet = async (event) => {
    event.preventDefault();
    await axios.get('/create', {
      params: { message: newTweet },
    })
      .then((res) => {
        console.log(res);
        setNewTweet("");
        setCreateRes(JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleDeleteTweet = async (event) => {
    event.preventDefault();
    await axios.get('/delete', {
      params: { tweetId: delID },
    })
      .then((res) => {
        console.log(res);
        setDelID("");
        setDelRes(JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleRetrieveTweet = async (event) => {
    event.preventDefault();
    await axios.get('/retrieve', {
      params: { tweetId: retID },
    })
      .then((res) => {
        console.log(res);
        setRetID("");
        setRetRes(JSON.stringify(res.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="App container-fluid text-center bg-dark vh-100">

      <br />
      <div className="text-light">
        <h1>Twitter Lab</h1>
      </div>
      <br />

      <div>
        <form className='text-center text-light container border border-1 border-secondary rounded-3' onSubmit={(e) => handleCreateTweet(e)}>

          <br />
          <div className='row'>
            <h3><label>Create a tweet</label></h3>
          </div>

          <div className='row justify-content-center'>
            <input className='col-8 rounded-3' type="text" placeholder="tweet text" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
          </div>
          <br />

          <button className="row btn btn-primary" type="submit">
            Submit
          </button>
          <br />
          <p>{createRes}</p>

        </form>

        <br />

        <form className='text-center text-light container border border-1 border-secondary rounded-3' onSubmit={(e) => handleRetrieveTweet(e)}>

          <br />
          <div className='row'>
            <h3><label>Retrieve a tweet</label></h3>
          </div>

          <div className='row justify-content-center'>
            <input className='col-8 rounded-3' type="text" placeholder="tweet id" value={retID} onChange={(e) => setRetID(e.target.value)} />
          </div>
          <br />

          <button className="row btn btn-primary" type="submit">
            Submit
          </button>
          <br />
          {retRes}
          <br />

        </form>

        <br />

        <form className='text-center text-light container border border-1 border-secondary rounded-3' onSubmit={(e) => handleDeleteTweet(e)}>

          <br />
          <div className='row'>
            <h3><label>Delete a tweet</label></h3>
          </div>

          <div className='row justify-content-center'>
            <input className='col-8 rounded-3' type="text" placeholder="tweet id" value={delID} onChange={(e) => setDelID(e.target.value)} />
          </div>
          <br />

          <button className="row btn btn-primary" type="submit">
            Submit
          </button>
          <br />
          {delRes}
          <br />

        </form>
      </div>

    </div>
  );
}

export default App;
