import PitchFinder from "pitchfinder";

const pitchFinder = new PitchFinder.YIN();

const allNotes = [
  "C",
  "C♯",
  "D",
  "D♯",
  "E",
  "F",
  "F♯",
  "G",
  "G♯",
  "A",
  "A♯",
  "B",
];
const middleA = 440;
const semitone = 69;

// get musical note from frequency
function getNoteFrequency(frequency) {
  const note = 12 * (Math.log(frequency / middleA) / Math.log(2));
  return Math.round(note) + semitone;
}

// get the musical note's standard frequency
function getStandardFrequency(note) {
  // eslint-disable-next-line no-restricted-properties
  return middleA * Math.pow(2, (note - semitone) / 12);
}

// get cents difference between given frequency and musical note's standard frequency
function getCents(frequency, note) {
  return Math.floor(
    (1200 * Math.log(frequency / getStandardFrequency(note))) / Math.log(2)
  );
}

export function getNote(data) {
  const frequency = pitchFinder(data);
  if (frequency) {
    const note = getNoteFrequency(frequency);
    return (
      "note",
      {
        name: allNotes[note % 12],
        value: note,
        cents: getCents(frequency, note),
        octave: parseInt(note / 12, 10) - 1,
        frequency,
      }
    );
  }
}
