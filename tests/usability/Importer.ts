import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { getDisplayedRows } from "./AGGrid";
import { submitForm } from "./Form";
import { openFeature } from "./Navigation";

export interface RowData {
  colId: string;
  expectedValue: string;
}
interface ImportTestProps {
  page: Page;
  routingLink: RoutingLinks;
  fileName: string;
  worksheetName: string;
  expectedRows?: number;
}
export const testImport = async (params: ImportTestProps) => {
  const { page, routingLink, fileName, worksheetName, expectedRows } = params;

  await openFeature(page, routingLink);
  await page.getByTestId("importButton").click();
  await page.waitForTimeout(1000);
  await page.getByTestId("fileInput").setInputFiles("tests/data/excel/" + fileName);

  await expect(page.getByTestId("selectedFileLabel")).toHaveText(fileName);

  const columnDropdown = await page.getByTestId("columnDropdown").first();
  await columnDropdown.getByRole("button").isEnabled();

  const worksheetButton = page.getByTestId("selectedWorksheet").getByRole("button");
  await expect(worksheetButton).toHaveText(worksheetName);

  await page.getByText("Show preview").click();
  await submitForm(page, routingLink);

  await page.waitForTimeout(1000);

  const dataRows = await getDisplayedRows(page);
  const rowCount = await dataRows.count();
  if (params.expectedRows) {
    await expect(rowCount).toBe(expectedRows);
  }

  return dataRows.first();
};
