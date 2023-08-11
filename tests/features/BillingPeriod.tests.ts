import { expect, Page } from "@playwright/test";
import { Months, monthTexts } from "../../src/common/components/controls/month-range/components/MonthComponent";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { currentYear, frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData } from "../usability/Importer";
import { pad, setMonthRangeByTestId } from "../usability/MonthRange";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface CreateBillingPeriodProps {
  billingPeriod: {
    name: string;
    fromMonth: Months;
    toMonth: Months;
  };
  financialPeriod: {
    name: string;
  };
  bucket: {
    name: string;
    fiscalYear: string;
  };
}

export const createBillingPeriod = async ({ financialPeriod, bucket, billingPeriod }: CreateBillingPeriodProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateBillingPeriod);

  await setTextFieldByTestId(page, "billingPeriodName", billingPeriod.name);
  await setMonthRangeByTestId(page, "billingPeriodRange", billingPeriod.fromMonth, billingPeriod.toMonth);

  await submitForm(page, RoutingLinks.ShowBillingPeriod);
};

interface UpdateBillingPeriodProps {
  oldBillingPeriod: CreateBillingPeriodProps;
  newBillingPeriod: CreateBillingPeriodProps;
}

export const updateBillingPeriod = async ({ oldBillingPeriod, newBillingPeriod }: UpdateBillingPeriodProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowBillingPeriod);

  await setSearchText(page, oldBillingPeriod.billingPeriod.name);

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditBillingPeriod + "*");

  await setTextFieldByTestId(page, "billingPeriodName", newBillingPeriod.billingPeriod.name);

  await submitForm(page, RoutingLinks.ShowBillingPeriod);
};

export const deleteBillingPeriod = async ({ billingPeriod, bucket }: CreateBillingPeriodProps, page: Page) => {
  await deleteData(RoutingLinks.ShowBillingPeriod, billingPeriod.name, page);
  await verifyRowDoesntExist(RoutingLinks.ShowBillingPeriod, billingPeriod.name, page);
};

interface BatchDeleteBillingPeriodProps {
  billingPeriodNames: Array<string>;
}
export const batchDeleteBillingPeriod = async ({ billingPeriodNames }: BatchDeleteBillingPeriodProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowBillingPeriod);

  await setTableFilter(page, 0, billingPeriodNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

export const verifyBillingPeriodExists = async ({ financialPeriod, bucket, billingPeriod }: CreateBillingPeriodProps, page: Page) => {
  await page.goto(frontendPath + RoutingLinks.ShowBillingPeriod);

  await setSearchText(page, billingPeriod.name);

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  const expectedFirstRow: Array<RowData> = [
    { colId: "name", expectedValue: billingPeriod.name },
    { colId: "fromDate", expectedValue: currentYear + "-" + pad(monthTexts.indexOf(billingPeriod.fromMonth), 2) },
    { colId: "toDate", expectedValue: currentYear + "-" + pad(monthTexts.indexOf(billingPeriod.toMonth), 2) },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
    { colId: "financialPeriod.bucket.name", expectedValue: bucket.name },
    { colId: "financialPeriod.bucket.fiscalYear", expectedValue: bucket.fiscalYear },
  ];

  await checkRow(displayedRow, expectedFirstRow);
};

export const verifyBillingPeriodDoesntExists = async ({ billingPeriod }: CreateBillingPeriodProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowBillingPeriod, billingPeriod.name, page);
};
