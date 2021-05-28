import PitchFinder from "pitchfinder";

const pitchFinder = new PitchFinder.AMDF({
  maxFrequency: 800,
  minFrequency: 1,
});

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
  const pitch = pitchFinder(data);
  if (pitch) {
    const frequency = getNoteFrequency(pitch);
    return {
      pitch,
      name: allNotes[frequency % 12],
      value: frequency,
      cents: getCents(pitch, frequency),
      octave: parseInt(frequency / 12, 10) - 1,
      frequency,
    };
  }
}
