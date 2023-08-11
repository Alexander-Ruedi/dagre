import { Locator, Page } from "@playwright/test";

export const setTextFieldByTestId = async (page: Page | Locator, testId: string, newValue: string) => {
  const formField = await page.getByTestId(testId);
  await formField.getByRole("textbox").click();
  return await formField.getByRole("textbox").fill(newValue);
};
export const getTextFieldByTestId = async (page: Page | Locator, testId: string) => {
  const formField = await page.getByTestId(testId);
  return await formField.getByRole("textbox").inputValue();
};
