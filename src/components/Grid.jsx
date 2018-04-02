import React, { Component } from 'react';
import Tone from 'tone'

export default class Grid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    }
  }

  // render() {
  //   return (
  //     <div>
  //       <div className="flex-container" onClick={this._handleClick}>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //       </div>

  //       <div className="flex-container" onClick={this._handleClick}>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //         <div className="flex-item"></div>
  //       </div>
  //     </div>
  //   )
  // }

  render() {
    return (
      <div>
        {Array.apply(null, Array(4)).map((i) =>
          <div className="flex-container" onClick={this._handleClick}>
            {Array.apply(null, Array(16)).map((i)=>
              <div className="flex-item"></div>
            )}
          </div>
        )}
      </div>
    )
  }
}

const _renderFlexItem = () => {
  return (<div className="flex-item"></div>)
}
