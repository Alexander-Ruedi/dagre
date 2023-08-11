import { newFinancialPeriodName } from "../common/Common.data";

export const crudImportExpenseIncome = {
  expenseIncome: { fileName: "crudExpenseIncomeData.xlsx", worksheetName: "Sheet1" },
  financialPeriod: { name: newFinancialPeriodName },
};
