import { Page } from "@playwright/test";

export const updateFinancialPeriod = async (page: Page, financialPeriodName: string) => {
  await page.getByTestId("periodDropdownComponent").click();
  await page.getByText(financialPeriodName).click();
  await page.getByTestId("closePeriodDropdownComponent").click();
};
