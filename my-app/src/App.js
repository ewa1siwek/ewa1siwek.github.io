import React, { Component } from 'react';
import './App.css';
import AppHeader from "./AppHeader";
import InputBar from "./InputBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <React.Fragment>
          <AppHeader />
          <InputBar />
        </React.Fragment>

      </div>
    );
  }
}

export default App;
