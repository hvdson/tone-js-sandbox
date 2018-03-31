import React, { Component } from 'react';
import './App.css';
import Tone from 'tone'
import Grid from './components/Grid.jsx';

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
        <Grid />
      </div>
    );
  }
}

export default App;