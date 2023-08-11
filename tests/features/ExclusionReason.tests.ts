import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface CreateExclusionReasonFields {
  exclusionReasonName: string;
  exclusionReasonComment: string;
}
interface CreateExclusionReasonProps {
  exclusionReason: CreateExclusionReasonFields;
  financialPeriod: {
    name: string;
  };
}

export const createExclusionReason = async ({ financialPeriod, exclusionReason }: CreateExclusionReasonProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowExclusionReason);
  await page.getByTestId("createButton").click();

  await setTextFieldByTestId(page, "exclusionReasonName", exclusionReason.exclusionReasonName);
  await setTextFieldByTestId(page, "exclusionReasonComment", exclusionReason.exclusionReasonComment);

  await submitForm(page, RoutingLinks.ShowExclusionReason);
};

export const verifyExclusionReasonExists = async ({ financialPeriod, exclusionReason }: CreateExclusionReasonProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowExclusionReason);

  await setSearchText(page, getSearchTerm(exclusionReason));

  const expectedFirstRow: Array<RowData> = [
    { colId: "name", expectedValue: exclusionReason.exclusionReasonName },
    { colId: "comment", expectedValue: exclusionReason.exclusionReasonComment },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];

  const displayedRow = await getDisplayedRows(page);
  await checkRow(displayedRow, expectedFirstRow);
};

export const verifyExclusionReasonDoesntExists = async ({ exclusionReason }: CreateExclusionReasonProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowExclusionReason, getSearchTerm(exclusionReason), page);
};
const getSearchTerm = (exclusionReason: CreateExclusionReasonFields) => exclusionReason.exclusionReasonName;

export const deleteExclusionReason = async ({ financialPeriod, exclusionReason }: CreateExclusionReasonProps, page: Page) => {
  await deleteData(RoutingLinks.ShowExclusionReason, getSearchTerm(exclusionReason), page);
  await verifyRowDoesntExist(RoutingLinks.ShowExclusionReason, getSearchTerm(exclusionReason), page);
};

interface BatchDeleteExclusionReasonProps {
  exclusionReasonNames: Array<string>;
}
export const batchDeleteExclusionReason = async ({ exclusionReasonNames }: BatchDeleteExclusionReasonProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowExclusionReason);

  await setTableFilter(page, 0, exclusionReasonNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateExclusionReasonProps {
  oldExclusionReason: CreateExclusionReasonProps;
  newExclusionReason: CreateExclusionReasonProps;
}
export const updateExclusionReason = async ({ oldExclusionReason, newExclusionReason }: UpdateExclusionReasonProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowExclusionReason);

  await setSearchText(page, getSearchTerm(oldExclusionReason.exclusionReason));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditExclusionReason + "*");

  const textFieldsFilledById: Array<keyof CreateExclusionReasonFields> = ["exclusionReasonName", "exclusionReasonComment"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newExclusionReason.exclusionReason[textField]);
  }

  await submitForm(page, RoutingLinks.ShowExclusionReason);
};
