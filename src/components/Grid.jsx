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
    this.setState({ oscillatorOn: true });
  }

  _renderFlexItem = (instr) => {
    return (
      <div className="flex-container">
        {Array.apply(null, this.state.transportGrid.kick).map((i) =>
          <div className="flex-item" onClick={this._handleClick}>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <div className="container">
        <div id="transport-grid">
          {this._renderFlexItem('KICK')}
          {this._renderFlexItem('SNARE')}
          {this._renderFlexItem('HAT')}
          {this._renderFlexItem('TOM')}
        </div>
        <div className="instrument-labels">
          <span>DANK</span>
        </div>
          
      </div>
    )
  }
}