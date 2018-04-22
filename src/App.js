import React, { Component } from 'react';
import './App.css';
import Tone from 'tone'
import Grid from './components/Grid.jsx';
import WebGLComponent from './components/WebGLComponent.jsx';

// PARENT NODE
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      grid: null, // CHILD NODE A
      webGL: null // CHILD NODE B
    }
    this.setGridState = this.setGridState.bind(this);
    this.setWebGLState = this.setWebGLState.bind(this);
  }

  // METHOD FOR CHILD NODE A
  setGridState = (gridState) => {
    this.setState({grid: gridState});
  }

  // METHOD FOR CHILD NODE B
  setWebGLState = (webGLState) => {
    this.setState({ webGl: webGLState });
  }

  render() {
    return (
      <div className="App">
        <Grid webGLState={this.state.webGL} returnGridState={this.setGridState}/>
        <WebGLComponent gridState={this.state.grid} returnWebGLState={this.setwebGLState}/>
      </div>
    );
  }
}

export default App;