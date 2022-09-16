//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react'
const axios = require('axios');

function App() {


  /*retreive from backend*/

  const [newTweet, setNewTweet] = useState("")

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

  const handleCreateTweet = async () => {
    await axios.get('/create', {
      params: {message: newTweet},
    })
      .then(function (response) {
        console.log(response);
        setNewTweet("");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const handleDeleteTweet = () => {

  }

  const handleRetrieveTweet = () => {

  }

  return (
    <div className="App container-fluid text-center bg-dark vh-100">

      <br />
      <div className="text-light">
        <h1>Twitter Lab</h1>
      </div>
      <br />

      <div>
        <form className='text-center text-light container border border-1 border-secondary rounded-3' onSubmit={() => handleCreateTweet()}>
          
          <br />
          <div className='row'>
            <h3><label>Create a tweet</label></h3>
          </div>

          <div className='row justify-content-center'>
            <input className='col-8 rounded-3' type="text" placeholder="tweet" value={newTweet} onChange={(e) => setNewTweet(e.target.value)} />
          </div>
          <br />

          <button className="row btn btn-primary" type="submit">
            Submit
          </button>
          <br />
          <br />
          
        </form>
      </div>

    </div>
  );
}

export default App;
