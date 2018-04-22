import React, { Component } from 'react';
import '../App.css';

export default class WebGLObjects extends Component {

  constructor(props) {
    super(props);
    this.state = null
    this.main = this.main.bind(this);
  }

  main() {
    const canvas = document.querySelector("#glCanvas");
    // Initialize the GL context
    const gl = canvas.getContext("webgl");

    // Only continue if WebGL is available and working
    if (!gl) {
      alert("Unable to initialize WebGL. Your browser or machine may not support it.");
      return;
    }

    // Set clear color to black, fully opaque
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    // Clear the color buffer with specified clear color
    gl.clear(gl.COLOR_BUFFER_BIT);
  }


  render() {
    return (
      <canvas id="glCanvas" width="640" height="480"></canvas>
    );
  }

  componentDidMount() {
    this.main();
  }
}