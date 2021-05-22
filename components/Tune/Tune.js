import { Component } from "react";
import { Tuner } from "./Tuner";
import Note from "./Note";
import Meter from "./Meter";

export default class Tune extends Component {
  state = {
    note: {
      name: "A",
      octave: 4,
      frequency: 440,
    },
  };

  _update(note) {
    this.setState({ note });
  }

  async componentDidMount() {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      console.log(stream);
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();

      const audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", (event) => {
        console.log(event);
        audioChunks.push(event.data);
      });
    });

    // const tuner = new Tuner();
    // tuner.start();
    // tuner.onNoteDetected = (note) => {
    //   if (this._lastNoteName === note.name) {
    //     this._update(note);
    //   } else {
    //     this._lastNoteName = note.name;
    //   }
    // };
  }

  render() {
    return (
      <>
        {/* <Meter cents={this.state.note.cents} /> */}
        {/* <Note {...this.state.note} /> */}
        <p>{this.state.note.frequency.toFixed(1)} Hz</p>
      </>
    );
  }
}
