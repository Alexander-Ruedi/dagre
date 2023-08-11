import { Page } from "@playwright/test";

const isPopupVisible = async (page: Page) => await page.getByTestId("viewPopup").isVisible();
const openCustomView = async (page: Page) => {
  const isVisible = await isPopupVisible(page);
  if (!isVisible) {
    await page.getByTestId("customView").click();
  }
};
const closeCustomView = async (page: Page) => {
  const isVisible = await isPopupVisible(page);
  if (isVisible) {
    await page.getByTestId("customView").click();
  }
};
export const saveCustomView = async (page: Page, viewName: string) => {
  await openCustomView(page);
  await page.getByTestId("saveCustomView").click();
  await page.getByTestId("viewName").fill(viewName);
  await page.getByTestId("submitButton").click();
};

export const isCustomViewSelected = async (page: Page, viewName: string) => {
  await openCustomView(page);
  const viewItem = await page.getByTestId("allCustomViews").getByRole("menuitem", { name: viewName, exact: true });
  const svgClasses = await viewItem.locator(">svg").getAttribute("class");

  return svgClasses?.indexOf("text-transparent") === -1;
};

export const isCustomViewAvailable = async (page: Page, viewName: string) => {
  await openCustomView(page);
  const matchingCustomViewCount = await page.getByTestId("allCustomViews").getByRole("menuitem", { name: viewName, exact: true }).count();
  return matchingCustomViewCount > 0;
};
export const deleteCustomView = async (page: Page, viewName: string) => {
  await openCustomView(page);
  const customViews = await page.getByTestId("allCustomViews");
  const deleteButton = await customViews.getByRole("menuitem", { name: viewName, exact: true }).getByTestId("deleteView");
  await deleteButton.click({ force: true });
};

export const applyCustomView = async (page: Page, viewName: string) => {
  await page.waitForTimeout(1000);
  await openCustomView(page);
  const customView = await page.getByTestId("allCustomViews").getByRole("menuitem", { name: viewName, exact: true });
  await customView.click();
};
