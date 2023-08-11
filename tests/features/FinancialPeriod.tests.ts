import { expect, Page } from "@playwright/test";
import { Months, monthTexts } from "../../src/common/components/controls/month-range/components/MonthComponent";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { currentYear, frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText } from "../usability/AGGrid";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData } from "../usability/Importer";
import { pad, setMonthRangeByTestId } from "../usability/MonthRange";
import { openFeature } from "../usability/Navigation";
import { setButtonGroup } from "../usability/RadioButton";
import { setTextFieldByTestId } from "../usability/TextBox";

interface CreateFinancialPeriodProps {
  financialPeriod: {
    name: string;
    fromMonth: Months;
    toMonth: Months;
    type: string;
    orderNumber: string;
  };
  bucket: {
    name: string;
    fiscalYear: string;
  };
}

export const createFinancialPeriod = async ({ financialPeriod, bucket }: CreateFinancialPeriodProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateFinancialPeriod);

  await setTextFieldByTestId(page, "financialPeriodName", financialPeriod.name);
  await setMonthRangeByTestId(page, "financialPeriodRange", financialPeriod.fromMonth, financialPeriod.toMonth);
  await setButtonGroup(page, "financialPeriodType", financialPeriod.type);

  await submitForm(page, RoutingLinks.ShowFinancialPeriod);
};

interface UpdateFinancialPeriodProps {
  oldFinancialPeriod: CreateFinancialPeriodProps;
  newFinancialPeriod: CreateFinancialPeriodProps;
}

export const updateFinancialPeriod = async ({ oldFinancialPeriod, newFinancialPeriod }: UpdateFinancialPeriodProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowFinancialPeriod);

  await setSearchText(page, oldFinancialPeriod.financialPeriod.name);

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditFinancialPeriod + "*");

  await setTextFieldByTestId(page, "financialPeriodName", newFinancialPeriod.financialPeriod.name);

  await submitForm(page, RoutingLinks.ShowFinancialPeriod);
};

export const deleteFinancialPeriod = async ({ financialPeriod, bucket }: CreateFinancialPeriodProps, page: Page) => {
  await deleteData(RoutingLinks.ShowFinancialPeriod, financialPeriod.name, page);
  await verifyRowDoesntExist(RoutingLinks.ShowFinancialPeriod, financialPeriod.name, page);
};

export const verifyFinancialPeriodExists = async ({ financialPeriod, bucket }: CreateFinancialPeriodProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowFinancialPeriod);

  await setSearchText(page, financialPeriod.name);

  await page.waitForTimeout(1000);
  const displayedRows = await getDisplayedRows(page);

  const expectedFirstRow: Array<RowData> = [
    { colId: "name", expectedValue: financialPeriod.name },
    { colId: "type", expectedValue: financialPeriod.type + " " + financialPeriod.orderNumber },
    { colId: "fromDate", expectedValue: currentYear + "-" + pad(monthTexts.indexOf(financialPeriod.fromMonth), 2) },
    { colId: "toDate", expectedValue: currentYear + "-" + pad(monthTexts.indexOf(financialPeriod.toMonth), 2) },
    { colId: "bucket.name", expectedValue: bucket.name },
    { colId: "bucket.fiscalYear", expectedValue: bucket.fiscalYear },
  ];

  await checkRow(displayedRows, expectedFirstRow);
};

export const verifyFinancialPeriodDoesntExists = async ({ financialPeriod }: CreateFinancialPeriodProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowFinancialPeriod, financialPeriod.name, page);
};
