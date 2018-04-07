import React, { Component } from 'react';
import Tone, {Player, Players} from 'tone'
import Play from '../assets/play.svg'
import Stop from '../assets/stop.svg'

import Kick from '../assets/samples/Kick.wav'
import Snare from '../assets/samples/Snare.wav'
import Hat from '../assets/samples/Hat.wav'
import Clap from '../assets/samples/Clap.wav'
import Tom from '../assets/samples/Tom.wav'

import FlavorTown from '../assets/flavortown.jpeg'

const kickPlayer = new Tone.Player(Kick).toMaster();
const snarePlayer = new Tone.Player(Snare).toMaster();
const hatPlayer = new Tone.Player(Hat).toMaster();
const clapPlayer = new Tone.Player(Clap).toMaster();
const tomPlayer = new Tone.Player(Tom).toMaster();


const ON = 1;
const OFF = 0;

const calculateInterval = (bpm) => ((60000 / bpm) * 4) / 8;


// TODO: add clear all button to reset transportGrid to 0;

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 120,
      oscillatorOn: false,
      playing: false,
      currentStep: -1,
      totalSteps: 16,
      positionGrid: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      transportGrid: {
        kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        hat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        clap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tom: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    };

    // loop 4 bars
    Tone.Transport.setLoopPoints(0, "4m");
    Tone.Transport.loop = true;
    Tone.Transport.bpm.value =  this.state.bpm * 4;

    this._runScheduler = this._runScheduler.bind(this);
    this._stopScheduler = this._stopScheduler.bind(this);
    this._handleClick = this._handleClick.bind(this);
    this._clearGrid = this._clearGrid.bind(this);
    this._handleBpmSlider = this._handleBpmSlider.bind(this);
  }
  
  _handleClick = (e) => {
    e.preventDefault();
    console.log(e.target);

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

  _handleStopPlay = (e) => {
    e.preventDefault();
    console.log(e.target.id);
  }

  // keep track of state when mouseclick event is fired (change class -> color of button to persist)
  _renderStopPlay = (id, className, src) => {
    return (
      <div id={id} className={className} onClick={id === 'play' ? this._runScheduler : this._stopScheduler}>
        <h3><img src={src} width="20" alt={id} /></h3>
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
      if (this.state.transportGrid.kick[currPos] === ON) {
        kickPlayer.start();
      }
      if (this.state.transportGrid.snare[currPos] === ON) {
        snarePlayer.start();
      }
      if (this.state.transportGrid.hat[currPos] === ON) {
        hatPlayer.start();
      }
      if (this.state.transportGrid.clap[currPos] === ON) {
        clapPlayer.start();
      }
      if (this.state.transportGrid.tom[currPos] === ON) {
        tomPlayer.start();
      }
    }, '4n');
  }

  _stopScheduler = (e) => {
    e.preventDefault();
    console.log('STOPPING');
    Tone.Transport.stop();
    console.log(Tone.Transport);
  }

  _clearGrid = (e) => {
    e.preventDefault();
    console.log('INSIDE');
    this.setState({
      transportGrid: {
        kick: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        snare: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        hat: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        clap: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        tom: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      }
    })
  }

  _handleBpmSlider = (e) => {
    this.setState({bpm: e.target.value});
    Tone.Transport.bpm.value = this.state.bpm * 4;
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
          {this._renderFlexItem('clap')}
          {this._renderFlexItem('tom')}
        </div>

        <div className="transport-options"> 
          <div className="track-controls">
            {this._renderStopPlay('stop', 'stop-button', Stop)}
            {this._renderStopPlay('play', 'play-button', Play)}
          </div>

          <div className="misc-options">
            <div className="set-bpm">
              <h3>BPM:{this.state.bpm}</h3>
              <input type="range" min="40" max="250" value={this.state.bpm} id="myRange" onInput={this._handleBpmSlider}/>
            </div>

            <div className="clear-grid" onClick={this._clearGrid}>
              <h3>CLEAR GRID</h3>
            </div>

          </div>
        </div>

        {/* <img className="flavor-town" src={FlavorTown} /> */}
      
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
      return 'position-item position-item-on';
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