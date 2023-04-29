export class Chapter {
  constructor(id, start, end, name) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.name = name;
  }

  static fromInput({ id, start, end, name }) {
    return new Chapter(id, start, end, name);
  }

  get key() {
    return `${this.start}-${this.end}-${this.name}`;
  }

  get paragraph() {
    return `${this.name}: ${this.start}-${this.end}`;
  }

  isEqualTo(another) {
    return this.start === another?.start && this.end === another?.end;
  }

  isValid() {
    if (!this.start || !this.end || !this.name) {
      return "Please add a start, end, name";
    }
    if (this.start < 0 && this.end < 1) {
      return "Start and end must be positive numbers!";
    }
    if (this.start > this.end) {
      return "The end must be after the start!";
    }
    if (this.start === this.end) {
      return "Start and end must be further from each other!";
    }
  }

  minus(another) {
    return this.start !== another.start
      ? this.start - another.start
      : this.end - another.end;
  }

  outsideBounds(currentTime) {
    return currentTime < this.start || currentTime >= this.end;
  }
}
