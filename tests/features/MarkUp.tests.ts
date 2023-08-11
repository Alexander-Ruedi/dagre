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

interface CreateMarkUpProps {
  markUp: {
    serviceAndCompanyNames: Array<string>;
    valueAdd: string;
    passThrough: string;
    comment: string;
  };
  financialPeriod: {
    name: string;
  };
}

export const createMarkUps = async ({ financialPeriod, markUp }: CreateMarkUpProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateMarkUp);

  await setTextFieldByTestId(page, "comment", markUp.comment);
  await setTextFieldByTestId(page, "valueAdd", markUp.valueAdd);
  await setTextFieldByTestId(page, "passThrough", markUp.passThrough);

  const serviceIdsField = await page.getByTestId("serviceIds");
  const serviceIdControl = await serviceIdsField.getByPlaceholder("Select service");

  for (const serviceName of markUp.serviceAndCompanyNames) {
    await serviceIdControl.click();
    await page.getByRole("option", { name: serviceName }).click();
  }

  await submitForm(page, RoutingLinks.ShowMarkUp);
};

interface VerifyMarkUpFields {
  serviceName: string;
  valueAdd: string;
  passThrough: string;
  comment: string;
}
interface VerifyMarkUpProps {
  markUp: VerifyMarkUpFields;
  financialPeriod: {
    name: string;
  };
}

export const verifyMarkUpExists = async ({ financialPeriod, markUp }: VerifyMarkUpProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowMarkUp);

  await setSearchText(page, getSearchTerm(markUp));

  const expectedRow: Array<RowData> = [
    { colId: "type", expectedValue: "Service specific" },
    { colId: "service.name", expectedValue: markUp.serviceName },
    { colId: "valueAddMarkup", expectedValue: markUp.valueAdd + ",00 %" },
    { colId: "passThroughMarkup", expectedValue: markUp.passThrough + ",00 %" },
    { colId: "comment", expectedValue: markUp.comment },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];

  const currentDataRow = await getDisplayedRows(page);
  await checkRow(currentDataRow, expectedRow);
};

export const verifyMarkUpDoesntExists = async ({ markUp }: VerifyMarkUpProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowService, getSearchTerm(markUp), page);
};
const getSearchTerm = (markUp: VerifyMarkUpFields) => markUp.serviceName + " " + markUp.comment;

export const deleteMarkUp = async ({ financialPeriod, markUp }: VerifyMarkUpProps, page: Page) => {
  await deleteData(RoutingLinks.ShowMarkUp, getSearchTerm(markUp), page);
  await verifyRowDoesntExist(RoutingLinks.ShowMarkUp, getSearchTerm(markUp), page);
};

interface BatchDeleteMarkUpProps {
  providerNames: Array<string>;
  serviceNames: Array<string>;
}
export const batchDeleteMarkUps = async ({ providerNames, serviceNames }: BatchDeleteMarkUpProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowMarkUp);

  await setTableFilter(page, 1, providerNames);
  await setTableFilter(page, 2, serviceNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateMarkUpProps {
  oldMarkUp: VerifyMarkUpProps;
  newMarkUp: VerifyMarkUpProps;
}
export const updateMarkup = async ({ oldMarkUp, newMarkUp }: UpdateMarkUpProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowMarkUp);

  await setSearchText(page, getSearchTerm(oldMarkUp.markUp));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditMarkUp + "*");

  const textFieldsFilledById: Array<keyof VerifyMarkUpFields> = ["valueAdd", "passThrough", "comment"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newMarkUp.markUp[textField]);
  }

  await submitForm(page, RoutingLinks.ShowMarkUp);
};
