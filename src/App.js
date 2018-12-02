import React, { Component } from 'react';
/* import logo from './logo.svg'; */
import './App.css';

const CLIENT_ID = '497f6e942c12049b25219e2e6d23ddfcbd3f3be7b7de3672d2bc79a36d0205d2'
const REDIRECT_URI = 'http://localhost:3000/auth/redirect'

class App extends Component {
  state = {
    response: ''
  };

  componentDidMount() {
    if (window.location.href.match(/code=(.*)/)) {
      const code =
        window.location.href.match(/code=(.*)/)[1]
      fetch('/api/session', {
        method: 'POST',
        headers: { "Content-Type": "application/json"},
        mode: 'cors',
        body: JSON.stringify({ code: code })
      })
          .then(res => {
            return res.json()
          })
          .then(data => {
            window.location = '/homepage'
          })
          .catch(error => {
            console.log(error)
          })
    }
  }

  getAuthorization = () => {
    window.location = `http://localhost:8000/oauth/authorize?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.getAuthorization}>Submit</button>
      </div>
    );
  }
}

export default App;
