import { newFinancialPeriodName } from "../common/Common.data";

export const e2eImportIndirectAllocations = {
  indirectAllocation: { fileName: "e2eMasterKeys.xlsx", worksheetName: "Master Keys", expectedRows: 3 },
  financialPeriod: { name: newFinancialPeriodName },
};
export const e2eVerifyIndirectAllocation = {
  financialPeriod: { name: newFinancialPeriodName },
  masterKey: {
    masterKeyName: "Headcount",
    relativeKeyName: "Master",
  },
};
