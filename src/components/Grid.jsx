import React, { Component } from 'react';
import Tone from 'tone'
import Play from '../assets/play.svg'
import Stop from '../assets/stop.svg'

const ON = 1;
const OFF = 0;

const calculateInterval = (bpm) => ((60000 / bpm) * 4) / 8;

// TODO: Add transport method from tone.js to read transportGrid State
// TODO: Have transparent overlay to indicate what beat is being played

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.omniOsc = new Tone.OmniOscillator("C#4", "pwm").toMaster();
    this.state = {
      bpm: 120,
      oscillatorOn: false,
      playing: false,
      currentStep: -1,
      totalSteps: 16,
      positionGrid: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      transportGrid: {
        kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        snare : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        hat : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tom : [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    };

    // loop 4 bars
    Tone.Transport.setLoopPoints(0, "4m");
    Tone.Transport.loop = true;

    this._runScheduler = this._runScheduler.bind(this);
    this._stopScheduler = this._stopScheduler.bind(this);
    this._handleClick = this._handleClick.bind(this)
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
    let currGrid = this.state.transportGrid;

    if (this.state.transportGrid[instr][pos] === OFF) {
      currGrid[instr][pos] = 1;
      this.setState({transportGrid: currGrid});
      console.log(this.state);
    } else {
      currGrid[instr][pos] = 0;
      this.setState({ transportGrid: currGrid });
      console.log(this.state);
    }
  }

  _handleTick = (idx) => {
    console.log(idx);
    console.log(Tone.Transport.position);


    // if (this.state.transportGrid[instr][pos] === OFF) {
    //   currGrid[instr][pos] = 1;
    //   this.setState({ transportGrid: currGrid });
    //   console.log(this.state);
    // } else {
    //   currGrid[instr][pos] = 0;
    //   this.setState({ transportGrid: currGrid });
    //   console.log(this.state);
    // }
  }

  _handleStopPlay = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  }

  // keep track of state when mouseclick event is fired (change class -> color of button to persist)
  _renderStopPlay = (id, className, src) => {
    return (
      <div id={id} className={className} onClick={id === 'play' ? this._runScheduler : this._stopScheduler}>
        <img src={src} width="20" alt={id} />
      </div>
    )
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
          return <GridItem instr={instr} idx={idx} toggle={this.state.transportGrid[instr][idx]} _handleClick={this._handleClick.bind(this)} />
        })}
      </div>
    )
  }

  _renderPositionGrid = () => {
    return (
      <div className="flex-container">
        {Array.apply(null, this.state.positionGrid).map((i, idx) => {
          return <PositionGridItem idx={idx} toggle={this.state.positionGrid[idx]} />
        })}
      </div>
    )
  }

  /**
 * Copied from @florida
 * Receives messages from the timer in the service worker
 * Handles advancing steps in the sequencer
 * Updates the component currentStep state and reverts back to the beginning of the sequence
 * @param  {object} event data being received from the service worker
 */
  _handleStep = (event) => {
    if (event.state === 'step') {
      if (this.state.currentStep < this.state.totalSteps - 1) {
        this.setState({ currentStep: this.state.currentStep + 1 })
      } else {
        this.setState({ currentStep: 0 })
      }
    }
  }

  _runScheduler = (e) => {
    e.preventDefault();
    console.log('PLAYING');
    //repeated event every 8th note
    Tone.Transport.start().scheduleRepeat( (time) => {
      //do something with the time

      let newGrid = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      let posArr = Tone.Transport.position.split(':'); 
      // converts the transport position to 1d array for indexing
      let currPos = (Number(posArr[0]) * 4) + (Number(posArr[1]) + 1) - 1; 
      newGrid[currPos] = ON;
      this.setState({positionGrid: newGrid});
      // this._handleTick();
      // console.log(Tone.Transport.state);
      // console.log(Tone.Transport.ticks);
      
    }, '4n');
  }

  _stopScheduler = (e) => {
    e.preventDefault();
    console.log('STOPPING');
    //repeated event every 8th note
    Tone.Transport.stop()
    console.log(Tone.Transport.state);
    console.log(Tone.Transport.ticks);
    console.log(Tone.Transport.position);
  }

  // TODO: dry up by calling a seperate component for each semantic tag
  render() {
    return (
      <div className="container">
        <div>
          {this._renderPositionGrid()}
        </div> 

        <div id="transport-grid" className="transport">
          {this._renderFlexItem('kick')}
          {this._renderFlexItem('snare')}
          {this._renderFlexItem('hat')}
          {this._renderFlexItem('tom')}
        </div>

        <div className="track-controls">
          {this._renderStopPlay('stop', 'stop-button', Stop)}
          {this._renderStopPlay('play', 'play-button', Play)}
        </div>

        <div>
          <h3>BPM:{this.state.bpm}</h3>
        </div>
      
      </div>
    )
  }
}

class GridItem extends Component {
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

class PositionGridItem extends Component {
  _handleToggle = () => {
    if (this.props.toggle === ON) {
      return 'position-item grid-on';
    } else {
      return 'position-item';
    }
  }

  render() {
    return (
      <div id={`positionGrid-${this.props.idx}`} className={this._handleToggle()}></div>
    )
  }
}