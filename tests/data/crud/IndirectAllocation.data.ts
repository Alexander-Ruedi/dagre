import { newFinancialPeriodName } from "../common/Common.data";

export const crudImportIndirectAllocations = {
  indirectAllocation: { fileName: "crudMasterKeys.xlsx", worksheetName: "Master Keys", expectedRows: 2 },
  financialPeriod: { name: newFinancialPeriodName },
};
