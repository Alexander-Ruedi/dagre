import { Page } from "@playwright/test";
import { currentYear } from "../data/common/Environment.data";

export const pad = (num: number | string, size: number) => {
  let str = num.toString();
  while (str.length < size) str = "0" + str;
  return str;
};

export const setMonthRangeByTestId = async (page: Page, testId: string, fromMonth: string, toMonth: string) => {
  const rangeFormField = await page.getByTestId(testId);
  await rangeFormField.getByText("Jan " + currentYear).click();
  await rangeFormField.getByText(fromMonth).click();
  await rangeFormField.getByText(toMonth).click();
};
