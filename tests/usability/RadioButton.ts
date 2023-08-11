import { Locator, Page } from "@playwright/test";

export const setButtonGroup = async (page: Page | Locator, testId: string, newValue: string) => {
  const typeFormField = page.getByTestId(testId);
  await typeFormField.getByRole("button", { name: newValue }).click();
};
