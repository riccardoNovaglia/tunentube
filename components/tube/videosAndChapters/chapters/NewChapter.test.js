import { render as rtlRender, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NewChapter } from "./NewChapter";
import { Chapter } from "./Chapter";

it("shows inputs and button", async () => {
  render();

  expect(screen.getByLabelText(/start/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/end/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
});

it("calls the new chapter fn when a new chapter is added", async () => {
  const { createNewChapter, onNewChapter } = render();
  await createNewChapter("1", "2", "some name");
  expect(onNewChapter).toHaveBeenCalledWith(new Chapter(1, 2, "some name"));
});

it("does not call the new chap fn for invalid inputs", async () => {
  const { user, createNewChapter, onNewChapter } = render();
  await user.click(screen.getByRole("button", { name: "Save" }));
  expect(screen.getByText("Please add a start, end, name")).toBeInTheDocument();

  await createNewChapter("-1", "-2", "name");
  expect(screen.getByText("Start and end must be positive numbers!")).toBeInTheDocument();

  await createNewChapter("4", "1", "name");
  expect(screen.getByText("The end must be after the start!")).toBeInTheDocument();

  await createNewChapter("1", "1", "name");
  expect(
    screen.getByText("Start and end must be further from each other!")
  ).toBeInTheDocument();

  expect(onNewChapter).not.toHaveBeenCalled();
});

function render() {
  const user = userEvent.setup();
  const onNewChapter = jest.fn();
  const utils = rtlRender(<NewChapter onNewChapter={onNewChapter} />);
  return {
    user,
    onNewChapter,
    ...utils,
    async createNewChapter(start, end, name) {
      const startInput = screen.getByLabelText(/start/i);
      const endInput = screen.getByLabelText(/end/i);
      const nameInput = screen.getByLabelText(/name/i);
      await user.clear(startInput);
      await user.clear(endInput);
      await user.clear(nameInput);
      await user.type(startInput, start);
      await user.type(endInput, end);
      await user.type(nameInput, name);
      await user.click(screen.getByRole("button", { name: "Save" }));
    },
  };
}
