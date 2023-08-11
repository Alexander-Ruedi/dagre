import { expect, Locator, Page } from "@playwright/test";
import { RowData } from "./Importer";

export const setComboboxByTestId = async (page: Page | Locator, testId: string, placeHolder: string, newValue: string) => {
  await page.getByTestId(testId).locator("button").click();
  await page.getByTestId(testId).getByRole("listbox").getByRole("option", { name: newValue, exact: true }).click();
};

export const getComboboxByTestId = async (page: Page | Locator, testId: string) => await page.getByTestId(testId).locator("input");

export interface ExpectedCheckbox {
  testId: string;
  expectedValue: string;
}
export const checkComboboxes = async (page: Page | Locator, expectedComboboxes: Array<ExpectedCheckbox>) => {
  for (const expectedCombobox of expectedComboboxes) {
    const { testId, expectedValue } = expectedCombobox;
    const currentCombobox = await getComboboxByTestId(page, testId);
    await expect(currentCombobox).toHaveValue(expectedValue);
  }
};
