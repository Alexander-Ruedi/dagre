import { test } from "@playwright/test";
import { RoutingLinks } from "../src/common/components/routing/data/RoutingData";
import { billingPeriod1 } from "./data/common/BillingPeriod.data";
import { bucket1 } from "./data/common/Bucket.data";
import { newBucketName, newBucketYear, newFinancialPeriodName } from "./data/common/Common.data";
import { financialPeriod1 } from "./data/common/FinancialPeriod.data";
import { e2eBillingFile } from "./data/e2e/BillingFile.data";
import { e2eImportCompany, e2eVerifyCompany } from "./data/e2e/Company.data";
import { e2eVerifyCostCenter1, e2eVerifyCostCenter2 } from "./data/e2e/CostCenter.data";
import { e2eVerifyCostElement1, e2eVerifyCostElement2 } from "./data/e2e/CostElement.data";
import { e2eImportCountry, e2eVerifyCountry } from "./data/e2e/Country.data";
import { e2eImportDebitorMapping, e2eVerifyDebitorMapping } from "./data/e2e/DebitorMapping.data";
import { e2eDeleteDirectAllocations, e2eImportDirectAllocation, e2eVerifyDirectAllocation } from "./data/e2e/DirectAllocation.data";
import { e2eImportExpenseIncome, e2eVerifyExpenseIncome } from "./data/e2e/ExpenseIncome.data";
import { e2eImportIndirectAllocations, e2eVerifyIndirectAllocation } from "./data/e2e/IndirectAllocation.data";
import { e2e1To1Mapping, e2eCreateMappingByPercentage, e2eVerifyMappingByPercentage } from "./data/e2e/MappingCCService.data";
import { e2eCreateMarkups, e2eVerifyMarkup1, e2eVerifyMarkup2 } from "./data/e2e/MarkUp.data";
import { e2eImportMaterialMapping, e2eVerifyMaterialMapping } from "./data/e2e/MaterialMapping.data";
import { e2eImportOrderMapping, e2eVerifyOrderMapping } from "./data/e2e/OrderMapping.data";
import { e2eImportRecipientCCMapping, e2eVerifyRecipientCCMapping } from "./data/e2e/RecipientCCMapping.data";
import { e2eRecipientGroup1, e2eRecipientGroup2 } from "./data/e2e/RecipientGroup.data";
import { e2eImportService, e2eVerifyService } from "./data/e2e/Service.data";
import { e2eVerifWbsCode1, e2eVerifWbsCode2 } from "./data/e2e/WbsCode.data";
import { verifyBillingFileExists } from "./features/BillingFile.tests";
import { createBillingPeriod, verifyBillingPeriodExists } from "./features/BillingPeriod.tests";
import { createBucket, deleteBucket, verifyBucketDoesntExists, verifyBucketExists } from "./features/Bucket.tests";
import { verifyCalculation } from "./features/Calculation.tests";
import { importCompany, verifyCompanyExists } from "./features/Company.tests";
import { verifyCostCenterExists } from "./features/CostCenter.tests";
import { verifyCostElementExists } from "./features/CostElement.tests";
import { importCountry, verifyCountryExists } from "./features/Country.tests";
import { importDebitorMapping, verifyDebitorMappingExists } from "./features/DebitorMapping.tests";
import { importDirectAllocations, verifyDirectAllocationExists } from "./features/DirectAllocation.tests";
import { importExpenseIncomeData, verifyExpenseIncomeExists } from "./features/ExpenseIncome.tests";
import { createFinancialPeriod, verifyFinancialPeriodExists } from "./features/FinancialPeriod.tests";
import { importIndirectAllocations } from "./features/IndirectAllocation.tests";
import { create1To1Mapping, createMappingByPercentage, verifyMappedPercentage } from "./features/MappingCCService.tests";
import { createMarkUps, verifyMarkUpExists } from "./features/MarkUp.tests";
import { verifyMasterKeyExists } from "./features/MasterKey.tests";
import { importMaterialMapping, verifyMaterialMappingExists } from "./features/MaterialMapping.tests";
import { importOrderMapping, verifyOrderMappingExists } from "./features/OrderMapping.tests";
import { importRecipientCCMapping, verifyRecipientCCMappingExists } from "./features/RecipientCCMapping.tests";
import { createRecipientGroup, verifyRecipientGroupExists } from "./features/RecipientGroup.tests";
import { importService, verifyServiceExists } from "./features/Service.tests";
import { verifyWbsCodeExists } from "./features/WbsCode.tests";
import { batchDeleteData } from "./usability/Delete.tests";

test.describe("Import data and verify calculation results", () => {
  test.describe("Create periods", () => {
    test("1. Create bucket", async ({ page }) => {
      await createBucket(bucket1, page);
      await verifyBucketExists(bucket1, page);
    });

    test("2. Create Finanial period", async ({ page }) => {
      await createFinancialPeriod(financialPeriod1, page);
      await verifyFinancialPeriodExists(financialPeriod1, page);
    });
    test("3. Create Billing period", async ({ page }) => {
      await createBillingPeriod(billingPeriod1, page);
      await verifyBillingPeriodExists(billingPeriod1, page);
    });
  });

  test.describe("Create financial period data", () => {
    test("0. Import countries", async ({ page }) => {
      await importCountry(e2eImportCountry, page);

      await verifyCountryExists(e2eVerifyCountry, page);
    });
    test("1. Import companies", async ({ page }) => {
      await importCompany(e2eImportCompany, page);

      await verifyCompanyExists(e2eVerifyCompany, page);
    });
    test("2. Create recipient groups", async ({ page }) => {
      await createRecipientGroup(e2eRecipientGroup1, page);
      await verifyRecipientGroupExists(e2eRecipientGroup1, page);

      await createRecipientGroup(e2eRecipientGroup2, page);

      await verifyRecipientGroupExists(e2eRecipientGroup2, page);
    });
    test("3. Import services", async ({ page }) => {
      await importService(e2eImportService, page);

      await verifyServiceExists(e2eVerifyService, page);
    });

    test("4. Create markup", async ({ page }) => {
      await createMarkUps(e2eCreateMarkups, page);
      await verifyMarkUpExists(e2eVerifyMarkup1, page);
      await verifyMarkUpExists(e2eVerifyMarkup2, page);
    });
    test("5. Import indirect allocations", async ({ page }) => {
      await importIndirectAllocations(e2eImportIndirectAllocations, page);
      await verifyMasterKeyExists(e2eVerifyIndirectAllocation, page);
    });
    test.describe("6. Import cost & income data", () => {
      test("Import", async ({ page }) => {
        await importExpenseIncomeData(e2eImportExpenseIncome, page);
        await verifyExpenseIncomeExists(e2eVerifyExpenseIncome, page);
      });
      test("Verify Cost center", async ({ page }) => {
        await verifyCostCenterExists(e2eVerifyCostCenter1, page);
        await verifyCostCenterExists(e2eVerifyCostCenter2, page);
      });
      test("Verify Wbs code", async ({ page }) => {
        await verifyWbsCodeExists(e2eVerifWbsCode1, page);
        await verifyWbsCodeExists(e2eVerifWbsCode2, page);
      });
      test("Verify Cost element", async ({ page }) => {
        await verifyCostElementExists(e2eVerifyCostElement1, page);
        await verifyCostElementExists(e2eVerifyCostElement2, page);
      });
    });
    test.describe("7. Import direct service allocation", () => {
      test("7.1. Import", async ({ page }) => {
        await importDirectAllocations(e2eImportDirectAllocation, page);
        await verifyDirectAllocationExists(e2eVerifyDirectAllocation, page);
      });

      test("7.2. Delete unused", async ({ page }) => {
        const rowsToDelete = e2eDeleteDirectAllocations;
        const searchTerms = rowsToDelete.map((row) => Object.values(row).join(" "));
        await batchDeleteData(RoutingLinks.ShowDirectServiceAllocation, searchTerms, page);
      });
    });

    test.describe("8. Create cost-to-indirect-service mapping", () => {
      test("8.1 Create 1:1 mappings", async ({ page }) => {
        await create1To1Mapping(e2e1To1Mapping, page);
      });

      test("8.2 Create mapping by percentage", async ({ page, browser }) => {
        await page.setViewportSize({ width: 1920, height: 1080 });
        await createMappingByPercentage(e2eCreateMappingByPercentage, page);
        await verifyMappedPercentage(e2eVerifyMappingByPercentage, page);
      });
    });
  });

  test.describe("Create billing period data", () => {
    test("12. Import company debitor mapping", async ({ page }) => {
      await importDebitorMapping(e2eImportDebitorMapping, page);
      await verifyDebitorMappingExists(e2eVerifyDebitorMapping, page);
    });
    test("13. Import order mapping", async ({ page }) => {
      await importOrderMapping(e2eImportOrderMapping, page);
      await verifyOrderMappingExists(e2eVerifyOrderMapping, page);
    });
    test("14. Import Provider-recipient-cost center mapping", async ({ page }) => {
      await importRecipientCCMapping(e2eImportRecipientCCMapping, page);
      await verifyRecipientCCMappingExists(e2eVerifyRecipientCCMapping, page);
    });
    test("15. Import Dummy material mapping", async ({ page }) => {
      await importMaterialMapping(e2eImportMaterialMapping, page);
      await verifyMaterialMappingExists(e2eVerifyMaterialMapping, page);
    });
  });

  test.describe("Verify results", () => {
    test("Verify billing file", async ({ page }) => {
      await verifyBillingFileExists(e2eBillingFile, page);
    });

    test("Verify calculation", async ({ page }) => {
      await verifyCalculation(
        {
          bucket: { name: newBucketName, fiscalYear: newBucketYear },
          financialPeriod: { name: newFinancialPeriodName },
          calculation: {},
        },
        page,
      );
    });
  });
});
