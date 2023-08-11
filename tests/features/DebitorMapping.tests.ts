import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { combineCodeAndName } from "../../src/common/utils/DisplayUtil";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { setComboboxByTestId } from "../usability/Combobox";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData, testImport } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface ImportDebitorMappingProps {
  debitorMapping: {
    fileName: string;
    worksheetName: string;
  };
}

export const importDebitorMapping = async ({ debitorMapping }: ImportDebitorMappingProps, page: Page) => {
  const { worksheetName, fileName } = debitorMapping;

  await testImport({
    page,
    routingLink: RoutingLinks.ShowDebitorMapping,
    worksheetName,
    fileName,
  });
};

interface CreateDebitorMappingFields {
  providerName: string;
  recipientName: string;
  debitorCode: string;
  debitorName: string;
}

interface CreateDebitorMappingProps {
  debitorMapping: CreateDebitorMappingFields;
}

export const createDebitorMapping = async ({ debitorMapping }: CreateDebitorMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateDebitorMapping);

  const textFieldsFilledById: Array<keyof CreateDebitorMappingFields> = ["debitorCode", "debitorName"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, debitorMapping[textField]);
  }

  await setComboboxByTestId(page, "provider", "Please select", debitorMapping.providerName);
  await setComboboxByTestId(page, "recipient", "Please select", debitorMapping.recipientName);

  await submitForm(page, RoutingLinks.ShowDebitorMapping);
};

export const verifyDebitorMappingExists = async ({ debitorMapping }: CreateDebitorMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowDebitorMapping);

  await setSearchText(page, getSearchTerm(debitorMapping));

  const expectedFirstRow: Array<RowData> = [
    { colId: "providerCompanyId", expectedValue: debitorMapping.providerName },
    { colId: "recipientCompanyId", expectedValue: debitorMapping.recipientName },
    { colId: "debitorNameAndCode", expectedValue: combineCodeAndName(debitorMapping.debitorCode, debitorMapping.debitorName) },
  ];

  const displayedRow = await getDisplayedRows(page);
  await checkRow(displayedRow, expectedFirstRow);
};

export const verifyDebitorMappingDoesntExists = async ({ debitorMapping }: CreateDebitorMappingProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowDebitorMapping, getSearchTerm(debitorMapping), page);
};
const getSearchTerm = (debitorMapping: CreateDebitorMappingFields) =>
  debitorMapping.providerName + " " + debitorMapping.recipientName + " " + debitorMapping.debitorCode;

export const deleteDebitorMapping = async ({ debitorMapping }: CreateDebitorMappingProps, page: Page) => {
  await deleteData(RoutingLinks.ShowDebitorMapping, getSearchTerm(debitorMapping), page);
  await verifyRowDoesntExist(RoutingLinks.ShowDebitorMapping, getSearchTerm(debitorMapping), page);
};

interface BatchDeleteDebitorMappingProps {
  providerNames: Array<string>;
  recipientNames: Array<string>;
  debitorNames: Array<string>;
}
export const batchDeleteDebitorMapping = async ({ providerNames, recipientNames, debitorNames }: BatchDeleteDebitorMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowDebitorMapping);

  await setTableFilter(page, 0, providerNames);
  await setTableFilter(page, 1, recipientNames);
  await setTableFilter(page, 2, debitorNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateDebitorMappingProps {
  oldDebitorMapping: CreateDebitorMappingProps;
  newDebitorMapping: CreateDebitorMappingProps;
}
export const updateDebitorMapping = async ({ oldDebitorMapping, newDebitorMapping }: UpdateDebitorMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowDebitorMapping);

  await setSearchText(page, getSearchTerm(oldDebitorMapping.debitorMapping));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditDebitorMapping + "*");

  await setComboboxByTestId(page, "provider", "Please select", newDebitorMapping.debitorMapping.providerName);
  await setComboboxByTestId(page, "recipient", "Please select", newDebitorMapping.debitorMapping.recipientName);

  const textFieldsFilledById: Array<keyof CreateDebitorMappingFields> = ["debitorCode", "debitorName"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newDebitorMapping.debitorMapping[textField]);
  }

  await submitForm(page, RoutingLinks.ShowDebitorMapping);
};
