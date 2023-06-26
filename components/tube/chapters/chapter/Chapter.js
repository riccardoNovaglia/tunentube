export class Chapter {
  constructor(id, start, end, name, isActive) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.name = name;
    this.isActive = isActive;
  }

  static fromData({ id, start, end, name }, activeChapter) {
    return new Chapter(id, start, end, name, id === activeChapter?.id);
  }
  static fromForm({ start, end, name }) {
    return new Chapter(null, start, end, name, false);
  }

  isEqualTo(another) {
    return this.start === another?.start && this.end === another?.end;
  }

  isValid() {
    const { start, end, name } = this;
    if (!end || !name) {
      return "Please add a start, end, name";
    }
    if (start < 0 || end < 1) {
      return "Start and end must be positive numbers!";
    }
    if (start > end) {
      return "The end must be after the start!";
    }
    if (start === end) {
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
