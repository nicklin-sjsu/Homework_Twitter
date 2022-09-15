//import logo from './logo.svg';
import './App.css';
import React, { useEffect, useState } from 'react'

function App() {

 
  /*retreive from backend*/
   
  /*  
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, []) */

  return (
    <div className="App">
      <header className="App-header">
      <h3>Twitter Lab</h3>
      </header>
    </div>
  );
}

export default App;
