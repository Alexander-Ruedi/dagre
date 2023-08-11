import { expect, Locator, Page } from "@playwright/test";
import { within } from "@testing-library/react";
import { RowData } from "./Importer";

export const getDisplayedRows = async (page: Page | Locator) => await page.locator(".ag-center-cols-container .ag-row");
export const getDisplayedRowsWithText = async (page: Page | Locator, searchText: string) =>
  await page.locator(".ag-center-cols-container .ag-row", { hasText: searchText });
export const getDisplayedRowsWithoutText = async (page: Page | Locator, searchText: string) =>
  await page.locator(".ag-center-cols-container .ag-row", { hasNotText: searchText });

export const checkRow = async (page: Page | Locator, expectedFirstRow: Array<RowData>) => {
  for (const field of expectedFirstRow) {
    const tableCell = await page.locator(`[col-id='${field.colId}']`);
    await expect(tableCell).toHaveText(field.expectedValue);
  }
};

export const setTableFilter = async (page: Page | Locator, columnIndex: number, filteredValues: Array<string>) => {
  await page.locator(".ag-cell-label-container > span > .ag-icon").nth(columnIndex).click();
  await page.getByRole("checkbox", { name: "(Select All)" }).uncheck();

  for (const filteredValue of filteredValues) {
    await page.getByRole("checkbox", { name: filteredValue }).check();
  }

  await page.getByRole("button", { name: "Apply" }).click();
};

export const editRow = async (displayedRow: Locator) => {
  await displayedRow.getByTestId("editRow").getByRole("button").click();
};

export const setSearchText = async (page: Page | Locator, searchTerm: string) => {
  await page.getByRole("searchbox").click();
  await page.getByRole("searchbox").fill(searchTerm);
};

export const resizeColumn = async (page: Page, columnIndex: number, resizeByPx: number) => {
  const currentColumn = await page.locator(".ag-header-cell").nth(columnIndex);
  const dragToResizeElement = await currentColumn.locator(".ag-header-cell-resize");
  const dragToResizeElementBBox = await dragToResizeElement.boundingBox();

  await expect(dragToResizeElementBBox).toBeDefined();
  if (dragToResizeElementBBox) {
    await page.mouse.move(dragToResizeElementBBox.x, dragToResizeElementBBox.y);
    await page.mouse.down({ button: "left" });
    await page.mouse.move(dragToResizeElementBBox.x + resizeByPx, dragToResizeElementBBox.y);
    await page.mouse.up({ button: "left" });
  }
};

export const toggleColumnVisibility = async (page: Page | Locator, columnIndex: number, columnsToToggle: Array<string>) => {
  await page.locator(".ag-cell-label-container > span > .ag-icon").nth(columnIndex).click();
  await page.locator(".ag-popup .ag-icon.ag-icon-columns").click();

  for (const columnName of columnsToToggle) {
    await page.getByRole("treeitem", { name: "Updated by" }).locator("input").click();
  }

  await page.locator(".ag-popup .ag-tab .ag-icon.ag-icon-filter").click();
  await page.getByRole("button", { name: "Apply" }).click();
};

export const getColumnNameByColumnIndex = async (page: Page, columnIndex: number) => {
  const currentColumn = await page.locator(".ag-header-cell").nth(columnIndex);
  return currentColumn.innerText();
};

export const getRowByRowIndex = async (page: Page, rowIndex: number) => {
  return page.locator(".ag-body-viewport .ag-center-cols-container > .ag-row").nth(rowIndex);
};

export const getCheckBoxByRowIndex = async (page: Page, rowIndex: number) => {
  const rowToSelect = await getRowByRowIndex(page, rowIndex);
  return rowToSelect.locator("input.ag-checkbox-input");
};

export const selectRowByRowIndex = async (page: Page, rowIndex: number) => {
  const checkBox = await getCheckBoxByRowIndex(page, rowIndex);
  await checkBox.click();
};

export const isRowSelectedByRowIndex = async (page: Page, rowIndex: number) => {
  const checkBox = await getCheckBoxByRowIndex(page, rowIndex);
  return checkBox.isChecked();
};

export const sortColumnByColumnIndex = async (page: Page, columnIndex: number) => {
  const currentColumn = await page.locator(".ag-header-cell").nth(columnIndex);
  await currentColumn.locator(".ag-header-cell-text").click();
};

export enum SortOrder {
  NONE = "NONE",
  ASCENDING = "ASCENDING",
  DESCENDING = "DESCENDING",
}
export interface SortIndicator {
  sortOrder: SortOrder;
  sortIndex: string;
}
export async function getSortByColumnIndex(page: Page, columnIndex: number): Promise<SortIndicator> {
  const currentColumn = await page.locator(".ag-header-cell").nth(columnIndex);

  const ascendingIcon = await currentColumn.locator("[ref='eSortAsc']");
  const descendingIcon = await currentColumn.locator("[ref='eSortDesc']");
  const ascendingClasses = await ascendingIcon.getAttribute("class");
  const descendingClasses = await descendingIcon.getAttribute("class");

  let sortOrder = SortOrder.NONE;
  if (ascendingClasses?.indexOf("ag-hidden") !== -1) {
    sortOrder = SortOrder.ASCENDING;
  }
  if (descendingClasses?.indexOf("ag-hidden") !== -1) {
    sortOrder = SortOrder.DESCENDING;
  }

  const sortIndex = await currentColumn.locator("[ref='eSortOrder']").innerText();

  return {
    sortOrder,
    sortIndex,
  };
}
