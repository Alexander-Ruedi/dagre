import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { newFinancialPeriodName } from "../data/common/Common.data";
import { frontendPath } from "../data/common/Environment.data";
import {
  checkRow,
  editRow,
  getDisplayedRows,
  getDisplayedRowsWithoutText,
  getDisplayedRowsWithText,
  setSearchText,
  setTableFilter,
} from "../usability/AGGrid";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface CreateRecipientGroupFields {
  name: string;
  recipientCompanyCodes: Array<string>;
  comment: string;
}

interface CreateRecipientGroupProps {
  recipientGroup: CreateRecipientGroupFields;
  financialPeriod: {
    name: string;
  };
}

export const createRecipientGroup = async ({ financialPeriod, recipientGroup }: CreateRecipientGroupProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateRecipientGroup);

  await setTextFieldByTestId(page, "recipientGroupName", recipientGroup.name);
  await setTextFieldByTestId(page, "comment", recipientGroup.comment);

  const rangeFormField = await page.getByTestId("recipientCompanies");

  for (const companyCode of recipientGroup.recipientCompanyCodes) {
    const currentDataRow = await getDisplayedRowsWithText(rangeFormField, companyCode);
    await currentDataRow.getByRole("gridcell", { name: companyCode }).click();
    const checkBox = await currentDataRow.getByRole("checkbox");
    await expect(checkBox).toBeChecked();
  }

  await submitForm(page, RoutingLinks.ShowRecipientGroup);
};

export const verifyRecipientGroupExists = async ({ financialPeriod, recipientGroup }: CreateRecipientGroupProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowRecipientGroup);

  await setSearchText(page, getSearchTerm(recipientGroup));

  const expectedFirstRow: Array<RowData> = [
    { colId: "name", expectedValue: recipientGroup.name },
    { colId: "numberOfCompanies", expectedValue: recipientGroup.recipientCompanyCodes.length.toString() },
    { colId: "comment", expectedValue: recipientGroup.comment },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];

  const displayedRow = await getDisplayedRowsWithoutText(page, "All companies");
  await checkRow(displayedRow, expectedFirstRow);
};

export const verifyRecipientGroupDoesntExists = async ({ recipientGroup }: CreateRecipientGroupProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowRecipientGroup, getSearchTerm(recipientGroup), page);
};
const getSearchTerm = (recipientGroup: CreateRecipientGroupFields) => recipientGroup.name;

export const deleteRecipientGroup = async ({ financialPeriod, recipientGroup }: CreateRecipientGroupProps, page: Page) => {
  await deleteData(RoutingLinks.ShowRecipientGroup, getSearchTerm(recipientGroup), page);
  await verifyRowDoesntExist(RoutingLinks.ShowRecipientGroup, getSearchTerm(recipientGroup), page);
};

interface BatchDeleteRecipientGroupProps {
  recipientGroupNames: Array<string>;
}
export const batchDeleteRecipientGroup = async ({ recipientGroupNames }: BatchDeleteRecipientGroupProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowRecipientGroup);

  await setTableFilter(page, 0, recipientGroupNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateRecipientGroupProps {
  oldRecipientGroup: CreateRecipientGroupProps;
  newRecipientGroup: CreateRecipientGroupProps;
}
export const updateRecipientGroup = async ({ oldRecipientGroup, newRecipientGroup }: UpdateRecipientGroupProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowRecipientGroup);

  await setSearchText(page, getSearchTerm(oldRecipientGroup.recipientGroup));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditRecipientGroup + "*");

  await setTextFieldByTestId(page, "recipientGroupName", newRecipientGroup.recipientGroup.name);
  await setTextFieldByTestId(page, "comment", newRecipientGroup.recipientGroup.comment);

  const rangeFormField = await page.getByTestId("recipientCompanies");

  await setTableFilter(rangeFormField, 0, newRecipientGroup.recipientGroup.recipientCompanyCodes);

  await submitForm(page, RoutingLinks.ShowRecipientGroup);
};
