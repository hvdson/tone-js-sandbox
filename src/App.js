import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tone from 'tone'

class App extends Component {

  _newSynth() {
    //create a synth and connect it to the master output (your speakers)
    var synth = new Tone.Synth().toMaster()

    //play a middle 'C' for the duration of an 8th note
    synth.triggerAttackRelease('C4', '8n')
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          IT's LIT
          {this._newSynth}
        </p>
      </div>
    );
  }
}

export default App;