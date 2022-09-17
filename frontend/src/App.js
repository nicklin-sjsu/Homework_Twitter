//import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react'
const axios = require('axios');

function App() {


 /**
  * Frontend Developed by Bryan and Kevin
  */

 /**
  * Create useStates for API requests
  */

  const [newTweet, setNewTweet] = useState("");
  const [createRes, setCreateRes] = useState("");
  const [showCreateRes, setShowCreateRes] = useState("");

  const [delID, setDelID] = useState("");
  const [delRes, setDelRes] = useState("");
  const [showDelRes, setShowDelRes] = useState("");

  const [retID, setRetID] = useState("");
  const [retRes, setRetRes] = useState("");
  const [showRetRes, setShowRetRes] = useState("");

  /**
   * Handle API request /create
   * Takes a message parameter and creates a new tweet with message contensts.
   * Checks for a successful tweet post and responds to the user with its contents
   * or errors.
   */

  const handleCreateTweet = async (event) => {
    event.preventDefault();
    await axios.get('/create', {
      params: { message: newTweet },
    })
      .then((res) => {
        console.log(res);
        setNewTweet("");
        setCreateRes(JSON.stringify(res.data));
        if(res.data.code == 200){
          setShowCreateRes("\nTweet Successfully Created:\n" + res.data.message.text);
        }
        else{
          setShowCreateRes("\nTweet Creation Unsuccessful\n" + "Response Code: " + res.data.code);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * Handle API request /delete
   * Takes a tweet ID and deletes the corresponding tweet.
   * Checks for successful deletion and responds with either a success message or errors.
   */

  const handleDeleteTweet = async (event) => {
    event.preventDefault();
    await axios.get('/delete', {
      params: { tweetId: delID },
    })
      .then((res) => {
        console.log(res);
        setDelID("");
        setDelRes(JSON.stringify(res.data));
        if(res.data.code == 200){
          setShowDelRes("\nTweet Successfully Deleted\n");
        }
        else{
          setShowDelRes("\nTweet Deletion Unsuccessful\n" + "Response Code: " + res.data.code);
        }
          
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /**
   * Handle API request /retrieve
   * Takes a tweet ID and retrieves the tweets message contents.
   * Checks for successful retrieval and responds with the tweet contents or an error message.
   */

  const handleRetrieveTweet = async (event) => {
    event.preventDefault();
    await axios.get('/retrieve', {
      params: { tweetId: retID },
    })
      .then((res) => {
        console.log(res);
        setRetID("");
        setRetRes(JSON.stringify(res.data));
        if(res.data.code == 200){
          setShowRetRes("\nTweet Text: \n" + res.data.message);
        }
        else{
          setShowRetRes("\nTweet Retrieval Error\n" + res.data.code);
        }
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
          <div className='new-line'>
            <p>{showCreateRes}</p>
          </div>
          

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
          <div className='new-line'>
            <p>{showRetRes}</p>
          </div>
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
          <div className='new-line'>
            <p>{showDelRes}</p>
          </div>
          <br />

        </form>
      </div>

    </div>
  );
}

export default App;
