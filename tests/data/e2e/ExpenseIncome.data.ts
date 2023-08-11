import { newFinancialPeriodName } from "../common/Common.data";

export const e2eImportExpenseIncome = {
  expenseIncome: { fileName: "e2eExpenseIncomeData.xlsx", worksheetName: "Sheet1" },
  financialPeriod: { name: newFinancialPeriodName },
};
export const e2eVerifyExpenseIncome = {
  financialPeriod: { name: newFinancialPeriodName },
  expenseIncome: {
    companyCodeAndName: "0001-DE01",
    costCenterCodeAndName: "10000-Group Controlling",
    wbsCodeAndName: "-",
    costElementAccountAndName: "4006-Prämie Lohn/Gehalt",
    amount: "8.203,22 €",
    bookingText: "",
    passThrough: "Value-added",
    relevance: "Relevant",
    type: "Expense",
    tradingPartner: "",
  },
};
