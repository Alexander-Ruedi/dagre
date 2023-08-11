import { expect, Page, test } from "@playwright/test";
import { RoutingLinks } from "../src/common/components/routing/data/RoutingData";
import { bucket1, bucket2 } from "./data/common/Bucket.data";
import { createBucket, deleteBucket } from "./features/Bucket.tests";
import {
  getColumnNameByColumnIndex,
  getDisplayedRows,
  getRowByRowIndex,
  getSortByColumnIndex,
  isRowSelectedByRowIndex,
  resizeColumn,
  selectRowByRowIndex,
  setTableFilter,
  sortColumnByColumnIndex,
  SortOrder,
  toggleColumnVisibility,
} from "./usability/AGGrid";
import { applyCustomView, deleteCustomView, isCustomViewAvailable, isCustomViewSelected, saveCustomView } from "./usability/CustomView";
import { FitToOptions, setFitTo } from "./usability/FitTo";
import { navigateToFeature, openFeature } from "./usability/Navigation";

const reopenBuckets = async (page: Page) => {
  await navigateToFeature(page, "Financial periods");
  await navigateToFeature(page, "Buckets");
};
test.describe("View tests", () => {
  test.describe("On feature", () => {
    test("Filters", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await openFeature(page, RoutingLinks.ShowBucket);

      await setTableFilter(page, 0, ["Test Bucket"]);

      const displayedRows = await getDisplayedRows(page);
      await expect(displayedRows).toHaveCount(1);

      await deleteBucket(bucket1, page);
      await deleteBucket(bucket2, page);
    });

    test.describe("Columns", () => {
      test.describe("Fit to", () => {
        test("Initial fit to screen", async ({ page }) => {
          await createBucket(bucket1, page);
          await openFeature(page, RoutingLinks.ShowBucket);

          const bucketNameColumn = await getHeaderCell(page, 1);
          const bucketNameColumnBBox = await bucketNameColumn.boundingBox();

          expect(bucketNameColumnBBox?.width).toBe(336);
          await deleteBucket(bucket1, page);
        });
        test("Fit to content", async ({ page }) => {
          await createBucket(bucket1, page);
          await openFeature(page, RoutingLinks.ShowBucket);

          await setFitTo(page, FitToOptions.CONTENT);

          const bucketNameColumn = await getHeaderCell(page, 1);
          const bucketNameColumnBBox = await bucketNameColumn.boundingBox();

          expect(bucketNameColumnBBox?.width).toBe(183);
          await deleteBucket(bucket1, page);
        });

        test("Fit to screen", async ({ page }) => {
          await createBucket(bucket1, page);
          await openFeature(page, RoutingLinks.ShowBucket);

          await setFitTo(page, FitToOptions.SCREEN);

          const bucketNameColumn = await getHeaderCell(page, 1);
          const bucketNameColumnBBox = await bucketNameColumn.boundingBox();

          expect(bucketNameColumnBBox?.width).toBe(336);
          await deleteBucket(bucket1, page);
        });
      });

      test("Resize", async ({ page }) => {
        await createBucket(bucket1, page);
        await openFeature(page, RoutingLinks.ShowBucket);

        const bucketNameColumn = await getHeaderCell(page, 1);
        const bucketNameColumnBBox = await bucketNameColumn.boundingBox();
        expect(bucketNameColumnBBox?.width).toBe(336);

        await resizeColumn(page, 1, -100);

        const recreatedBucketNameColumn = await getHeaderCell(page, 1);
        const recreatedBucketNameColumnBBox = await recreatedBucketNameColumn.boundingBox();
        expect(recreatedBucketNameColumnBBox?.width).toBe(236);

        await deleteBucket(bucket1, page);
      });

      test("Hide", async ({ page }) => {
        await createBucket(bucket1, page);
        await openFeature(page, RoutingLinks.ShowBucket);

        await toggleColumnVisibility(page, 1, ["Updated by"]);
        const newVisibleColumnName = await getColumnNameByColumnIndex(page, 4);

        expect(newVisibleColumnName).toBe("Updated by");
        await deleteBucket(bucket1, page);
      });
    });

    test("Selected rows", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await openFeature(page, RoutingLinks.ShowBucket);

      await selectRowByRowIndex(page, 0);
      const isSelected = await isRowSelectedByRowIndex(page, 0);
      expect(isSelected).toBe(true);

      await deleteBucket(bucket1, page);
      await deleteBucket(bucket2, page);
    });

    test.describe("Sorting", () => {
      test("Ascending", async ({ page }) => {
        await createBucket(bucket1, page);
        await createBucket(bucket2, page);
        await openFeature(page, RoutingLinks.ShowBucket);

        await sortColumnByColumnIndex(page, 1);
        const sortOrder = await getSortByColumnIndex(page, 1);
        expect(sortOrder).toMatchObject({
          sortOrder: SortOrder.ASCENDING,
          sortIndex: "1",
        });

        await deleteBucket(bucket1, page);
        await deleteBucket(bucket2, page);
      });
      test("Descending", async ({ page }) => {
        await createBucket(bucket1, page);
        await createBucket(bucket2, page);
        await openFeature(page, RoutingLinks.ShowBucket);

        await sortColumnByColumnIndex(page, 1);
        await sortColumnByColumnIndex(page, 1);
        const sortOrder = await getSortByColumnIndex(page, 1);
        expect(sortOrder).toMatchObject({
          sortOrder: SortOrder.DESCENDING,
          sortIndex: "",
        });

        await deleteBucket(bucket1, page);
        await deleteBucket(bucket2, page);
      });
    });
  });
  test.describe("On reopen feature", () => {
    test("Filter", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await openFeature(page, RoutingLinks.ShowBucket);

      await setTableFilter(page, 0, ["Test Bucket"]);

      const displayedRows = await getDisplayedRows(page);
      await expect(displayedRows).toHaveCount(1);

      await reopenBuckets(page);

      const displayedRowsOnReopen = await getDisplayedRows(page);
      await expect(displayedRowsOnReopen).toHaveCount(1);

      await deleteBucket(bucket1, page);
      await deleteBucket(bucket2, page);
    });

    test.describe("Columns", () => {
      test("Fit to", async ({ page }) => {
        await createBucket(bucket1, page);
        await openFeature(page, RoutingLinks.ShowBucket);

        await setFitTo(page, FitToOptions.CONTENT);

        const bucketNameColumn = await getHeaderCell(page, 1);
        const bucketNameColumnBBox = await bucketNameColumn.boundingBox();
        expect(bucketNameColumnBBox?.width).toBe(183);

        await reopenBuckets(page);

        const bucketNameColumnOnReopen = await getHeaderCell(page, 1);
        const bucketNameColumnBBoxOnReopen = await bucketNameColumnOnReopen.boundingBox();
        expect(bucketNameColumnBBoxOnReopen?.width).toBe(183);

        await deleteBucket(bucket1, page);
      });
      test("Resized columns", async ({ page }) => {
        await createBucket(bucket1, page);
        await openFeature(page, RoutingLinks.ShowBucket);
        await resizeColumn(page, 1, -100);

        const bucketNameColumn = await getHeaderCell(page, 1);
        const bucketNameColumnBBox = await bucketNameColumn.boundingBox();
        expect(bucketNameColumnBBox?.width).toBe(236);

        await reopenBuckets(page);

        const bucketNameColumnOnReopen = await getHeaderCell(page, 1);
        const bucketNameColumnBBoxOnReopen = await bucketNameColumnOnReopen.boundingBox();
        expect(bucketNameColumnBBoxOnReopen?.width).toBe(236);

        await deleteBucket(bucket1, page);
      });

      test("Hide", async ({ page }) => {
        await createBucket(bucket1, page);
        await openFeature(page, RoutingLinks.ShowBucket);

        await toggleColumnVisibility(page, 1, ["Updated by"]);
        const newVisibleColumnName = await getColumnNameByColumnIndex(page, 4);
        expect(newVisibleColumnName).toBe("Updated by");

        await reopenBuckets(page);

        await page.waitForTimeout(5000);

        //column index is now 3 as the sequence is different on reopen -> not a concern for us
        const newVisibleColumnNameOnReopen = await getColumnNameByColumnIndex(page, 3);
        expect(newVisibleColumnNameOnReopen).toBe("Updated by");

        await deleteBucket(bucket1, page);
      });
    });

    test("Selected rows", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await openFeature(page, RoutingLinks.ShowBucket);

      await selectRowByRowIndex(page, 0);
      const isSelected = await isRowSelectedByRowIndex(page, 0);
      expect(isSelected).toBe(true);

      await reopenBuckets(page);

      const isSelectedOnReopen = await isRowSelectedByRowIndex(page, 0);
      expect(isSelectedOnReopen).toBe(true);

      await deleteBucket(bucket1, page);
      await deleteBucket(bucket2, page);
    });

    test.describe("Sorting", () => {
      test("Ascending", async ({ page }) => {
        await createBucket(bucket1, page);
        await createBucket(bucket2, page);
        await openFeature(page, RoutingLinks.ShowBucket);

        await sortColumnByColumnIndex(page, 1);
        const sortOrder = await getSortByColumnIndex(page, 1);
        expect(sortOrder).toMatchObject({
          sortOrder: SortOrder.ASCENDING,
          sortIndex: "1",
        });

        await reopenBuckets(page);

        const sortOrderOnReopen = await getSortByColumnIndex(page, 1);
        expect(sortOrderOnReopen).toMatchObject({
          sortOrder: SortOrder.ASCENDING,
          sortIndex: "1",
        });

        await deleteBucket(bucket1, page);
        await deleteBucket(bucket2, page);
      });
      test("Descending", async ({ page }) => {
        await createBucket(bucket1, page);
        await createBucket(bucket2, page);
        await openFeature(page, RoutingLinks.ShowBucket);

        await sortColumnByColumnIndex(page, 1);
        await sortColumnByColumnIndex(page, 1);
        const sortOrder = await getSortByColumnIndex(page, 1);
        expect(sortOrder).toMatchObject({
          sortOrder: SortOrder.DESCENDING,
          sortIndex: "",
        });

        await reopenBuckets(page);

        const sortOrderOnReopen = await getSortByColumnIndex(page, 1);
        expect(sortOrderOnReopen).toMatchObject({
          sortOrder: SortOrder.DESCENDING,
          sortIndex: "",
        });

        await deleteBucket(bucket1, page);
        await deleteBucket(bucket2, page);
      });
    });
  });

  test.describe("View storage", () => {
    test("CRUD view", async ({ page }) => {
      await openFeature(page, RoutingLinks.ShowBucket);
      await saveCustomView(page, "test view");

      const isInitialViewSelected = await isCustomViewSelected(page, "Initial view");
      expect(isInitialViewSelected).toBe(false);

      const isSelected = await isCustomViewSelected(page, "test view");
      expect(isSelected).toBe(true);

      await applyCustomView(page, "Initial view");
      const isInitialSelected = await isCustomViewSelected(page, "Initial view");
      expect(isInitialSelected).toBe(true);

      await deleteCustomView(page, "test view");
      const isAvailable = await isCustomViewAvailable(page, "test view");
      expect(isAvailable).toBe(false);
    });
  });

  test.describe("On apply saved view", () => {
    test("Filter", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await openFeature(page, RoutingLinks.ShowBucket);

      await setTableFilter(page, 0, ["Test Bucket"]);

      const displayedRows = await getDisplayedRows(page);
      await expect(displayedRows).toHaveCount(1);

      await saveCustomView(page, "test view");
      await applyCustomView(page, "Initial view");

      const displayedRowsOnReset = await getDisplayedRows(page);
      await expect(displayedRowsOnReset).toHaveCount(2);

      await applyCustomView(page, "test view");

      const displayedRowsOnReapply = await getDisplayedRows(page);
      await expect(displayedRowsOnReapply).toHaveCount(1);

      await deleteBucket(bucket1, page);
      await deleteBucket(bucket2, page);
    });

    test("Columns", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await openFeature(page, RoutingLinks.ShowBucket);

      await setFitTo(page, FitToOptions.CONTENT);

      const bucketNameColumn = await getHeaderCell(page, 1);
      const bucketNameColumnBBox = await bucketNameColumn.boundingBox();
      expect(bucketNameColumnBBox?.width).toBe(183);

      await saveCustomView(page, "test view");
      await applyCustomView(page, "Initial view");

      const bucketNameColumnOnReset = await getHeaderCell(page, 1);
      const bucketNameColumnBBoxOnReset = await bucketNameColumnOnReset.boundingBox();
      expect(bucketNameColumnBBoxOnReset?.width).toBe(336);

      await applyCustomView(page, "test view");

      const bucketNameColumnOnReapply = await getHeaderCell(page, 1);
      const bucketNameColumnBBoxOnReapply = await bucketNameColumnOnReapply.boundingBox();
      expect(bucketNameColumnBBoxOnReapply?.width).toBe(183);

      await deleteBucket(bucket1, page);
      await deleteBucket(bucket2, page);
    });
    test("Selected rows", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await openFeature(page, RoutingLinks.ShowBucket);

      await selectRowByRowIndex(page, 0);

      const isSelected = await isRowSelectedByRowIndex(page, 0);
      expect(isSelected).toBe(true);

      await saveCustomView(page, "test view");
      await applyCustomView(page, "Initial view");

      const isSelectedOnReset = await isRowSelectedByRowIndex(page, 0);
      expect(isSelectedOnReset).toBe(false);

      await applyCustomView(page, "test view");

      //selected rows are NOT reapplied!
      const isSelectedOnReapply = await isRowSelectedByRowIndex(page, 0);
      expect(isSelectedOnReapply).toBe(false);

      await deleteBucket(bucket1, page);
      await deleteBucket(bucket2, page);
    });
    test("Sorting", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await openFeature(page, RoutingLinks.ShowBucket);

      await sortColumnByColumnIndex(page, 1);

      const sortOrder = await getSortByColumnIndex(page, 1);
      expect(sortOrder).toMatchObject({
        sortOrder: SortOrder.ASCENDING,
        sortIndex: "1",
      });

      await saveCustomView(page, "test view");
      await applyCustomView(page, "Initial view");

      const sortOrderOnReset = await getSortByColumnIndex(page, 1);
      expect(sortOrderOnReset).toMatchObject({
        sortOrder: SortOrder.DESCENDING,
        sortIndex: "2",
      });

      await applyCustomView(page, "test view");

      const sortOrderOnReapply = await getSortByColumnIndex(page, 1);
      expect(sortOrderOnReapply).toMatchObject({
        sortOrder: SortOrder.ASCENDING,
        sortIndex: "1",
      });

      await deleteBucket(bucket1, page);
      await deleteBucket(bucket2, page);
    });
  });
});

export const getHeaderCell = async (page: Page, columnIndex: number) => {
  const divHeaderRow = await page.locator("div.ag-header-row");
  expect(divHeaderRow).toBeDefined();
  const bucketNameColumn = await divHeaderRow.locator(".ag-header-cell").nth(columnIndex);
  expect(bucketNameColumn).toBeDefined();

  return bucketNameColumn;
};
