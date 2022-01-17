import { render as rtlRender, screen } from "@testing-library/react";
import userEvents from "@testing-library/user-event";
import { VideosAndChapters } from "./VideosAndChapters";

jest.mock("./chapters/Chapters.js", () => ({
  Chapters: () => <p tabIndex={0}>I'm chapters</p>,
}));

jest.mock("./videos/Videos.js", () => ({
  Videos: () => <p tabIndex={0}>I'm videos</p>,
}));

it("renders the chapters by default", async () => {
  const { findCurrentTabContent } = render();
  expect(await findCurrentTabContent()).toHaveTextContent("I'm chapters");
});

it("renders the videos after switching to it", async () => {
  const { user, findCurrentTabContent } = render();
  await user.click(await screen.findByRole("tab", { name: "Videos" }));
  expect(await findCurrentTabContent()).toHaveTextContent("I'm videos");
});

it("moves focus between tabs with arrows and removes tab index from unselected", async () => {
  const { user, getChaptersTab, getVideosTab, findCurrentTabContent } = render();
  const chaptersTab = await getChaptersTab();
  const videosTab = await getVideosTab();

  await user.keyboard("{Tab}");
  expect(document.activeElement).toEqual(chaptersTab);
  expect(chaptersTab.tabIndex).toEqual(0);
  expect(videosTab.tabIndex).toEqual(-1);

  await user.click(videosTab);
  expect(document.activeElement).toEqual(videosTab);
  expect(videosTab.tabIndex).toEqual(0);
  expect(chaptersTab.tabIndex).toEqual(-1);

  await user.keyboard("{ArrowLeft}");
  expect(document.activeElement).toEqual(chaptersTab);
  await user.keyboard("{ArrowLeft}");
  expect(document.activeElement).toEqual(videosTab);
  await user.keyboard("{ArrowRight}");
  expect(document.activeElement).toEqual(chaptersTab);
  await user.keyboard("{ArrowRight}");
  expect(document.activeElement).toEqual(videosTab);
  await user.keyboard("{ArrowRight}");
  await user.keyboard("{Enter}");
  expect(await findCurrentTabContent()).toHaveTextContent("I'm chapters");
});

it("moves focus to panels on tab, and back", async () => {
  const { user, getVideosTab } = render();
  const videosTab = await getVideosTab();
  await user.click(videosTab);

  await user.keyboard("{Tab}");
  expect(document.activeElement).toHaveTextContent("I'm videos");
  await user.keyboard("{Shift>}{Tab}{/Shift}");
  expect(document.activeElement).toEqual(videosTab);
});

function render() {
  const user = userEvents.setup();
  const utils = rtlRender(
    <VideosAndChapters
      setVideoToPlay={jest.fn()}
      activeChapter={undefined}
      setActiveChapter={jest.fn()}
    />
  );
  return {
    ...utils,
    user,
    async findCurrentTabContent() {
      return await screen.findByRole("tabpanel");
    },
    async getVideosTab() {
      return await screen.findByRole("tab", { name: "Videos" });
    },
    async getChaptersTab() {
      return await screen.findByRole("tab", { name: "Chapters" });
    },
  };
}
