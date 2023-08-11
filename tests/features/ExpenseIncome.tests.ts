import { Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { verifyRowDoesntExist } from "../usability/Delete.tests";
import { RowData, testImport } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";

interface ImportExpenseIncomeProps {
  expenseIncome: {
    fileName: string;
    worksheetName: string;
    expectedRows?: number;
  };
  financialPeriod: {
    name: string;
  };
}

export const importExpenseIncomeData = async ({ expenseIncome, financialPeriod }: ImportExpenseIncomeProps, page: Page) => {
  const { worksheetName, fileName, expectedRows } = expenseIncome;
  await testImport({
    page,
    routingLink: RoutingLinks.ShowExpenseIncomeData,
    worksheetName,
    fileName,
    expectedRows,
  });
};

interface VerifyExpenseIncomeFields {
  companyCodeAndName: string;
  costCenterCodeAndName: string;
  wbsCodeAndName: string;
  costElementAccountAndName: string;
  bookingText: string;
  tradingPartner: string;
  amount: string;
  relevance: string;
  passThrough: string;
  type: string;
}
interface VerifyExpenseIncomeProps {
  expenseIncome: VerifyExpenseIncomeFields;
  financialPeriod: {
    name: string;
  };
}

export const verifyExpenseIncomeExists = async ({ expenseIncome, financialPeriod }: VerifyExpenseIncomeProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowExpenseIncomeData);

  await setSearchText(page, getSearchTerm(expenseIncome));

  const expectedFirstRow: Array<RowData> = [
    { colId: "companyCodeAndName", expectedValue: expenseIncome.companyCodeAndName },
    { colId: "costCenterCodeAndName", expectedValue: expenseIncome.costCenterCodeAndName },
    { colId: "wbsCodeAndName", expectedValue: expenseIncome.wbsCodeAndName },
    { colId: "costElementAccountAndName", expectedValue: expenseIncome.costElementAccountAndName },
    { colId: "bookingText", expectedValue: expenseIncome.bookingText },
    { colId: "tradingPartner", expectedValue: expenseIncome.tradingPartner },
    { colId: "amount", expectedValue: expenseIncome.amount },
    { colId: "relevance", expectedValue: expenseIncome.relevance },
    { colId: "passThrough", expectedValue: expenseIncome.passThrough },
    { colId: "type", expectedValue: expenseIncome.type },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];
  const displayedRow = await getDisplayedRows(page);
  await checkRow(displayedRow, expectedFirstRow);
};

export const verifyExpenseIncomeDoesntExists = async ({ expenseIncome }: VerifyExpenseIncomeProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowExpenseIncomeData, getSearchTerm(expenseIncome), page);
};
const getSearchTerm = (expenseIncome: VerifyExpenseIncomeFields) =>
  expenseIncome.companyCodeAndName + " " + expenseIncome.costCenterCodeAndName + " " + expenseIncome.costElementAccountAndName;

interface BatchDeleteExpenseIncomeProps {
  providerName: Array<string>;
  costCenterName: Array<string>;
  costElementName: Array<string>;
}
export const batchDeleteExpenseIncome = async ({ providerName, costCenterName, costElementName }: BatchDeleteExpenseIncomeProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowExpenseIncomeData);

  await setTableFilter(page, 0, providerName);
  await setTableFilter(page, 1, costCenterName);
  await setTableFilter(page, 3, costElementName);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};
