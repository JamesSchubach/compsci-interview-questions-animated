import React, { Component } from 'react';
import { Circle, Layer, Rect, Line } from 'react-konva';
import Konva from 'konva';

class ColoredRect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'green',
      square: 750,
      points: [],
    };
  }

  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };

  render() {
    let rad = this.state.square / 2
    let points = this.state.points.map((x,y) => {
      return (
        <Circle x={x} y={y} radius={2} stroke="black" fill="black" />
      )
    })


    return (
      <Layer>
        <Rect
          x={20}
          y={20}
          width={this.state.square}
          stroke="black"
          height={this.state.square}
        />
        <Circle x={(this.state.square / 2) + 20} y={20 + rad} radius={rad} stroke="black" />
        {points}
      </Layer>
    );
  }
}

export default ColoredRect;