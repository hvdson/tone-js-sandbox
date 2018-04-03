import React, { Component } from 'react';
import Tone from 'tone'

const ON = 1;

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
    console.log(e.target);
    // if (this.state.oscillatorOn) {
    //   this.omniOsc.stop();
    //   this.setState({ oscillatorOn: false });
    // } else {
    //   this._newSynth();
    // }
    const gridLocation = e.target.id.split('-');
    const instr = gridLocation[0];
    const pos = Number(gridLocation[1]);

    if (this.state.transportGrid[instr][pos] === 0) {
      let currGrid = this.state.transportGrid;
      currGrid[instr][pos] = 1;
      this.setState({transportGrid: currGrid});

      console.log(this.state.transportGrid)
    }
    console.log(instr, pos);
  }

  _newSynth = () => {
    //create a synth and connect it to the master output (your speakers)
    this.omniOsc.start();
    this.setState({ oscillatorOn: true });
  }

  _renderFlexItem = (instr) => {
    return (
      <div className="flex-container">
        {Array.apply(null, this.state.transportGrid.kick).map((i, idx) => {
          if (this.state.transportGrid[instr][idx] === 1) {
            return <div id={`${instr}-${idx}`} className="flex-item grid-on" onClick={this._handleClick.bind(this)}></div>
          } else {
            return <GridItem instr={instr} idx={idx} toggle={this.state.transportGrid[instr][idx]} _handleClick={this._handleClick.bind(this)}/>
          }
        })}
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

class GridItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridClass: ['flex-item'],
    }
  }

  // _toggleOn = () => {
  //   this.setState({ gridClass: ['flex-item', 'grid-on'] });
  // }

  // _toggleOff = () => {
  //   this.setState({ gridClass: ['flex-item'] });
  // }

  _handleToggle = () => {
    if (this.props.toggle === ON) {
      return 'flex-item grid-on';
    } else {
      return 'flex-item';
    }
  }

  render() {
    return (
      <div id={`${this.props.instr}-${this.props.idx}`} className={this._handleToggle()} onClick={this.props._handleClick}></div>
    )
  }
}