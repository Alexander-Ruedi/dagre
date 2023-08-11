import { expect, Locator, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { newFinancialPeriodName } from "../data/common/Common.data";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface Weighting {
  masterKeyName: string;
  weightingFactor: number;
}

interface MixedKeyTextFields {
  name: string;
  comment: string;
}
interface CreateMixedKeyFields extends MixedKeyTextFields {
  masterKeys: Array<Weighting>;
}
interface CreateMixedKeyProps {
  mixedKey: CreateMixedKeyFields;
  financialPeriod: {
    name: string;
  };
}

const defaultMasterKeys = 2;
export const createMixedKey = async ({ financialPeriod, mixedKey }: CreateMixedKeyProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateMixedKey);

  await setTextFieldByTestId(page, "name", mixedKey.name);
  await setTextFieldByTestId(page, "comment", mixedKey.comment);

  const addMasterKeyButton = await page.getByTestId("addMasterKey").getByRole("button");
  for (const [index] of mixedKey.masterKeys.entries()) {
    if (index + 1 > defaultMasterKeys) {
      await addMasterKeyButton.click();
    }
  }
  const masterKeyRows = await page.getByTestId("masterKeyRow");
  await expect(masterKeyRows).toHaveCount(mixedKey.masterKeys.length);

  for (const [index, masterKey] of mixedKey.masterKeys.entries()) {
    const currentMasterKeyRow = await masterKeyRows.nth(index);
    await currentMasterKeyRow.getByRole("button").click();
    await currentMasterKeyRow.getByText(masterKey.masterKeyName).click();
    await currentMasterKeyRow
      .locator('input[name="mixedAllocationKeyWeightValues\\.' + index + '\\.weight"]')
      .fill(masterKey.weightingFactor.toString());
  }

  await submitForm(page, RoutingLinks.ShowIndirectAllocation);
};

export const verifyMixedKeyExists = async ({ financialPeriod, mixedKey }: CreateMixedKeyProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowIndirectAllocation);

  await setSearchText(page.getByTestId("mixedKeyTable"), getSearchTerm(mixedKey));

  const expectedRow: Array<RowData> = [
    { colId: "name", expectedValue: mixedKey.name },
    { colId: "masterKeys", expectedValue: mixedKey.masterKeys.map((key) => key.masterKeyName).join(", ") },
    { colId: "financialPeriod.name", expectedValue: newFinancialPeriodName },
  ];

  const mixedKeyRow = await getDisplayedRows(page.getByTestId("mixedKeyTable"));
  await checkRow(mixedKeyRow, expectedRow);
};

export const verifyMixedKeyDoesntExists = async ({ mixedKey }: CreateMixedKeyProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowIndirectAllocation, getSearchTerm(mixedKey), page.getByTestId("mixedKeyTable"));
};
const getSearchTerm = (mixedKey: CreateMixedKeyFields) => mixedKey.name;

export const deleteMixedKey = async ({ financialPeriod, mixedKey }: CreateMixedKeyProps, page: Page) => {
  const mixedKeyPage = page.getByTestId("mixedKeyTable");
  await deleteData(RoutingLinks.ShowIndirectAllocation, getSearchTerm(mixedKey), page, mixedKeyPage);
  await verifyRowDoesntExist(RoutingLinks.ShowService, getSearchTerm(mixedKey), mixedKeyPage);
};

interface BatchDeleteMixedKeyProps {
  mixedKeyNames: Array<string>;
}
export const batchDeleteMixedKey = async ({ mixedKeyNames }: BatchDeleteMixedKeyProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowIndirectAllocation);

  await setTableFilter(page, 0, mixedKeyNames);

  await page.getByTestId("mixedKeyTable").getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateMixedKeyProps {
  oldMixedKey: CreateMixedKeyProps;
  newMixedKey: CreateMixedKeyProps;
}
export const updateMixedKey = async ({ newMixedKey, oldMixedKey }: UpdateMixedKeyProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowIndirectAllocation);

  await setSearchText(page.getByTestId("mixedKeyTable"), getSearchTerm(oldMixedKey.mixedKey));

  const displayedRow = await getDisplayedRows(page.getByTestId("mixedKeyTable"));
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditMixedKey + "*");

  const textFieldsFilledById: Array<keyof MixedKeyTextFields> = ["name", "comment"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newMixedKey.mixedKey[textField]);
  }

  await submitForm(page, RoutingLinks.ShowIndirectAllocation);
};
