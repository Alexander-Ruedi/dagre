import { Locator, Page } from "@playwright/test";

export const setNumberFieldByTestId = async (page: Page | Locator, testId: string, newValue: string) => {
  const fiscalYearFormField = await page.getByTestId(testId);
  await fiscalYearFormField.getByRole("spinbutton").click();
  await fiscalYearFormField.getByRole("spinbutton").fill(newValue);
};
