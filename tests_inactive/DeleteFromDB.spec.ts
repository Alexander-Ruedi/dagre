import { test } from "@playwright/test";

const ShowBucketsUrl = "http://localhost:3000/buckets/show";
test("Wipe Database", async ({ page }) => {
  await page.goto(ShowBucketsUrl);
  //await page.locator("#ag-11-input").click();
  await page.locator(".ag-root-wrapper").getByRole("button").filter({ hasText: "Delete" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
  await page.waitForTimeout(1000);
});
