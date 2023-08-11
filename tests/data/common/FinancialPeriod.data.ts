import { Months } from "../../../src/common/components/controls/month-range/components/MonthComponent";
import { newBucketName, newBucketYear, newFinancialPeriodName, newFinancialPeriodType } from "./Common.data";

export const financialPeriod1 = {
  financialPeriod: {
    name: newFinancialPeriodName,
    fromMonth: Months.February,
    toMonth: Months.August,
    type: newFinancialPeriodType,
    orderNumber: "1",
  },
  bucket: { name: newBucketName, fiscalYear: newBucketYear },
};
export const financialPeriod1Updated = {
  financialPeriod: {
    name: newFinancialPeriodName + " updated",
    fromMonth: Months.February,
    toMonth: Months.August,
    type: newFinancialPeriodType,
    orderNumber: "1",
  },
  bucket: { name: newBucketName, fiscalYear: newBucketYear },
};

export const financialPeriod2 = {
  financialPeriod: {
    name: "secondary",
    fromMonth: Months.September,
    toMonth: Months.November,
    type: newFinancialPeriodType,
    orderNumber: "2",
  },
  bucket: { name: newBucketName, fiscalYear: newBucketYear },
};
