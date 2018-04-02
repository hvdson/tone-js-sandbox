import React, { Component } from 'react';
import Tone from 'tone'

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.omniOsc = new Tone.OmniOscillator("C#4", "pwm").toMaster();
    this.state = {
      oscillatorOn: false,
      transportGrid: {
        kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        snare : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        hat : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tom : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    };
  }
  
  _handleClick = (e) => {
    e.preventDefault();
    console.log(e.target.id);
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
    this.setState({ oscillatorOn: true });
  }

  _renderFlexItem = (instr) => {
    return (
      <div className="flex-container">
        {Array.apply(null, this.state.transportGrid.kick).map((i, idx) =>
          <div id={`${instr}-${idx}`}className="flex-item" onClick={this._handleClick}>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <div id="transport-grid" className="transport">
          {this._renderFlexItem('kick')}
          {this._renderFlexItem('snare')}
          {this._renderFlexItem('hat')}
          {this._renderFlexItem('tom')}
        </div>
        <footer className="track-controls">
          <i className="fas fa-stop stop-button"></i>
          <i className="fas fa-play play-button"></i>
        </footer>
      </div>
    )
  }
}