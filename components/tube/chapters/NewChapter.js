export function NewChapter({ onNewChapter }) {
  function onSubmit(event) {
    event.preventDefault();
    const [{ value: start }, { value: end }, { value: name }] = event.target;
    onNewChapter({ start, end, name, id: `${start}-${end}-${name}` });
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Start
        <input type="float" id="start" />
      </label>
      <label>
        End
        <input type="float" id="end" />
      </label>
      <label>
        Name
        <input type="text" id="name" />
      </label>

      <input type="submit" value="Save" />
    </form>
  );
}
