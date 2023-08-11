import { Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";

export const clickSubmitForm = async (page: Page) => {
  await page.getByTestId("submitButton").click();
};
export const submitForm = async (page: Page, expectedRoutingLink: RoutingLinks) => {
  await clickSubmitForm(page);
  await page.waitForURL(frontendPath + expectedRoutingLink);
};
