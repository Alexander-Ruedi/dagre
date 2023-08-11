import { Verify } from "crypto";
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

interface ImportDummyMaterialMappingProps {
  dummyMaterialMapping: {
    fileName: string;
    worksheetName: string;
    expectedRows?: number;
  };
}

export const importMaterialMapping = async ({ dummyMaterialMapping }: ImportDummyMaterialMappingProps, page: Page) => {
  const { worksheetName, fileName, expectedRows } = dummyMaterialMapping;

  await testImport({
    page,
    routingLink: RoutingLinks.ShowDummyMaterialMapping,
    worksheetName,
    fileName,
    expectedRows,
  });
};

interface CreateMaterialMappingTextFields {
  directMaterialCode: string;
  directMaterialName: string;
  indirectMaterialCode: string;
  indirectMaterialName: string;
}
interface CreateMaterialMappingFields extends CreateMaterialMappingTextFields {
  providerNames: Array<string>;
}

interface CreateMaterialMappingProps {
  materialMapping: CreateMaterialMappingFields;
}

export const createMaterialMappings = async ({ materialMapping }: CreateMaterialMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateDummyMaterialMapping);

  const textFieldsFilledById: Array<keyof CreateMaterialMappingTextFields> = [
    "directMaterialCode",
    "directMaterialName",
    "indirectMaterialCode",
    "indirectMaterialName",
  ];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, materialMapping[textField]);
  }

  const serviceIdsField = await page.getByTestId("providerCompanyIds");
  const serviceIdControl = await serviceIdsField.getByPlaceholder("Select Provider");

  for (const serviceName of materialMapping.providerNames) {
    await serviceIdControl.click();
    await page.getByRole("option", { name: serviceName }).click();
  }

  await submitForm(page, RoutingLinks.ShowDummyMaterialMapping);
};

interface VerifyMaterialMappingTextFields {
  providerName: string;
  directMaterialCode: string;
  directMaterialName: string;
  indirectMaterialCode: string;
  indirectMaterialName: string;
}

interface VerifyMaterialMappingProps {
  materialMapping: VerifyMaterialMappingTextFields;
}

export const verifyMaterialMappingExists = async ({ materialMapping }: VerifyMaterialMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowDummyMaterialMapping);

  await setSearchText(page, getSearchTerm(materialMapping));

  const directMaterialText = combineCodeAndName(materialMapping.directMaterialCode, materialMapping.directMaterialName);
  const indirectMaterialText = combineCodeAndName(materialMapping.indirectMaterialCode, materialMapping.indirectMaterialName);
  const expectedRow: Array<RowData> = [
    { colId: "providerCompanyId", expectedValue: materialMapping.providerName },
    { colId: "directMaterialNumber", expectedValue: directMaterialText },
    { colId: "indirectMaterialNumber", expectedValue: indirectMaterialText },
  ];

  const currentDataRow = await getDisplayedRows(page);
  await checkRow(currentDataRow, expectedRow);
};

export const verifyMaterialMappingDoesntExists = async ({ materialMapping }: VerifyMaterialMappingProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowDummyMaterialMapping, getSearchTerm(materialMapping), page);
};
const getSearchTerm = (materialMapping: VerifyMaterialMappingTextFields) => {
  const directMaterialText = combineCodeAndName(materialMapping.directMaterialCode, materialMapping.directMaterialName);
  const indirectMaterialText = combineCodeAndName(materialMapping.indirectMaterialCode, materialMapping.indirectMaterialName);
  return materialMapping.providerName + " " + directMaterialText + " " + indirectMaterialText;
};

export const deleteMaterialMapping = async ({ materialMapping }: VerifyMaterialMappingProps, page: Page) => {
  await deleteData(RoutingLinks.ShowDummyMaterialMapping, getSearchTerm(materialMapping), page);
  await verifyRowDoesntExist(RoutingLinks.ShowDummyMaterialMapping, getSearchTerm(materialMapping), page);
};

interface BatchDeleteMaterialMappingProps {
  providerNames: Array<string>;
  directDummyMaterialNames: Array<string>;
  indirectDummyMaterialNames: Array<string>;
}
export const batchDeleteMaterialMapping = async (
  { providerNames, directDummyMaterialNames, indirectDummyMaterialNames }: BatchDeleteMaterialMappingProps,
  page: Page,
) => {
  await openFeature(page, RoutingLinks.ShowDummyMaterialMapping);

  await setTableFilter(page, 0, providerNames);
  await setTableFilter(page, 1, directDummyMaterialNames);
  await setTableFilter(page, 2, indirectDummyMaterialNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateMaterialMappingProps {
  oldMaterialMapping: VerifyMaterialMappingProps;
  newMaterialMapping: VerifyMaterialMappingProps;
}
export const updateMaterialMapping = async ({ oldMaterialMapping, newMaterialMapping }: UpdateMaterialMappingProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowDummyMaterialMapping);

  await setSearchText(page, getSearchTerm(oldMaterialMapping.materialMapping));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditDummyMaterialMapping + "*");

  const textFieldsFilledById: Array<keyof CreateMaterialMappingTextFields> = [
    "directMaterialCode",
    "directMaterialName",
    "indirectMaterialCode",
    "indirectMaterialName",
  ];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newMaterialMapping.materialMapping[textField]);
  }

  await submitForm(page, RoutingLinks.ShowDummyMaterialMapping);
};
