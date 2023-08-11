import { Locator, Page } from "@playwright/test";

export enum FitToOptions {
  SCREEN = "Fit to screen",
  CONTENT = "Fit to content",
}
export const setFitTo = async (page: Page | Locator, newFitTo: FitToOptions) => {
  await page.getByTestId("fitTo").locator("button").click();
  await page.getByTestId("fitTo").getByRole("menuitem", { name: newFitTo, exact: true }).click();
};
