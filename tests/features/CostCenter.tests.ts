import { Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { checkRow, getDisplayedRows, setSearchText } from "../usability/AGGrid";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";

interface VerifyCostCenterFields {
  costCenterName: string;
  providerName: string;
  description: string;
  type1: string;
  type2: string;
  responsiblePerson: string;
  comment: string;
  relevanceText: string;
  passThroughText: string;
}

interface VerifyCostCenterProps {
  costCenter: VerifyCostCenterFields;
  financialPeriod: {
    name: string;
  };
}

export const verifyCostCenterExists = async ({ costCenter, financialPeriod }: VerifyCostCenterProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCostCenter);

  await setSearchText(page, getSearchTerm(costCenter));

  const expectedFirstRow: Array<RowData> = [
    { colId: "name", expectedValue: costCenter.costCenterName },
    { colId: "companyCodeAndName", expectedValue: costCenter.providerName },
    { colId: "description", expectedValue: costCenter.description },
    { colId: "type1", expectedValue: costCenter.type1 },
    { colId: "type2", expectedValue: costCenter.type2 },
    { colId: "responsiblePerson", expectedValue: costCenter.responsiblePerson },
    { colId: "comment", expectedValue: costCenter.comment },
    { colId: "relevance", expectedValue: costCenter.relevanceText },
    { colId: "passThroughState", expectedValue: costCenter.passThroughText },

    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];
  const displayedRow = await getDisplayedRows(page);
  await checkRow(displayedRow, expectedFirstRow);
};

const getSearchTerm = (costCenter: VerifyCostCenterFields) => costCenter.costCenterName + " " + costCenter.providerName;
