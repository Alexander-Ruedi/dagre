import { test } from "@playwright/test";
import { Months } from "../src/common/components/controls/month-range/components/MonthComponent";
import { RoutingLinks } from "../src/common/components/routing/data/RoutingData";
import { newBucketName, newBucketYear, newFinancialPeriodName, newFinancialPeriodType } from "./data/common/Common.data";
import { createBillingPeriod, deleteBillingPeriod } from "./features/BillingPeriod.tests";
import { createBucket, deleteBucket } from "./features/Bucket.tests";
import { createCompany, TestRelevance, verifyCompanyExists } from "./features/Company.tests";
import { createCountry, verifyCountryExists } from "./features/Country.tests";
import { createDebitorMapping, verifyDebitorMappingExists } from "./features/DebitorMapping.tests";
import { createDirectAllocation, verifyDirectAllocationExists } from "./features/DirectAllocation.tests";
import { createExclusionReason, verifyExclusionReasonExists } from "./features/ExclusionReason.tests";
import { createFinancialPeriod, deleteFinancialPeriod } from "./features/FinancialPeriod.tests";
import { updateMappingServiceRecipient, verifyMappingServiceRecipientExists } from "./features/MappingServiceRecipient.tests";
import { createMaterialMappings, verifyMaterialMappingExists } from "./features/MaterialMapping.tests";
import { createMixedKey, verifyMixedKeyExists } from "./features/MixedKey.tests";
import { createOrderMapping, verifyOrderMappingExists } from "./features/OrderMapping.tests";
import { createRecipientCCMapping, verifyRecipientCCMappingExists } from "./features/RecipientCCMapping.tests";
import { createRecipientExclusions, verifyRecipientExclusionExists } from "./features/RecipientExclusion.tests";
import { createService, TestServiceType, verifyServiceExists } from "./features/Service.tests";
import { canNavigateTo } from "./usability/Navigation";

test.describe("Navigation test", () => {
  canNavigateTo(RoutingLinks.ShowBucket, ["Period management", "Buckets"]);
  canNavigateTo(RoutingLinks.ShowFinancialPeriod, []);
  canNavigateTo(RoutingLinks.ShowBillingPeriod, ["Period management", "Billing periods"]);

  canNavigateTo(RoutingLinks.ShowCountry, ["Input financial period", "0 Countries"]);
  canNavigateTo(RoutingLinks.ShowCompany, ["Input financial period", "1 Companies"]);
  canNavigateTo(RoutingLinks.ShowRecipientGroup, ["Input financial period", "2 Recipient groups"]);
  canNavigateTo(RoutingLinks.ShowService, ["Input financial period", "3 Services"]);
  canNavigateTo(RoutingLinks.ShowMarkUp, ["Input financial period", "4 Mark-ups"]);
  canNavigateTo(RoutingLinks.ShowIndirectAllocation, ["Input financial period", "5 Indirect allocation keys"]);
  canNavigateTo(RoutingLinks.ShowExpenseIncomeData, ["Input financial period", "6 Cost & income data", "6.0 Cost & income data"]);
  canNavigateTo(RoutingLinks.ShowCostCenter, ["Input financial period", "6 Cost & income data", "6.1 Cost centers"]);
  canNavigateTo(RoutingLinks.ShowCostElement, ["Input financial period", "6 Cost & income data", "6.3 Cost elements"]);
  canNavigateTo(RoutingLinks.ShowWbsCode, ["Input financial period", "6 Cost & income data", "6.2 WBS codes"]);
  canNavigateTo(RoutingLinks.ShowDirectServiceAllocation, ["Input financial period", "7 Direct service allocation"]);
  canNavigateTo(RoutingLinks.ShowCostToServiceAllocation, [
    "Input financial period",
    "8 Cost-to-indirect service mapping",
    "8.0 Cost-to-indirect service mapping",
  ]);
  canNavigateTo(RoutingLinks.ShowExclusionReason, ["Input financial period", "8 Cost-to-indirect service mapping", "8.1 Exclusion reasons"]);
  canNavigateTo(RoutingLinks.ShowServiceMapping, ["Input financial period", "9 Indirect service-to-recipient mapping"]);
  canNavigateTo(RoutingLinks.ShowRecipientExclusion, ["Input financial period", "10 Recipient exclusions"]);

  canNavigateTo(RoutingLinks.ShowDebitorMapping, ["Input billing period", "12 Company debitor mapping"]);
  canNavigateTo(RoutingLinks.ShowOrderMapping, ["Input billing period", "13 Sales order mapping"]);
  canNavigateTo(RoutingLinks.ShowRecipientCCMapping, ["Input billing period", "14 Provider-recipient-cost center mapping"]);
  canNavigateTo(RoutingLinks.ShowDummyMaterialMapping, ["Input billing period", "15 Dummy material mapping"]);

  canNavigateTo(RoutingLinks.Calculation, ["Calculation", "Launch calculation"]);

  canNavigateTo(RoutingLinks.Reporting, ["Reporting and Billing", "Analysis / Reporting"]);
  canNavigateTo(RoutingLinks.BillingFile, ["Reporting and Billing", "Billing upload file"]);

  canNavigateTo(RoutingLinks.Support, ["Optravis", "Support"]);
  canNavigateTo(RoutingLinks.AboutOptravis, ["Optravis", "About"]);
});
test.describe("Template: Create and verify data", () => {
  test("X. Create mixed key", async ({ page }) => {
    await createMixedKey(
      {
        financialPeriod: { name: newFinancialPeriodName },
        mixedKey: {
          name: "Example",
          masterKeys: [
            { masterKeyName: "Headcount", weightingFactor: 1 },
            { masterKeyName: "Revenues", weightingFactor: 2 },
            { masterKeyName: "IT User", weightingFactor: 3 },
          ],
          comment: "some comment",
        },
      },
      page,
    );
    await verifyMixedKeyExists(
      {
        financialPeriod: { name: newFinancialPeriodName },
        mixedKey: {
          name: "Example",
          masterKeys: [
            { masterKeyName: "Headcount", weightingFactor: 1 },
            { masterKeyName: "Revenues", weightingFactor: 2 },
            { masterKeyName: "IT User", weightingFactor: 3 },
          ],
          comment: "some comment",
        },
      },
      page,
    );
  });
  test("X. Create mapping service recipient", async ({ page }) => {
    await updateMappingServiceRecipient(
      {
        financialPeriod: { name: newFinancialPeriodName },
        mappingServiceRecipient: {
          providerCompanyName: "0001-DE01",
          serviceName: "Auftragsbearbeitung",
          allocationKeyName: "Headcount",
          recipientGroupName: "First recipient group",
        },
      },
      page,
    );
    await verifyMappingServiceRecipientExists(
      {
        financialPeriod: { name: newFinancialPeriodName },
        mappingServiceRecipient: {
          providerCompanyName: "0001-DE01",
          serviceName: "Auftragsbearbeitung",
          allocationKeyName: "Headcount",
          recipientGroupName: "First recipient group",
        },
      },
      page,
    );
  });
  test("X. Create recipient exclusion", async ({ page }) => {
    const recipientName1 = "0001-DE01";
    const serviceName1 = "Controlling Project";
    const comment1 = "Test Comment";
    const reallocatTo = "0002-DE02";

    await createRecipientExclusions(
      {
        financialPeriod: { name: newFinancialPeriodName },
        recipientExclusion: {
          recipientNames: [recipientName1],
          serviceNames: ["0001-DE01-Direct_Controlling Project"],
          reallocateToText: reallocatTo,
          comment: comment1,
        },
      },
      page,
    );

    await verifyRecipientExclusionExists(
      {
        recipientExclusion: { recipientName: recipientName1, serviceName: serviceName1 },
        financialPeriod: { name: newFinancialPeriodName },
      },
      page,
    );
  });

  test("X. Create country", async ({ page }) => {
    await createCountry(
      {
        country: {
          name: "Test country",
          iso2: "ww",
          iso3: "www",
        },
        financialPeriod: { name: newFinancialPeriodName },
      },
      page,
    );
    await verifyCountryExists(
      {
        country: {
          name: "Test country",
          iso2: "ww",
          iso3: "www",
        },
        financialPeriod: { name: newFinancialPeriodName },
      },
      page,
    );
  });
  test("X. Create company", async ({ page }) => {
    await createCompany(
      {
        company: {
          code: "test-code",
          shortName: "test shortName",
          longName: "test longName",
          comment: "test comment",
          city: "test city",
          countryName: "Afghanistan",
          companyRegion: "test region",
          businessUnit: "test business unit",
          currency: "www",
          debitorNr: "test debitor nr",
          relevanceName: TestRelevance.RELEVANT,
          segment: "test segment",
          vatNr: "test vat nr",
        },
        financialPeriod: { name: newFinancialPeriodName },
      },
      page,
    );
    await verifyCompanyExists(
      {
        company: {
          code: "test-code",
          shortName: "test shortName",
          longName: "test longName",
          comment: "test comment",
          city: "test city",
          countryName: "Afghanistan",
          companyRegion: "test region",
          businessUnit: "test business unit",
          currency: "www",
          debitorNr: "test debitor nr",
          relevanceName: TestRelevance.RELEVANT,
          segment: "test segment",
          vatNr: "test vat nr",
        },
        financialPeriod: { name: newFinancialPeriodName },
      },
      page,
    );
  });
  test("X. Create service", async ({ page }) => {
    await createService(
      {
        service: {
          name: "Test service",
          serviceType: TestServiceType.DIRECT,
          description: "Some descriptio",
          benefit: "Some benefit",
          materialNr: "Some material number",
          materialName: "Some material name",
          providerName: "0001-DE01",
        },
        financialPeriod: { name: newFinancialPeriodName },
      },
      page,
    );
    await verifyServiceExists(
      {
        service: {
          name: "Test service",
          serviceType: TestServiceType.DIRECT,
          description: "Some descriptio",
          benefit: "Some benefit",
          materialNr: "Some material number",
          materialName: "Some material name",
          providerName: "0001-DE01",
        },
        financialPeriod: { name: newFinancialPeriodName },
      },
      page,
    );
  });
  test("X. Create direct allocation", async ({ page }) => {
    await createDirectAllocation(
      {
        financialPeriod: { name: newFinancialPeriodName },
        directAllocation: {
          providerName: "0001-DE01",
          costCenterName: "10000-Group Controlling",
          employeeName: "Test employee",
          quantity: "1",
          price: "100",
          totalAmount: "100",
          recipientCompanyName: "0001-DE01",
          serviceName: "IT Project",
        },
      },
      page,
    );
    await verifyDirectAllocationExists(
      {
        financialPeriod: { name: newFinancialPeriodName },
        directAllocation: {
          providerName: "0001-DE01",
          costCenterName: "10000-Group Controlling",
          employeeName: "Test employee",
          quantity: "1",
          price: "100",
          totalAmount: "100",
          recipientCompanyName: "0001-DE01",
          serviceName: "IT Project",
        },
      },
      page,
    );
  });
  test("X. Create exclusion reason", async ({ page }) => {
    await createExclusionReason(
      {
        financialPeriod: { name: newFinancialPeriodName },
        exclusionReason: {
          name: "my reason",
          comment: "some comment",
        },
      },
      page,
    );
    await verifyExclusionReasonExists(
      {
        financialPeriod: { name: newFinancialPeriodName },
        exclusionReason: {
          name: "my reason",
          comment: "some comment",
        },
      },
      page,
    );
  });
  test("X. Create debitor mapping", async ({ page }) => {
    await createDebitorMapping(
      {
        debitorMapping: {
          debitorName: "debitor name",
          debitorCode: "debitor code",
          providerName: "0001-DE01",
          recipientName: "0002-DE02",
        },
      },
      page,
    );
    await verifyDebitorMappingExists(
      {
        debitorMapping: {
          debitorName: "debitor name",
          debitorCode: "debitor code",
          providerName: "0001-DE01",
          recipientName: "0002-DE02",
        },
      },
      page,
    );
  });
  test("X. Create order mapping", async ({ page }) => {
    await createOrderMapping(
      {
        orderMapping: {
          salesOrder: "Test sales",
          providerName: "0001-DE01",
          debitorName: "debitor code-debitor name",
        },
      },
      page,
    );
    await verifyOrderMappingExists(
      {
        orderMapping: {
          salesOrder: "Test sales",
          providerName: "0001-DE01",
          debitorName: "debitor code-debitor name",
        },
      },
      page,
    );
  });
  test("X. Create recipient cc mapping", async ({ page }) => {
    const recipientName = "0001-DE01";
    const serviceProvider = "0001-DE01";
    const serviceName = "Controlling Project";
    const serviceType = "Direct";
    await createRecipientCCMapping(
      {
        recipientCCMapping: {
          recipientName: recipientName,
          serviceType,
          serviceProvider,
          serviceName,
          costCenterCode: "cc code",
          costCenterName: "cc name",
        },
      },
      page,
    );
    await verifyRecipientCCMappingExists(
      {
        recipientCCMapping: {
          recipientName: recipientName,
          serviceType,
          serviceProvider,
          serviceName,
          costCenterCode: "cc code",
          costCenterName: "cc name",
        },
      },
      page,
    );
  });
  test("X. Create dummy material mapping", async ({ page }) => {
    await createMaterialMappings(
      {
        materialMapping: {
          providerNames: ["0001-DE01", "0002-DE02"],
          directMaterialCode: "a",
          directMaterialName: "",
          indirectMaterialCode: "b",
          indirectMaterialName: "",
        },
      },
      page,
    );
    await verifyMaterialMappingExists(
      {
        materialMapping: {
          providerName: "0001-DE01",
          directMaterialCode: "a",
          directMaterialName: "",
          indirectMaterialCode: "b",
          indirectMaterialName: "",
        },
      },
      page,
    );
    await verifyMaterialMappingExists(
      {
        materialMapping: {
          providerName: "0002-DE02",
          directMaterialCode: "a",
          directMaterialName: "",
          indirectMaterialCode: "b",
          indirectMaterialName: "",
        },
      },
      page,
    );
  });
});

test.describe("Template: Delete and verify data", () => {
  test("X. Delete bucket", async ({ page }) => {
    const name = "Bucket to test delete";
    const fiscalYear = "2020";
    await createBucket({ name, fiscalYear }, page);
    await deleteBucket({ name, fiscalYear }, page);
  });
  test("X. Delete financial period", async ({ page }) => {
    const name = "Financial period to test delete";
    await createFinancialPeriod(
      {
        financialPeriod: { name, fromMonth: Months.February, toMonth: Months.November, type: newFinancialPeriodType, orderNumber: "1" },
        bucket: { name: newBucketName, fiscalYear: newBucketYear },
      },
      page,
    );
    await deleteFinancialPeriod(
      {
        financialPeriod: { name, fromMonth: Months.February, toMonth: Months.November, type: newFinancialPeriodType, orderNumber: "1" },
        bucket: { name: newBucketName, fiscalYear: newBucketYear },
      },
      page,
    );
  });
  test("X. Delete billing period", async ({ page }) => {
    const name = "Billing period to test delete";

    await createBillingPeriod(
      {
        billingPeriod: { name, fromMonth: Months.April, toMonth: Months.August },
        financialPeriod: { name: newFinancialPeriodName },
        bucket: { name: newBucketName, fiscalYear: newBucketYear },
      },
      page,
    );
    await deleteBillingPeriod(
      {
        billingPeriod: { name, fromMonth: Months.April, toMonth: Months.August },
        financialPeriod: { name: newFinancialPeriodName },
        bucket: { name: newBucketName, fiscalYear: newBucketYear },
      },
      page,
    );
  });
});
