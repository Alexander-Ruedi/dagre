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

interface ImportRecipientCCMappingProps {
  recipientCCMapping: {
    fileName: string;
    worksheetName: string;
    expectedRows?: number;
  };
}

export const importRecipientCCMapping = async ({ recipientCCMapping }: ImportRecipientCCMappingProps, page: Page) => {
  const { worksheetName, fileName, expectedRows } = recipientCCMapping;

  await testImport({
    page,
    routingLink: RoutingLinks.ShowRecipientCCMapping,
    worksheetName,
    fileName,
    expectedRows,
  });
};

interface CreateRecipientCCMappingFields {
  costCenterCode: string;
  costCenterName: string;
  recipientName: string;
  serviceName: string;
  serviceType: string;
  serviceProvider: string;
}

interface CreateRecipientCCMappingProps {
  recipientCCMapping: CreateRecipientCCMappingFields;
}

export const createRecipientCCMapping = async ({ recipientCCMapping }: CreateRecipientCCMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateRecipientCCMapping);

  const textFieldsFilledById: Array<keyof CreateRecipientCCMappingFields> = ["costCenterCode", "costCenterName"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, recipientCCMapping[textField]);
  }

  const fullServiceName = recipientCCMapping.serviceProvider + "-" + recipientCCMapping.serviceType + "_" + recipientCCMapping.serviceName;

  await setComboboxByTestId(page, "service", "Please select", fullServiceName);
  await setComboboxByTestId(page, "recipient", "Please select", recipientCCMapping.recipientName);

  await submitForm(page, RoutingLinks.ShowRecipientCCMapping);
};

export const verifyRecipientCCMappingExists = async ({ recipientCCMapping }: CreateRecipientCCMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowRecipientCCMapping);

  await setSearchText(page, getSearchTerm(recipientCCMapping));

  const expectedRow: Array<RowData> = [
    { colId: "providerCompany", expectedValue: recipientCCMapping.serviceProvider },
    { colId: "service.name", expectedValue: recipientCCMapping.serviceName },
    { colId: "service.type", expectedValue: recipientCCMapping.serviceType },
    { colId: "recipientCompanyId", expectedValue: recipientCCMapping.recipientName },
    { colId: "recipientCostCenter", expectedValue: combineCodeAndName(recipientCCMapping.costCenterCode, recipientCCMapping.costCenterName) },
  ];

  const currentDataRow = await getDisplayedRows(page);
  await checkRow(currentDataRow, expectedRow);
};

export const verifyRecipientCCMappingDoesntExists = async ({ recipientCCMapping }: CreateRecipientCCMappingProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowDebitorMapping, getSearchTerm(recipientCCMapping), page);
};
const getSearchTerm = (recipientCCMapping: CreateRecipientCCMappingFields) => {
  const costCenterCodeAndName = combineCodeAndName(recipientCCMapping.costCenterCode, recipientCCMapping.costCenterName);
  return (
    recipientCCMapping.serviceProvider + " " + recipientCCMapping.serviceName + " " + recipientCCMapping.recipientName + " " + costCenterCodeAndName
  );
};

export const deleteRecipientCCMapping = async ({ recipientCCMapping }: CreateRecipientCCMappingProps, page: Page) => {
  await deleteData(RoutingLinks.ShowRecipientCCMapping, getSearchTerm(recipientCCMapping), page);
  await verifyRowDoesntExist(RoutingLinks.ShowRecipientCCMapping, getSearchTerm(recipientCCMapping), page);
};

interface BatchDeleteRecipientCCMappingProps {
  providerNames: Array<string>;
  serviceNames: Array<string>;
  serviceTypes: Array<string>;
  recipientNames: Array<string>;
  recipientCostCenterNames: Array<string>;
}
export const batchDeleteRecipientCCMapping = async (
  { providerNames, serviceNames, serviceTypes, recipientNames, recipientCostCenterNames }: BatchDeleteRecipientCCMappingProps,
  page: Page,
) => {
  await openFeature(page, RoutingLinks.ShowRecipientCCMapping);

  await setTableFilter(page, 0, providerNames);
  await setTableFilter(page, 1, serviceNames);
  await setTableFilter(page, 2, serviceTypes);
  await setTableFilter(page, 3, recipientNames);
  await setTableFilter(page, 4, recipientCostCenterNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateRecipientCCMappingProps {
  oldRecipientCCMapping: CreateRecipientCCMappingProps;
  newRecipientCCMapping: CreateRecipientCCMappingProps;
}
export const updateRecipientCCMapping = async ({ oldRecipientCCMapping, newRecipientCCMapping }: UpdateRecipientCCMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowRecipientCCMapping);

  await setSearchText(page, getSearchTerm(oldRecipientCCMapping.recipientCCMapping));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditRecipientCCMapping + "*");

  const textFieldsFilledById: Array<keyof CreateRecipientCCMappingFields> = ["costCenterCode", "costCenterName"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newRecipientCCMapping.recipientCCMapping[textField]);
  }

  const fullServiceName =
    newRecipientCCMapping.recipientCCMapping.serviceProvider +
    "-" +
    newRecipientCCMapping.recipientCCMapping.serviceType +
    "_" +
    newRecipientCCMapping.recipientCCMapping.serviceName;
  await setComboboxByTestId(page, "service", "Please select", fullServiceName);
  await setComboboxByTestId(page, "recipient", "Please select", newRecipientCCMapping.recipientCCMapping.recipientName);

  await submitForm(page, RoutingLinks.ShowRecipientCCMapping);
};
