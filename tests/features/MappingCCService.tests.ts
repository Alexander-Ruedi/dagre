import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { getDisplayedRowsWithText } from "../usability/AGGrid";
import { setComboboxByTestId } from "../usability/Combobox";
import { openFeature } from "../usability/Navigation";

interface Create1To1MappingProps {
  providerNames: Array<string>;
  financialPeriod: {
    name: string;
  };
}

export const create1To1Mapping = async ({ financialPeriod, providerNames }: Create1To1MappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCostToServiceAllocation);

  for (const providerName of providerNames) {
    const row = await getDisplayedRowsWithText(page, providerName);
    await row.getByRole("checkbox").check();
  }

  await page.getByRole("button", { name: "Create 1:1 mappings" }).click();
};

interface CreateMappingByPercentageProps {
  providerName: string;
  mappedPercentage: string;
  financialPeriod: {
    name: string;
  };
}

export const createMappingByPercentage = async ({ financialPeriod, providerName, mappedPercentage }: CreateMappingByPercentageProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCostToServiceAllocation);

  const row = await getDisplayedRowsWithText(page, providerName);
  await row.getByRole("checkbox").check();

  await page.getByRole("button", { name: "Edit mapping rules" }).click();

  const percentageAllocationField = await page.getByTestId("percentageAllocationBox");
  await setComboboxByTestId(percentageAllocationField, "actionDropdown", "", "Auftragsbearbeitung");

  await percentageAllocationField.getByRole("spinbutton").fill(mappedPercentage);
  await percentageAllocationField.getByTestId("addButton").click();

  await page.getByTestId("submitButton").click();
};

interface VerifyMappingByPercentageProps {
  providerName: string;
  expectedPercentage: string;
  financialPeriod: {
    name: string;
  };
}

export const verifyMappedPercentage = async ({ financialPeriod, providerName, expectedPercentage }: VerifyMappingByPercentageProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCostToServiceAllocation);

  await page.waitForTimeout(10000);

  const row = await getDisplayedRowsWithText(page, providerName);

  const tableCell = await row.locator(`[col-id='mappedCostsPercentage']`);
  await expect(tableCell).toHaveText(expectedPercentage);
};
