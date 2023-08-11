import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setNumberFieldByTestId } from "../usability/NumberBox";
import { setTextFieldByTestId } from "../usability/TextBox";

interface CreateBucketProps {
  name: string;
  fiscalYear: string;
}
export const createBucket = async (bucket: CreateBucketProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateBucket);

  await setTextFieldByTestId(page, "bucketName", bucket.name);
  await setNumberFieldByTestId(page, "fiscalYear", bucket.fiscalYear);

  await submitForm(page, RoutingLinks.ShowBucket);
};

interface UpdateBucketProps {
  oldBucket: CreateBucketProps;
  newBucket: CreateBucketProps;
}

export const updateBucket = async ({ oldBucket, newBucket }: UpdateBucketProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowBucket);

  await setSearchText(page, oldBucket.name);

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditBucket + "*");

  await setTextFieldByTestId(page, "bucketName", newBucket.name);

  await submitForm(page, RoutingLinks.ShowBucket);
};

export const deleteBucket = async (bucket: CreateBucketProps, page: Page) => {
  await deleteData(RoutingLinks.ShowBucket, bucket.name, page);
  await verifyRowDoesntExist(RoutingLinks.ShowBucket, bucket.name, page);
};

interface BatchDeleteBucketProps {
  bucketNames: Array<string>;
}
export const batchDeleteBuckets = async ({ bucketNames }: BatchDeleteBucketProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowBucket);

  await setTableFilter(page, 0, bucketNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

export const verifyBucketExists = async (bucket: CreateBucketProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowBucket);

  await setSearchText(page, bucket.name);

  const displayedRows = await getDisplayedRows(page);
  await expect(displayedRows).toHaveCount(1);
  await expect(displayedRows).toBeVisible();

  const expectedFirstRow: Array<RowData> = [
    { colId: "name", expectedValue: bucket.name },
    { colId: "fiscalYear", expectedValue: bucket.fiscalYear },
  ];

  await checkRow(displayedRows, expectedFirstRow);
};

export const verifyBucketDoesntExists = async (bucket: CreateBucketProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowBucket, bucket.name, page);
};
