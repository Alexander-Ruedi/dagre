import { Page } from "@playwright/test";

export const setDropdownByTestId = async (page: Page, testId: string, placeHolder: string, newValue: string) => {
  if ((await page.getByTestId(testId).getByRole("button", { name: newValue, exact: true }).count()) === 0) {
    await page.getByTestId(testId).getByRole("button", { name: placeHolder }).click();
    await page.getByTestId(testId).getByRole("listbox").getByRole("option", { name: newValue, exact: true }).click();
  }
  return true;
};
