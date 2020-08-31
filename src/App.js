import React from "react";
import "./styles.css";
import { Stage, Layer, Circle, Text } from 'react-konva';
import Konva from 'konva';
import ColoredRect from './ColoredRect'


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", pi: 0, points: [], konvaPoints: <Circle/>};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    let val = event.target.value;
    this.setState({ value: val });
  }

  handleSubmit(event) {
    event.preventDefault();
    let val = this.state.value;
    if (!Number(val)) {
      alert("The value must be a number");
    }
    else {
      this.calculatePi(val);
    }
  }

  getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  calculatePi(n) {
    n = parseInt(n,10);
    let numPointsInCircle = 0;
    let numPointsTotal = 0;
    let x = 0;
    let y = 0;
    for (var i = 0; i < n; i++) {
      x = this.getRandomArbitrary(-1, 1);
      y = this.getRandomArbitrary(-1, 1);
      this.state.points.push([x, y]);
      if (x ** 2 + y ** 2 <= 1) {
        numPointsInCircle++;
      }
      numPointsTotal++;
    }
    let pi = (4 * numPointsInCircle) / numPointsTotal;
    let rad = 750/2;
    let key = 0;
    this.setState({ pi: pi });
    this.layer.destroyChildren();
    this.setState({konvaPoints: this.state.points.map(el => {
      return (
          <Circle key={key++} x={(el[0]*rad)+21+rad} y={((el[1]*rad)+21+rad)} radius={1} stroke="black" fill="black" />
      )
    })})
  }

 


  render() {
    
  
    return (
      <div>
        <h1>Hello {this.props.name}</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              id="piInput"
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <h2>Value of Pi: {this.state.pi}</h2>
        <Stage width={window.innerWidth} height={window.innerHeight}>
          <ColoredRect points={this.state.points}/>
          <Layer ref={ref => (this.layer = ref)}>
            {this.state.konvaPoints}
          </Layer>
        </Stage>
      </div>
    );
  }
}
