import { Component } from "react";

export default class Note extends Component {
  render() {
    return (
      <>
        <p>{this.props.name[0]}</p>
        <p>{this.props.octave}</p>
        <p>{this.props.name[1]}</p>
      </>
    );
  }
}
