import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chapters } from "./Chapters";
import { Chapter } from "./Chapter";

it("starts with the given preset chapters", async () => {
  renderChapters([new Chapter(12, 21, "abc")]);

  expect(screen.getByText(/abc: 12-21/i)).toBeInTheDocument();
});

it("adds a new chapter", async () => {
  const { createNewChapter } = renderChapters();

  await createNewChapter("1", "2", "some name");

  expect(screen.getByText(/some name: 1-2/i)).toBeInTheDocument();
});

it("does not add the same chapter twice", async () => {
  const { createNewChapter } = renderChapters();

  await createNewChapter("1", "2", "some name");
  await createNewChapter("1", "2", "some name");

  expect(screen.getAllByText(/some name: 1-2/i).length).toEqual(1);
});

it("orders chapters as they are added", async () => {
  const { createNewChapter } = renderChapters();

  await createNewChapter("4", "5", "second");
  await createNewChapter("4", "6", "third");
  await createNewChapter("1", "4", "first");

  const chapters = screen.getAllByRole("checkbox");
  const chaptersNames = chapters.map((ch) =>
    ch.parentElement.textContent.replace("Delete", "")
  );
  expect(chaptersNames).toEqual(["first: 1-4", "second: 4-5", "third: 4-6"]);
});

it("sets the a chapter as active it's the active chapter", async () => {
  const chapter = new Chapter(1, 2, "name");
  renderChapters([chapter], chapter);
  expect(screen.getByRole("checkbox", { name: /name/i }).checked).toBe(true);
});

it("calls the chapter trigger with the chapter, when selected", async () => {
  const { user, createNewChapter, onChapterTrigger } = renderChapters();

  await createNewChapter("2", "4", "first");
  await createNewChapter("9", "10", "second");
  await user.click(screen.getByRole("checkbox", { name: /first/ }));
  await user.click(screen.getByRole("checkbox", { name: /second/ }));

  expect(onChapterTrigger).toBeCalledTimes(2);
  expect(onChapterTrigger).toBeCalledWith({ start: 2, end: 4, name: "first" });
  expect(onChapterTrigger).toBeCalledWith({ start: 9, end: 10, name: "second" });
});

it("deletes items when their delete button is clicked", async () => {
  const { user } = renderChapters([
    new Chapter(1, 2, "name"),
    new Chapter(3, 4, "another"),
  ]);
  const chapterElement = screen.getByRole("checkbox", { name: /another/i }).parentElement;
  const deleteButton = within(chapterElement).getByRole("button", { name: "Delete" });

  await user.click(deleteButton);

  expect(screen.getByText(/name/)).toBeInTheDocument();
  expect(screen.queryByText(/another/)).not.toBeInTheDocument();
});

it("cancels addition when the cancel button is pressed", async () => {
  const { user } = renderChapters();

  await user.click(screen.getByRole("button", { name: "Add chapter" }));
  await user.click(screen.getByRole("button", { name: "Cancel" }));

  expect(screen.queryByLabelText("name|start|end")).not.toBeInTheDocument();
});

function renderChapters(savedChapters = [], activeChapter = undefined) {
  const user = userEvent.setup();
  const onChapterTrigger = jest.fn();
  const utils = render(
    <Chapters
      activeChapter={activeChapter}
      savedChapters={savedChapters}
      onChapterTrigger={onChapterTrigger}
    />
  );
  return {
    user,
    onChapterTrigger,
    ...utils,
    async createNewChapter(start, end, name) {
      await user.click(screen.getByRole("button", { name: "Add chapter" }));
      await user.type(screen.getByRole("textbox", { name: /start/i }), start);
      await user.type(screen.getByRole("textbox", { name: /end/i }), end);
      await user.type(screen.getByRole("textbox", { name: /name/i }), name);
      await user.click(screen.getByRole("button", { name: "Save" }));
    },
  };
}
