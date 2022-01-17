import { useState } from "react";

export function NewChapter({ onNewChapter }) {
  const [chapter, setChapter] = useState({});

  function onSubmit(event) {
    event.preventDefault();
    const { start, end, name } = chapter;
    onNewChapter(new Chapter(start, end, name));
    setChapter({});
  }

  function update(e) {
    setChapter({
      ...chapter,
      [e.target.name]: e.target.value,
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Start
        <input type="float" name="start" value={chapter?.start || ""} onChange={update} />
      </label>
      <label>
        End
        <input type="float" name="end" value={chapter?.end || ""} onChange={update} />
      </label>
      <label>
        Name
        <input type="text" name="name" value={chapter?.name || ""} onChange={update} />
      </label>

      <button type="submit">Save </button>
    </form>
  );
}

export class Chapter {
  constructor(start, end, name) {
    this.start = Number.parseFloat(start);
    this.end = Number.parseFloat(end);
    this.name = name;
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

  minus(another) {
    return this.start !== another.start ? this.start - another.start : this.end - another.end;
  }

  outsideBounds(currentTime) {
    return currentTime < this.start || currentTime >= this.end;
  }
}
