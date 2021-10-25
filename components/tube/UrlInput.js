export function UrlInput({ setVideoUrl }) {
  function selectVideo(e) {
    e.preventDefault();
    const [{ value }] = e.target;
    setVideoUrl(value);
  }

  return (
    <form onSubmit={selectVideo}>
      <label htmlFor="url">Url</label>
      <input id="url" type="text" />
      <label htmlFor="selectVideo">Select</label>
      <input id="selectVideo" type="submit" />
    </form>
  );
}
