import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tone from 'tone'

class App extends Component {
  constructor(props) {
    super(props);
    this.omniOsc = new Tone.OmniOscillator("C#4", "pwm").toMaster();
    this.state = {
      oscillatorOn: false
    };
  }

  _handleClick = () => {
    if (this.state.oscillatorOn) {
      this.omniOsc.stop();
      this.setState({ oscillatorOn: false });
    } else {
      this._newSynth();
    }
  }

  _newSynth = () => {
    //create a synth and connect it to the master output (your speakers)
    this.omniOsc.start();
    this.setState({oscillatorOn: true});
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          <button onClick={this._handleClick}>IT's LIT</button>
        </p>
      </div>
    );
  }
}

export default App;