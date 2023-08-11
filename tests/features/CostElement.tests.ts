import { Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { checkRow, getDisplayedRows, setSearchText } from "../usability/AGGrid";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";

interface VerifyCostElementFields {
  costElementName: string;
  providerName: string;
  comment: string;
  relevanceText: string;
  passThroughText: string;
  expenseIncomeText: string;
}

interface VerifyCostElementProps {
  costElement: VerifyCostElementFields;
  financialPeriod: {
    name: string;
  };
}

export const verifyCostElementExists = async ({ costElement, financialPeriod }: VerifyCostElementProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCostElement);

  await setSearchText(page, getSearchTerm(costElement));

  const expectedFirstRow: Array<RowData> = [
    { colId: "account", expectedValue: costElement.costElementName },
    { colId: "companyCodeAndName", expectedValue: costElement.providerName },
    { colId: "comment", expectedValue: costElement.comment },
    { colId: "relevance", expectedValue: costElement.relevanceText },
    { colId: "passThroughState", expectedValue: costElement.passThroughText },
    { colId: "type", expectedValue: costElement.expenseIncomeText },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];
  const displayedRow = await getDisplayedRows(page);
  await checkRow(displayedRow, expectedFirstRow);
};

const getSearchTerm = (costElement: VerifyCostElementFields) => costElement.costElementName + " " + costElement.providerName;
