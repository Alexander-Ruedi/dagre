import { expect, Page } from "@playwright/test";

export const checkErrorMessage = async (page: Page, testId: string, expectedMessage: string) => {
  const currentErrorMessage = await page.getByTestId(testId).getByTestId("errorText").innerText();
  await expect(currentErrorMessage).toBe(expectedMessage);
};
