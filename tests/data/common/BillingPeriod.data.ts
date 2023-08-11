import { Months } from "../../../src/common/components/controls/month-range/components/MonthComponent";
import { newBillingPeriodName, newBucketName, newBucketYear, newFinancialPeriodName } from "./Common.data";

export const billingPeriod1 = {
  billingPeriod: { name: newBillingPeriodName, fromMonth: Months.February, toMonth: Months.March },
  financialPeriod: { name: newFinancialPeriodName },
  bucket: { name: newBucketName, fiscalYear: newBucketYear },
};

export const billingPeriod1Updated = {
  billingPeriod: { name: "secondary updated", fromMonth: Months.February, toMonth: Months.March },
  financialPeriod: { name: newFinancialPeriodName },
  bucket: { name: newBucketName, fiscalYear: newBucketYear },
};
export const billingPeriod2 = {
  billingPeriod: { name: "secondary", fromMonth: Months.April, toMonth: Months.May },
  financialPeriod: { name: newFinancialPeriodName },
  bucket: { name: newBucketName, fiscalYear: newBucketYear },
};
export const billingPeriod3 = {
  billingPeriod: { name: "third billing period", fromMonth: Months.June, toMonth: Months.July },
  financialPeriod: { name: newFinancialPeriodName },
  bucket: { name: newBucketName, fiscalYear: newBucketYear },
};
