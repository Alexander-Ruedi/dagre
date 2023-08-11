import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { newFinancialPeriodName } from "../data/common/Common.data";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface CreateRecipientExclusionFields {
  recipientNames: Array<string>;
  serviceNames: Array<string>;
  reallocateToText: string;
  comment: string;
}
interface CreateRecipientExclusionsProps {
  recipientExclusion: CreateRecipientExclusionFields;
  financialPeriod: {
    name: string;
  };
}

export const createRecipientExclusions = async ({ financialPeriod, recipientExclusion }: CreateRecipientExclusionsProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateRecipientExclusion);

  const recipientNameFormField = await page.getByTestId("recipientNames");
  for (const recipientName of recipientExclusion.recipientNames) {
    await recipientNameFormField.getByPlaceholder("Select company").click();
    await page.getByRole("option", { name: recipientName }).click();
  }

  const serviceNameFormField = await page.getByTestId("serviceNames");
  for (const serviceName of recipientExclusion.serviceNames) {
    await serviceNameFormField.getByPlaceholder("Select service").click();
    await page.getByRole("option", { name: serviceName }).click();
  }

  const reallocateToField = page.getByTestId("reallocateToCompany");
  await reallocateToField.getByRole("button").click();
  await page.getByRole("option", { name: recipientExclusion.reallocateToText }).click();

  await setTextFieldByTestId(page, "comment", recipientExclusion.comment);

  await page.getByTestId("submitButton").click();
  await page.waitForURL(frontendPath + RoutingLinks.ShowRecipientExclusion);
};

interface VerifyRecipientExclusionFields {
  recipientName: string;
  serviceName: string;
  reallocateTo: string;
  comment: string;
  serviceType: string;
}
interface VerifyRecipientExclusionProps {
  recipientExclusion: VerifyRecipientExclusionFields;
  financialPeriod: {
    name: string;
  };
}

export const verifyRecipientExclusionExists = async ({ financialPeriod, recipientExclusion }: VerifyRecipientExclusionProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowRecipientExclusion);

  await setSearchText(page, getSearchTerm(recipientExclusion));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  const expectedFirstRow: Array<RowData> = [
    {
      colId: "companyCodeAndName",
      expectedValue: recipientExclusion.recipientName,
    },
    {
      colId: "serviceName",
      expectedValue: recipientExclusion.serviceName,
    },
    {
      colId: "reallocateTo",
      expectedValue: recipientExclusion.reallocateTo,
    },
    {
      colId: "comment",
      expectedValue: recipientExclusion.comment,
    },
    {
      colId: "financialPeriod.name",
      expectedValue: financialPeriod.name,
    },
  ];

  await checkRow(displayedRow, expectedFirstRow);
};

export const verifyRecipientExclusionDoesntExists = async ({ recipientExclusion }: VerifyRecipientExclusionProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowRecipientExclusion, getSearchTerm(recipientExclusion), page);
};
const getSearchTerm = (recipientExclusion: VerifyRecipientExclusionFields) =>
  recipientExclusion.recipientName + " " + recipientExclusion.serviceName + " " + recipientExclusion.serviceType;

export const deleteRecipientExclusion = async ({ financialPeriod, recipientExclusion }: VerifyRecipientExclusionProps, page: Page) => {
  await deleteData(RoutingLinks.ShowRecipientExclusion, getSearchTerm(recipientExclusion), page);
  await verifyRowDoesntExist(RoutingLinks.ShowRecipientExclusion, getSearchTerm(recipientExclusion), page);
};

interface BatchDeleteExclusionReasonProps {
  recipientNames: Array<string>;
  reallocateToNames: Array<string>;
  serviceTypes: Array<string>;
  serviceNames: Array<string>;
}
export const batchDeleteRecipientExclusion = async (
  { recipientNames, serviceNames, serviceTypes, reallocateToNames }: BatchDeleteExclusionReasonProps,
  page: Page,
) => {
  await openFeature(page, RoutingLinks.ShowRecipientExclusion);

  await setTableFilter(page, 0, recipientNames);
  await setTableFilter(page, 2, serviceNames);
  await setTableFilter(page, 3, serviceTypes);
  await setTableFilter(page, 4, reallocateToNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateExclusionReasonProps {
  oldExclusionReason: VerifyRecipientExclusionProps;
  newExclusionReason: VerifyRecipientExclusionProps;
}
export const updateExclusionReason = async ({ oldExclusionReason, newExclusionReason }: UpdateExclusionReasonProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowRecipientExclusion);

  await setSearchText(page, getSearchTerm(oldExclusionReason.recipientExclusion));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditExclusionReason + "*");

  const reallocateToField = page.getByTestId("reallocateToCompany");
  await reallocateToField.getByRole("button").click();
  await page.getByText(newExclusionReason.recipientExclusion.reallocateTo).click();

  await setTextFieldByTestId(page, "", newExclusionReason.recipientExclusion.comment);

  await submitForm(page, RoutingLinks.ShowRecipientExclusion);
};
