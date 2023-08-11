import { expect, Page, test } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendDefaultPath, frontendPath } from "../data/common/Environment.data";

export const canNavigateTo = (routingLink: RoutingLinks, navigationClicks: Array<string>) => {
  test("Navigate to " + routingLink, async ({ page }) => {
    await page.goto(frontendPath);
    expect(page.url()).toMatch(frontendDefaultPath);

    for (const name of navigationClicks) {
      await page.getByRole("button", { name }).click();
    }
    expect(page.url()).toMatch(frontendPath + routingLink);
  });
};

export const openFeature = async (page: Page, routingLink: RoutingLinks) => {
  await page.goto(frontendPath + routingLink);
};

export const navigateToFeature = async (page: Page, featureName: string) => {
  const navigation = await page.getByTestId("navigation");
  await navigation.getByText(featureName).click();
};
