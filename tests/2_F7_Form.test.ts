import { expect, Page, test } from "@playwright/test";
import { RoutingLinks } from "../src/common/components/routing/data/RoutingData";
import { financialPeriod2 } from "./data/common/FinancialPeriod.data";
import { batchDeleteExpenseIncome } from "./features/ExpenseIncome.tests";
import { createFinancialPeriod } from "./features/FinancialPeriod.tests";
import { updateFinancialPeriod } from "./usability/Breadcrumbs";
import { checkComboboxes, ExpectedCheckbox, setComboboxByTestId } from "./usability/Combobox";
import { clickSubmitForm, submitForm } from "./usability/Form";
import { checkErrorMessage } from "./usability/FormField";
import { openFeature } from "./usability/Navigation";
import { getTextFieldByTestId } from "./usability/TextBox";

test.describe("Form", () => {
  test("Prepare data", async ({ page }) => {
    await createFinancialPeriod(financialPeriod2, page);

    //0003-DE03 can be removed lated (for now batch delete is disabled unless 2 or more rows are selected
    await batchDeleteExpenseIncome(
      {
        providerName: ["0001-DE01", "0003-DE03"],
        costCenterName: ["10000-Group Controlling"],
        costElementName: ["4001-Erträge Konzernuml."],
      },
      page,
    );
    await batchDeleteExpenseIncome(
      {
        providerName: ["0001-DE01", "0003-DE03"],
        costCenterName: ["10001-Werbung Sponsoring"],
        costElementName: ["4000-Aufwand Konzernuml."],
      },
      page,
    );
  });

  test("Total after exclusion", async ({ page }) => {
    await openFeature(page, RoutingLinks.CreateDirectServiceAllocation);

    await setComboboxDefaults(page);
    const totalAfterExclusionText = await getTextFieldByTestId(page, "totalAfterExclusion");

    await expect(totalAfterExclusionText).toBe("37.708");
  });

  test.describe("Reset dropdowns", () => {
    test("On change financial period", async ({ page }) => {
      await openFeature(page, RoutingLinks.CreateDirectServiceAllocation);

      await setComboboxDefaults(page);
      await updateFinancialPeriod(page, financialPeriod2.financialPeriod.name);

      await checkComboboxes(page, [
        { testId: "provider", expectedValue: "Please select" },
        { testId: "costCenter", expectedValue: "Please select" },
        { testId: "costElement", expectedValue: "Please select (if required)" },
        { testId: "recipientCompanyId", expectedValue: "Please select" },
        { testId: "serviceId", expectedValue: "Please select" },
      ]);

      await clickSubmitForm(page);
      await checkErrorMessage(page, "provider", "Please select provider company");
      await checkErrorMessage(page, "costCenter", "(Provider) Cost center is required");
      await checkErrorMessage(page, "recipientCompanyId", "Recipient of the direct service allocation is required");
      await checkErrorMessage(page, "serviceId", "(Direct) Service is required");
    });

    test("On change provider company", async ({ page }) => {
      await openFeature(page, RoutingLinks.CreateDirectServiceAllocation);

      await setComboboxDefaults(page);
      await setComboboxByTestId(page, "provider", "", "0002-DE02");

      await checkComboboxes(page, [
        { testId: "provider", expectedValue: "0002-DE02" },
        { testId: "costCenter", expectedValue: "Please select" },
        { testId: "costElement", expectedValue: "Please select (if required)" },
        { testId: "recipientCompanyId", expectedValue: "Please select" },
        { testId: "serviceId", expectedValue: "Please select" },
      ]);

      await clickSubmitForm(page);
      await checkErrorMessage(page, "costCenter", "Required");
      await checkErrorMessage(page, "recipientCompanyId", "Required");
      await checkErrorMessage(page, "serviceId", "Required");
    });

    test("On change cost center", async ({ page }) => {
      await openFeature(page, RoutingLinks.CreateDirectServiceAllocation);

      await setComboboxDefaults(page);
      await setComboboxByTestId(page, "costCenter", "", "10001-Werbung Sponsoring");

      await checkComboboxes(page, [
        { testId: "provider", expectedValue: "0001-DE01" },
        { testId: "costCenter", expectedValue: "10001-Werbung Sponsoring" },
        { testId: "costElement", expectedValue: "Please select (if required)" },
        { testId: "recipientCompanyId", expectedValue: "0002-DE02" },
        { testId: "serviceId", expectedValue: "Controlling Project" },
      ]);
    });

    test("On change cost element", async ({ page }) => {
      await openFeature(page, RoutingLinks.CreateDirectServiceAllocation);

      await setComboboxDefaults(page);
      await setComboboxByTestId(page, "costElement", "", "4002-KALK. AFA MASCHINEN");

      await checkComboboxes(page, [
        { testId: "provider", expectedValue: "0001-DE01" },
        { testId: "costCenter", expectedValue: "10000-Group Controlling" },
        { testId: "costElement", expectedValue: "4002-KALK. AFA MASCHINEN" },
        { testId: "recipientCompanyId", expectedValue: "0002-DE02" },
        { testId: "serviceId", expectedValue: "Controlling Project" },
      ]);
    });

    test("On change recipient", async ({ page }) => {
      await openFeature(page, RoutingLinks.CreateDirectServiceAllocation);

      await setComboboxDefaults(page);
      await setComboboxByTestId(page, "recipientCompanyId", "", "0003-DE03");

      await checkComboboxes(page, [
        { testId: "provider", expectedValue: "0001-DE01" },
        { testId: "costCenter", expectedValue: "10000-Group Controlling" },
        { testId: "costElement", expectedValue: "4000-Aufwand Konzernuml." },
        { testId: "recipientCompanyId", expectedValue: "0003-DE03" },
        { testId: "serviceId", expectedValue: "Controlling Project" },
      ]);
    });

    test("On change service", async ({ page }) => {
      await openFeature(page, RoutingLinks.CreateDirectServiceAllocation);

      await setComboboxDefaults(page);
      await setComboboxByTestId(page, "serviceId", "", "IT Project");

      await checkComboboxes(page, [
        { testId: "provider", expectedValue: "0001-DE01" },
        { testId: "costCenter", expectedValue: "10000-Group Controlling" },
        { testId: "costElement", expectedValue: "4000-Aufwand Konzernuml." },
        { testId: "recipientCompanyId", expectedValue: "0002-DE02" },
        { testId: "serviceId", expectedValue: "IT Project" },
      ]);
    });
  });
});

const setComboboxDefaults = async (page: Page) => {
  await setComboboxByTestId(page, "provider", "Please select", "0001-DE01");
  await setComboboxByTestId(page, "costCenter", "Please select", "10000-Group Controlling");
  await setComboboxByTestId(page, "costElement", "Please select", "4000-Aufwand Konzernuml.");
  await setComboboxByTestId(page, "recipientCompanyId", "Please select", "0002-DE02");
  await setComboboxByTestId(page, "serviceId", "Please select", "Controlling Project");

  await checkComboboxes(page, [
    { testId: "provider", expectedValue: "0001-DE01" },
    { testId: "costCenter", expectedValue: "10000-Group Controlling" },
    { testId: "costElement", expectedValue: "4000-Aufwand Konzernuml." },
    { testId: "recipientCompanyId", expectedValue: "0002-DE02" },
    { testId: "serviceId", expectedValue: "Controlling Project" },
  ]);
};
