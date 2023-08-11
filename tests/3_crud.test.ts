import { test } from "@playwright/test";
import { billingPeriod1, billingPeriod1Updated, billingPeriod2, billingPeriod3 } from "./data/common/BillingPeriod.data";
import { bucket1, bucket1Updated, bucket2, bucket3 } from "./data/common/Bucket.data";
import { financialPeriod1, financialPeriod1Updated } from "./data/common/FinancialPeriod.data";
import { crudCompany1, crudCompany1Updated, crudCompany2, crudCompany3 } from "./data/crud/Company.data";
import { crudCountry1, crudCountry1Updated, crudCountry2, crudCountry3 } from "./data/crud/Countries.data";
import {
  crudDebitorMapping1,
  crudDebitorMapping1Updated,
  crudDebitorMapping2,
  crudDebitorMapping3,
  crudDeleteDebitorMappings,
} from "./data/crud/DebitorMapping.data";
import {
  crudDeleteDirectAllocations,
  crudDirectAllocation1,
  crudDirectAllocation1Updated,
  crudDirectAllocation2,
  crudDirectAllocation3,
} from "./data/crud/DirectAllocation.data";
import {
  crudDeleteExclusionReasons,
  crudExclusionReason1,
  crudExclusionReason1Updated,
  crudExclusionReason2,
  crudExclusionReason3,
} from "./data/crud/ExclusionReason.data";
import { crudImportExpenseIncome } from "./data/crud/ExpenseIncome.data";
import { crudImportIndirectAllocations } from "./data/crud/IndirectAllocation.data";
import { crudDeleteMappingServiceRecipient, mappingServiceRecipient1, mappingServiceRecipient2 } from "./data/crud/MappingServiceRecipient.data";
import {
  crudCreateMarkup1,
  crudCreateMarkups,
  crudDeleteMarkups,
  crudMarkup1Default,
  crudMarkup1Updated,
  crudVerifyMarkup1,
  crudVerifyMarkup2,
  crudVerifyMarkup3,
} from "./data/crud/MarkUps.data";
import {
  crudCreateMaterialMapping1,
  crudCreateMaterialMappings,
  crudDeleteMaterialMappings,
  crudMaterialMapping1Updated,
  crudVerifyMaterialMapping1,
  crudVerifyMaterialMapping1Updated,
  crudVerifyMaterialMapping2,
  crudVerifyMaterialMapping3,
} from "./data/crud/MaterialMapping.data";
import { crudMixedKey1, crudMixedKey1Updated } from "./data/crud/MixedKey.data";
import { crudDeleteOrderMappings, orderMapping1, orderMapping1Updated, orderMapping2, orderMapping3 } from "./data/crud/OrderMapping.data";
import {
  crudDeleteRecipientMappings,
  recipientCCMapping1,
  recipientCCMapping1Updated,
  recipientCCMapping2,
  recipientCCMapping3,
} from "./data/crud/RecipientCCMapping.data";
import {
  crudCreateRecipientExclusion1,
  crudCreateRecipientExclusions,
  crudDeleteRecipientExclusions,
  crudVerifyRecipientExclusion1,
  crudVerifyRecipientExclusions1,
  crudVerifyRecipientExclusions2,
} from "./data/crud/RecipientExclusion.data";
import { crudRecipientGroup1, crudRecipientGroup1Updated, crudRecipientGroup2, crudRecipientGroup3 } from "./data/crud/RecipientGroup.data";
import { crudService1, crudService1Updated, crudService2, crudService3, crudService4, crudService5, crudService6 } from "./data/crud/Services.data";

import {
  batchDeleteBillingPeriod,
  createBillingPeriod,
  deleteBillingPeriod,
  updateBillingPeriod,
  verifyBillingPeriodDoesntExists,
  verifyBillingPeriodExists,
} from "./features/BillingPeriod.tests";
import { batchDeleteBuckets, createBucket, deleteBucket, updateBucket, verifyBucketDoesntExists, verifyBucketExists } from "./features/Bucket.tests";
import {
  batchDeleteCompany,
  createCompany,
  deleteCompany,
  updateCompany,
  verifyCompanyDoesntExists,
  verifyCompanyExists,
} from "./features/Company.tests";
import {
  batchDeleteCountry,
  createCountry,
  deleteCountry,
  updateCountry,
  verifyCountryDoesntExists,
  verifyCountryExists,
} from "./features/Country.tests";
import {
  batchDeleteDebitorMapping,
  createDebitorMapping,
  deleteDebitorMapping,
  updateDebitorMapping,
  verifyDebitorMappingDoesntExists,
  verifyDebitorMappingExists,
} from "./features/DebitorMapping.tests";
import {
  batchDeleteDirectAllocation,
  createDirectAllocation,
  deleteDirectAllocation,
  updateDirectAllocation,
  verifyDirectAllocationDoesntExists,
  verifyDirectAllocationExists,
} from "./features/DirectAllocation.tests";
import {
  batchDeleteExclusionReason,
  createExclusionReason,
  deleteExclusionReason,
  updateExclusionReason,
  verifyExclusionReasonDoesntExists,
  verifyExclusionReasonExists,
} from "./features/ExclusionReason.tests";
import { importExpenseIncomeData } from "./features/ExpenseIncome.tests";
import {
  createFinancialPeriod,
  deleteFinancialPeriod,
  updateFinancialPeriod,
  verifyFinancialPeriodDoesntExists,
  verifyFinancialPeriodExists,
} from "./features/FinancialPeriod.tests";
import { importIndirectAllocations } from "./features/IndirectAllocation.tests";
import {
  batchDeletMappingServiceRecipient,
  deleteMappingServiceRecipient,
  updateMappingServiceRecipient,
  verifyMappingServiceRecipientDoesntExists,
  verifyMappingServiceRecipientExists,
} from "./features/MappingServiceRecipient.tests";
import { batchDeleteMarkUps, createMarkUps, deleteMarkUp, updateMarkup, verifyMarkUpDoesntExists, verifyMarkUpExists } from "./features/MarkUp.tests";
import {
  batchDeleteMaterialMapping,
  createMaterialMappings,
  deleteMaterialMapping,
  updateMaterialMapping,
  verifyMaterialMappingDoesntExists,
  verifyMaterialMappingExists,
} from "./features/MaterialMapping.tests";
import { createMixedKey, deleteMixedKey, updateMixedKey, verifyMixedKeyDoesntExists, verifyMixedKeyExists } from "./features/MixedKey.tests";
import {
  batchDeleteOrderMapping,
  createOrderMapping,
  deleteOrderMapping,
  updateOrderMapping,
  verifyOrderMappingDoesntExists,
  verifyOrderMappingExists,
} from "./features/OrderMapping.tests";
import { createDefaultPeriods, deleteDefaultPeriods } from "./features/Periods";
import {
  batchDeleteRecipientCCMapping,
  createRecipientCCMapping,
  deleteRecipientCCMapping,
  updateRecipientCCMapping,
  verifyRecipientCCMappingDoesntExists,
  verifyRecipientCCMappingExists,
} from "./features/RecipientCCMapping.tests";
import {
  batchDeleteRecipientExclusion,
  createRecipientExclusions,
  verifyRecipientExclusionDoesntExists,
  verifyRecipientExclusionExists,
} from "./features/RecipientExclusion.tests";
import {
  batchDeleteRecipientGroup,
  createRecipientGroup,
  deleteRecipientGroup,
  updateRecipientGroup,
  verifyRecipientGroupDoesntExists,
  verifyRecipientGroupExists,
} from "./features/RecipientGroup.tests";
import {
  batchDeleteService,
  createService,
  deleteService,
  updateService,
  verifyServiceDoesntExists,
  verifyServiceExists,
} from "./features/Service.tests";

test.describe("Wipe data", () => {
  test("Delete bucket", async ({ page }) => {
    await deleteBucket(bucket1, page);
    await verifyBucketDoesntExists(bucket1, page);
  });
});

test.describe("Form tests", () => {
  test.describe("Buckets", () => {
    test("CRUD", async ({ page }) => {
      await createBucket(bucket1, page);
      await verifyBucketExists(bucket1, page);
      await updateBucket({ oldBucket: bucket1, newBucket: bucket1Updated }, page);
      await verifyBucketExists(bucket1Updated, page);
      await deleteBucket(bucket1Updated, page);
      await verifyBucketDoesntExists(bucket1Updated, page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createBucket(bucket1, page);
      await createBucket(bucket2, page);
      await createBucket(bucket3, page);
      await batchDeleteBuckets({ bucketNames: [bucket1.name, bucket2.name] }, page);
      await verifyBucketDoesntExists(bucket1, page);
      await verifyBucketDoesntExists(bucket2, page);
      await deleteBucket(bucket3, page);
    });
  });

  test.describe("Financial periods", () => {
    test("CRUD", async ({ page }) => {
      await createBucket(bucket1, page);

      await createFinancialPeriod(financialPeriod1, page);
      await verifyFinancialPeriodExists(financialPeriod1, page);
      await updateFinancialPeriod(
        {
          oldFinancialPeriod: financialPeriod1,
          newFinancialPeriod: financialPeriod1Updated,
        },
        page,
      );
      await verifyFinancialPeriodExists(financialPeriod1Updated, page);
      await deleteFinancialPeriod(financialPeriod1Updated, page);
      await verifyFinancialPeriodDoesntExists(financialPeriod1Updated, page);

      await deleteDefaultPeriods(page);
    });
  });

  test.describe("Billing periods", () => {
    test("CRUD", async ({ page }) => {
      await createBucket(bucket1, page);
      await createFinancialPeriod(financialPeriod1, page);

      await createBillingPeriod(billingPeriod1, page);
      await verifyBillingPeriodExists(billingPeriod1, page);
      await updateBillingPeriod(
        {
          oldBillingPeriod: billingPeriod1,
          newBillingPeriod: billingPeriod1Updated,
        },
        page,
      );
      await verifyBillingPeriodExists(billingPeriod1Updated, page);
      await deleteBillingPeriod(billingPeriod1Updated, page);
      await verifyBillingPeriodDoesntExists(billingPeriod1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createBucket(bucket1, page);
      await createFinancialPeriod(financialPeriod1, page);

      await createBillingPeriod(billingPeriod1, page);
      await createBillingPeriod(billingPeriod2, page);
      await createBillingPeriod(billingPeriod3, page);
      await batchDeleteBillingPeriod({ billingPeriodNames: [billingPeriod1.billingPeriod.name, billingPeriod2.billingPeriod.name] }, page);
      await verifyBillingPeriodDoesntExists(billingPeriod1, page);
      await verifyBillingPeriodDoesntExists(billingPeriod2, page);

      await deleteBillingPeriod(billingPeriod3, page);
      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Countries", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);

      await createCountry(crudCountry1, page);
      await verifyCountryExists(crudCountry1, page);
      await updateCountry(
        {
          oldCountry: crudCountry1,
          newCountry: crudCountry1Updated,
        },
        page,
      );
      await verifyCountryExists(crudCountry1Updated, page);
      await deleteCountry(crudCountry1Updated, page);
      await verifyCountryDoesntExists(crudCountry1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);

      await createCountry(crudCountry1, page);
      await createCountry(crudCountry2, page);
      await createCountry(crudCountry3, page);
      await batchDeleteCountry({ countryNames: [crudCountry1.country.name, crudCountry2.country.name] }, page);
      await verifyCountryDoesntExists(crudCountry1, page);
      await verifyCountryDoesntExists(crudCountry2, page);
      await deleteCountry(crudCountry3, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Companies", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);

      await createCompany(crudCompany1, page);
      await verifyCompanyExists(crudCompany1, page);
      await updateCompany(
        {
          oldCompany: crudCompany1,
          newCompany: crudCompany1Updated,
        },
        page,
      );
      await verifyCompanyExists(crudCompany1Updated, page);
      await deleteCompany(crudCompany1Updated, page);
      await verifyCompanyDoesntExists(crudCompany1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);

      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);
      await batchDeleteCompany({ companyNames: [crudCompany1.company.code, crudCompany2.company.code] }, page);
      await verifyCompanyDoesntExists(crudCompany1, page);
      await verifyCompanyDoesntExists(crudCompany2, page);
      await deleteCompany(crudCompany3, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Recipient Groups", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);

      await createRecipientGroup(crudRecipientGroup1, page);
      await verifyRecipientGroupExists(crudRecipientGroup1, page);
      await updateRecipientGroup(
        {
          oldRecipientGroup: crudRecipientGroup1,
          newRecipientGroup: crudRecipientGroup1Updated,
        },
        page,
      );
      await verifyRecipientGroupExists(crudRecipientGroup1Updated, page);
      await deleteRecipientGroup(crudRecipientGroup1Updated, page);
      await verifyRecipientGroupDoesntExists(crudRecipientGroup1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);

      await createRecipientGroup(crudRecipientGroup1, page);
      await createRecipientGroup(crudRecipientGroup2, page);
      await createRecipientGroup(crudRecipientGroup3, page);
      await batchDeleteRecipientGroup(
        { recipientGroupNames: [crudRecipientGroup1.recipientGroup.name, crudRecipientGroup2.recipientGroup.name] },
        page,
      );
      await verifyRecipientGroupDoesntExists(crudRecipientGroup1, page);
      await verifyRecipientGroupDoesntExists(crudRecipientGroup2, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Services", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);

      await createService(crudService1, page);
      await verifyServiceExists(crudService1, page);
      await updateService(
        {
          oldService: crudService1,
          newService: crudService1Updated,
        },
        page,
      );
      await verifyServiceExists(crudService1Updated, page);
      await deleteService(crudService1Updated, page);
      await verifyServiceDoesntExists(crudService1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);

      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);
      await batchDeleteService(
        {
          providerNames: [crudService1.service.providerName, crudService2.service.providerName],
          serviceNames: [crudService1.service.name, crudService2.service.name],
        },
        page,
      );
      await verifyServiceDoesntExists(crudService1, page);
      await verifyServiceDoesntExists(crudService2, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("MarkUps", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);

      await createMarkUps(crudCreateMarkup1, page);
      await verifyMarkUpExists(crudVerifyMarkup1, page);
      await updateMarkup(
        {
          oldMarkUp: crudMarkup1Default,
          newMarkUp: crudMarkup1Updated,
        },
        page,
      );
      await verifyMarkUpExists(crudMarkup1Updated, page);
      await deleteMarkUp(crudMarkup1Updated, page);
      await verifyMarkUpDoesntExists(crudMarkup1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);

      await createMarkUps(crudCreateMarkups, page);
      await batchDeleteMarkUps(crudDeleteMarkups, page);
      await verifyMarkUpDoesntExists(crudVerifyMarkup2, page);
      await verifyMarkUpDoesntExists(crudVerifyMarkup3, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Indirect allocation keys", () => {
    test("CRUD Mixed key", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);
      await importIndirectAllocations(crudImportIndirectAllocations, page);

      await createMixedKey(crudMixedKey1, page);
      await verifyMixedKeyExists(crudMixedKey1, page);
      await updateMixedKey(
        {
          oldMixedKey: crudMixedKey1,
          newMixedKey: crudMixedKey1Updated,
        },
        page,
      );
      await verifyMixedKeyExists(crudMixedKey1Updated, page);
      await deleteMixedKey(crudMixedKey1Updated, page);
      await verifyMixedKeyDoesntExists(crudMixedKey1Updated, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Expense Income", () => {
    test("Import Expense Income Data", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);

      await importExpenseIncomeData(crudImportExpenseIncome, page);

      await deleteDefaultPeriods(page);
    });
  });

  test.describe("Direct service allocation", () => {
    test("Create direct service allocation", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);
      await importIndirectAllocations(crudImportIndirectAllocations, page);
      await importExpenseIncomeData(crudImportExpenseIncome, page);

      await createDirectAllocation(crudDirectAllocation1, page);
      await verifyDirectAllocationExists(crudDirectAllocation1, page);
      await updateDirectAllocation(
        {
          oldDirectAllocation: crudDirectAllocation1,
          newDirectAllocation: crudDirectAllocation1Updated,
        },
        page,
      );
      await verifyDirectAllocationExists(crudDirectAllocation1Updated, page);
      await deleteDirectAllocation(crudDirectAllocation1Updated, page);
      await verifyDirectAllocationDoesntExists(crudDirectAllocation1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch delete Direct service allocation", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);
      await createService(crudService4, page);
      await createService(crudService5, page);
      await createService(crudService6, page);
      await importIndirectAllocations(crudImportIndirectAllocations, page);
      await importExpenseIncomeData(crudImportExpenseIncome, page);

      await createDirectAllocation(crudDirectAllocation1, page);
      await createDirectAllocation(crudDirectAllocation2, page);
      await createDirectAllocation(crudDirectAllocation3, page);
      await batchDeleteDirectAllocation(crudDeleteDirectAllocations, page);
      await verifyDirectAllocationDoesntExists(crudDirectAllocation1, page);
      await verifyDirectAllocationDoesntExists(crudDirectAllocation2, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Exclusion reasons", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);

      await createExclusionReason(crudExclusionReason1, page);
      await verifyExclusionReasonExists(crudExclusionReason1, page);
      await updateExclusionReason(
        {
          oldExclusionReason: crudExclusionReason1,
          newExclusionReason: crudExclusionReason1Updated,
        },
        page,
      );
      await verifyExclusionReasonExists(crudExclusionReason1Updated, page);
      await deleteExclusionReason(crudExclusionReason1Updated, page);
      await verifyExclusionReasonDoesntExists(crudExclusionReason1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);

      await createExclusionReason(crudExclusionReason1, page);
      await createExclusionReason(crudExclusionReason2, page);
      await createExclusionReason(crudExclusionReason3, page);
      await batchDeleteExclusionReason(crudDeleteExclusionReasons, page);
      await verifyExclusionReasonDoesntExists(crudExclusionReason1, page);
      await verifyExclusionReasonDoesntExists(crudExclusionReason2, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Indirect service-to-recipient mapping", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);
      await createService(crudService4, page);
      await createService(crudService5, page);
      await createService(crudService6, page);
      await importIndirectAllocations(crudImportIndirectAllocations, page);
      await importExpenseIncomeData(crudImportExpenseIncome, page);

      await updateMappingServiceRecipient(mappingServiceRecipient1, page);
      await verifyMappingServiceRecipientExists(mappingServiceRecipient1, page);
      await deleteMappingServiceRecipient(mappingServiceRecipient1, page);
      await verifyMappingServiceRecipientDoesntExists(mappingServiceRecipient1, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createRecipientGroup(crudRecipientGroup1, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);
      await createService(crudService4, page);
      await createService(crudService5, page);
      await createService(crudService6, page);
      await importIndirectAllocations(crudImportIndirectAllocations, page);
      await importExpenseIncomeData(crudImportExpenseIncome, page);

      await updateMappingServiceRecipient(mappingServiceRecipient1, page);
      await updateMappingServiceRecipient(mappingServiceRecipient2, page);
      await batchDeletMappingServiceRecipient(crudDeleteMappingServiceRecipient, page);
      await verifyMappingServiceRecipientDoesntExists(mappingServiceRecipient1, page);
      await verifyMappingServiceRecipientDoesntExists(mappingServiceRecipient2, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Recipient exclusions", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createService(crudService1, page);
      await createService(crudService2, page);

      await createRecipientExclusions(crudCreateRecipientExclusion1, page);
      await verifyRecipientExclusionExists(crudVerifyRecipientExclusion1, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createService(crudService1, page);
      await createService(crudService2, page);

      await createRecipientExclusions(crudCreateRecipientExclusion1, page);
      await createRecipientExclusions(crudCreateRecipientExclusions, page);
      await batchDeleteRecipientExclusion(crudDeleteRecipientExclusions, page);
      await verifyRecipientExclusionDoesntExists(crudVerifyRecipientExclusions1, page);
      await verifyRecipientExclusionDoesntExists(crudVerifyRecipientExclusions2, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Company debitor mapping", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createService(crudService1, page);
      await createService(crudService2, page);

      await createDebitorMapping(crudDebitorMapping1, page);
      await verifyDebitorMappingExists(crudDebitorMapping1, page);
      await updateDebitorMapping({ oldDebitorMapping: crudDebitorMapping1, newDebitorMapping: crudDebitorMapping1Updated }, page);
      await verifyDebitorMappingExists(crudDebitorMapping1Updated, page);
      await deleteDebitorMapping(crudDebitorMapping1Updated, page);
      await verifyDebitorMappingDoesntExists(crudDebitorMapping1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);
      await createService(crudService1, page);
      await createService(crudService2, page);

      await createDebitorMapping(crudDebitorMapping1, page);
      await createDebitorMapping(crudDebitorMapping2, page);
      await createDebitorMapping(crudDebitorMapping3, page);
      await batchDeleteDebitorMapping(crudDeleteDebitorMappings, page);
      await verifyDebitorMappingDoesntExists(crudDebitorMapping1, page);
      await verifyDebitorMappingDoesntExists(crudDebitorMapping2, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Sales order mapping", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createDebitorMapping(crudDebitorMapping1, page);
      await createDebitorMapping(crudDebitorMapping2, page);

      await createOrderMapping(orderMapping1, page);
      await verifyOrderMappingExists(orderMapping1, page);
      await updateOrderMapping({ oldOrderMapping: orderMapping1, newOrderMapping: orderMapping1Updated }, page);
      await verifyOrderMappingExists(orderMapping1Updated, page);
      await deleteOrderMapping(orderMapping1Updated, page);
      await verifyOrderMappingDoesntExists(orderMapping1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createDebitorMapping(crudDebitorMapping1, page);
      await createDebitorMapping(crudDebitorMapping2, page);
      await createDebitorMapping(crudDebitorMapping3, page);

      await createOrderMapping(orderMapping1, page);
      await createOrderMapping(orderMapping2, page);
      await createOrderMapping(orderMapping3, page);
      await batchDeleteOrderMapping(crudDeleteOrderMappings, page);
      await verifyOrderMappingDoesntExists(orderMapping1, page);
      await verifyOrderMappingDoesntExists(orderMapping2, page);

      await deleteDefaultPeriods(page);
    });
  });
  test.describe("Provider-recipient-cost center mapping", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createDebitorMapping(crudDebitorMapping1, page);
      await createDebitorMapping(crudDebitorMapping2, page);
      await createDebitorMapping(crudDebitorMapping3, page);
      await createOrderMapping(orderMapping1, page);
      await createOrderMapping(orderMapping2, page);
      await createOrderMapping(orderMapping3, page);

      await createRecipientCCMapping(recipientCCMapping1, page);
      await verifyRecipientCCMappingExists(recipientCCMapping1, page);
      await updateRecipientCCMapping({ oldRecipientCCMapping: recipientCCMapping1, newRecipientCCMapping: recipientCCMapping1Updated }, page);
      await verifyRecipientCCMappingExists(recipientCCMapping1Updated, page);
      await deleteRecipientCCMapping(recipientCCMapping1Updated, page);
      await verifyRecipientCCMappingDoesntExists(recipientCCMapping1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);
      await createService(crudService1, page);
      await createService(crudService2, page);
      await createService(crudService3, page);
      await createDebitorMapping(crudDebitorMapping1, page);
      await createDebitorMapping(crudDebitorMapping2, page);
      await createDebitorMapping(crudDebitorMapping3, page);
      await createOrderMapping(orderMapping1, page);
      await createOrderMapping(orderMapping2, page);
      await createOrderMapping(orderMapping3, page);
      await createRecipientCCMapping(recipientCCMapping1, page);
      await createRecipientCCMapping(recipientCCMapping2, page);
      await createRecipientCCMapping(recipientCCMapping3, page);

      await batchDeleteRecipientCCMapping(crudDeleteRecipientMappings, page);
      await verifyRecipientCCMappingDoesntExists(recipientCCMapping1, page);
      await verifyRecipientCCMappingDoesntExists(recipientCCMapping2, page);

      await deleteDefaultPeriods(page);
    });
  });

  test.describe("Dummy material mapping", () => {
    test("CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);

      await createMaterialMappings(crudCreateMaterialMapping1, page);
      await verifyMaterialMappingExists(crudVerifyMaterialMapping1, page);
      await updateMaterialMapping({ oldMaterialMapping: crudVerifyMaterialMapping1, newMaterialMapping: crudMaterialMapping1Updated }, page);
      await verifyMaterialMappingExists(crudMaterialMapping1Updated, page);
      await deleteMaterialMapping(crudVerifyMaterialMapping1Updated, page);
      await verifyMaterialMappingDoesntExists(crudVerifyMaterialMapping1Updated, page);

      await deleteDefaultPeriods(page);
    });
    test("Batch CRUD", async ({ page }) => {
      await createDefaultPeriods(page);
      await createCountry(crudCountry1, page);
      await createCompany(crudCompany1, page);
      await createCompany(crudCompany2, page);
      await createCompany(crudCompany3, page);

      await createMaterialMappings(crudCreateMaterialMapping1, page);
      await createMaterialMappings(crudCreateMaterialMappings, page);
      await verifyMaterialMappingExists(crudVerifyMaterialMapping2, page);
      await verifyMaterialMappingExists(crudVerifyMaterialMapping3, page);
      await batchDeleteMaterialMapping(crudDeleteMaterialMappings, page);
      await verifyMaterialMappingDoesntExists(crudVerifyMaterialMapping2, page);
      await verifyMaterialMappingDoesntExists(crudVerifyMaterialMapping3, page);

      await deleteDefaultPeriods(page);
    });
  });
});
