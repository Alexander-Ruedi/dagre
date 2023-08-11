import { Page } from "@playwright/test";
import { billingPeriod1 } from "../data/common/BillingPeriod.data";
import { bucket1 } from "../data/common/Bucket.data";
import { financialPeriod1 } from "../data/common/FinancialPeriod.data";
import { createBillingPeriod } from "./BillingPeriod.tests";
import { createBucket, deleteBucket } from "./Bucket.tests";
import { createFinancialPeriod } from "./FinancialPeriod.tests";

export const createDefaultPeriods = async (page: Page) => {
  await createBucket(bucket1, page);
  await createFinancialPeriod(financialPeriod1, page);
  await createBillingPeriod(billingPeriod1, page);
};
export const deleteDefaultPeriods = async (page: Page) => {
  await deleteBucket(bucket1, page);
};
