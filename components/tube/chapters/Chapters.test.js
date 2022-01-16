import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Chapters } from "./Chapters";
import { Chapter } from "./NewChapter";

it("renders chapters and enables them", async () => {
  await renderChapters();
  expect(screen.getByText(/hide chapters/i)).toBeInTheDocument();
});

it("adds a new chapter", async () => {
  const { createNewChapter } = await renderChapters();

  await createNewChapter("1", "2", "some name");

  expect(screen.getByText(/some name: 1-2/i)).toBeInTheDocument();
});

it("does not add the same chapter twice", async () => {
  const { createNewChapter } = await renderChapters();

  await createNewChapter("1", "2", "some name");
  await createNewChapter("1", "2", "some name");

  expect(screen.getAllByText(/some name: 1-2/i).length).toEqual(1);
});

it("orders chapters as they are added", async () => {
  const { createNewChapter } = await renderChapters();

  await createNewChapter("2", "2", "second");
  await createNewChapter("2", "3", "third");
  await createNewChapter("1", "2", "first");

  const chapters = await screen.findAllByText(/first|second|third/);
  const chaptersNames = chapters.map((ch) => ch.textContent);
  expect(chaptersNames).toEqual(["first: 1-2", "second: 2-2", "third: 2-3"]);
});

it("starts with the given preset chapters", async () => {
  await renderChapters([new Chapter(12, 21, "abc")]);

  expect(screen.getByText(/abc: 12-21/i)).toBeInTheDocument();
});

it("activates a chapter when it's selected", async () => {
  const { user, createNewChapter, onChapterSelected } = await renderChapters();

  await createNewChapter("1", "1", "chapter");
  await user.click(await screen.findByRole("button", { name: "Select" }));

  expect(onChapterSelected).toBeCalledWith(new Chapter(1, 1, "chapter"));
});

it("deactivates a chapter when it's selected twice", async () => {
  const { user, createNewChapter, onChapterSelected, onChapterUnselected } = await renderChapters();

  await createNewChapter("2", "4", "chapter");
  await user.click(await screen.findByRole("button", { name: "Select" }));
  await user.click(await screen.findByRole("button", { name: "Unselect" }));

  expect(onChapterSelected).toBeCalledWith({ start: 2, end: 4, name: "chapter" });
  expect(onChapterUnselected).toBeCalled();
});

it("activates another chapter when selected", async () => {
  const { user, createNewChapter, onChapterSelected, onChapterUnselected } = await renderChapters();

  await createNewChapter("2", "4", "first");
  await createNewChapter("9", "10", "second");
  const firstChapterElement = await screen.findByText(/first/);
  const secondChapterElement = await screen.findByText(/second/);
  await user.click(await within(firstChapterElement.parentElement).findByRole("button", { name: "Select" }));
  await user.click(await within(secondChapterElement.parentElement).findByRole("button", { name: "Select" }));

  expect(onChapterSelected).toBeCalledTimes(2);
  expect(onChapterSelected).toBeCalledWith({ start: 2, end: 4, name: "first" });
  expect(onChapterSelected).toBeCalledWith({ start: 9, end: 10, name: "second" });
});

async function renderChapters(savedChapters = []) {
  const user = userEvent.setup();
  const onChapterSelected = jest.fn();
  const onChapterUnselected = jest.fn();
  const utils = render(
    <Chapters
      savedChapters={savedChapters}
      onChapterSelected={onChapterSelected}
      onChapterUnselected={onChapterUnselected}
    />
  );
  await user.click(await screen.findByLabelText(/show chapters/i));
  return {
    user,
    onChapterSelected,
    onChapterUnselected,
    ...utils,
    async createNewChapter(start, end, name) {
      await user.type(await screen.findByLabelText(/start/i), start);
      await user.type(await screen.findByLabelText(/end/i), end);
      await user.type(await screen.findByLabelText(/name/i), name);
      await user.click(await screen.findByRole("button", { name: "Save" }));
    },
  };
}
