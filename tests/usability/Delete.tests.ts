import { expect, Locator, Page, test } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendDefaultPath, frontendPath } from "../data/common/Environment.data";
import { getDisplayedRows, setSearchText } from "./AGGrid";

export const deleteData = async (routingLink: RoutingLinks, searchTerm: string, page: Page, table?: Locator) => {
  await page.goto(frontendPath + routingLink);

  const currentTable = table ? table : page;

  await setSearchText(currentTable, searchTerm);

  const rowToDelete = await getDisplayedRows(currentTable);

  await expect(rowToDelete).toHaveCount(1);

  await rowToDelete.getByTestId("deleteRow").getByRole("button").click();
  await page.getByTestId("submitButton").click();
};

export const batchDeleteData = async (routingLink: RoutingLinks, searchTerms: Array<string>, page: Page) => {
  await page.goto(frontendPath + routingLink);

  for (const searchTerm of searchTerms) {
    await deleteData(routingLink, searchTerm, page);
  }
};

export const verifyRowDoesntExist = async (routingLink: RoutingLinks, searchTerm: string, page: Page | Locator) => {
  await setSearchText(page, searchTerm);

  const deletedRow = await getDisplayedRows(page);
  await expect(deletedRow).toHaveCount(0);
};
