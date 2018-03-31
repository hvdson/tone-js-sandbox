import React, { Component } from 'react';
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

  _generateGrid = () => {
    return (
      <div className="flex-container" onClick={this._handleClick}>
        <div className="flex-item">1</div>
        <div className="flex-item">2</div>
        <div className="flex-item">3</div>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        {this._generateGrid}
      </div>
    );
  }
}

export default App;