import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { setComboboxByTestId } from "../usability/Combobox";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData, testImport } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface ImportOrderMappingProps {
  orderMapping: {
    fileName: string;
    worksheetName: string;
    expectedRows?: number;
  };
}

export const importOrderMapping = async ({ orderMapping }: ImportOrderMappingProps, page: Page) => {
  const { worksheetName, fileName, expectedRows } = orderMapping;

  await testImport({
    page,
    routingLink: RoutingLinks.ShowOrderMapping,
    worksheetName,
    fileName,
    expectedRows,
  });
};

interface CreateOrderMappingFields {
  providerName: string;
  debitorName: string;
  salesOrder: string;
}

interface CreateOrderMappingProps {
  orderMapping: CreateOrderMappingFields;
}

export const createOrderMapping = async ({ orderMapping }: CreateOrderMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateOrderMapping);

  const textFieldsFilledById: Array<keyof CreateOrderMappingFields> = ["salesOrder"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, orderMapping[textField]);
  }

  await setComboboxByTestId(page, "provider", "Please select", orderMapping.providerName);
  await setComboboxByTestId(page, "debitor", "Please select", orderMapping.debitorName);

  await submitForm(page, RoutingLinks.ShowOrderMapping);
};

export const verifyOrderMappingExists = async ({ orderMapping }: CreateOrderMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowOrderMapping);

  await setSearchText(page, getSearchTerm(orderMapping));

  const expectedRow: Array<RowData> = [
    { colId: "providerCompanyId", expectedValue: orderMapping.providerName },
    { colId: "debitorCodeAndName", expectedValue: orderMapping.debitorName },
    { colId: "salesOrder", expectedValue: orderMapping.salesOrder },
  ];

  const currentDataRow = await getDisplayedRows(page);
  await checkRow(currentDataRow, expectedRow);
};

export const verifyOrderMappingDoesntExists = async ({ orderMapping }: CreateOrderMappingProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowOrderMapping, getSearchTerm(orderMapping), page);
};
const getSearchTerm = (orderMapping: CreateOrderMappingFields) =>
  orderMapping.providerName + " " + orderMapping.debitorName + " " + orderMapping.salesOrder;

export const deleteOrderMapping = async ({ orderMapping }: CreateOrderMappingProps, page: Page) => {
  await deleteData(RoutingLinks.ShowOrderMapping, getSearchTerm(orderMapping), page);
  await verifyRowDoesntExist(RoutingLinks.ShowOrderMapping, getSearchTerm(orderMapping), page);
};

interface BatchDeleteOrderMappingProps {
  providerNames: Array<string>;
  debitorNames: Array<string>;
  salesOrderNames: Array<string>;
}
export const batchDeleteOrderMapping = async ({ providerNames, debitorNames, salesOrderNames }: BatchDeleteOrderMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowOrderMapping);

  await setTableFilter(page, 0, providerNames);
  await setTableFilter(page, 1, debitorNames);
  await setTableFilter(page, 2, salesOrderNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateOrderMappingProps {
  oldOrderMapping: CreateOrderMappingProps;
  newOrderMapping: CreateOrderMappingProps;
}
export const updateOrderMapping = async ({ oldOrderMapping, newOrderMapping }: UpdateOrderMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowOrderMapping);

  await setSearchText(page, getSearchTerm(oldOrderMapping.orderMapping));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditOrderMapping + "*");

  await setComboboxByTestId(page, "provider", "Please select", newOrderMapping.orderMapping.providerName);
  await setComboboxByTestId(page, "debitor", "Please select", newOrderMapping.orderMapping.debitorName);

  const textFieldsFilledById: Array<keyof CreateOrderMappingFields> = ["salesOrder"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newOrderMapping.orderMapping[textField]);
  }

  await submitForm(page, RoutingLinks.ShowOrderMapping);
};
