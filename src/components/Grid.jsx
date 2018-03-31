import React, { Component } from 'react';
import Tone from 'tone'

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    }
  }

  render() {
    return (
      <div className="flex-container" onClick={this._handleClick}>
        <div className="flex-item">1</div>
        <div className="flex-item">2</div>
        <div className="flex-item">3</div>
      </div>
    )
  }
}
