import { Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { checkRow, getDisplayedRows, setSearchText } from "../usability/AGGrid";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";

interface VerifyWbsCodeFields {
  wbsCodeText: string;
  providerName: string;
  comment: string;
}

interface VerifyWbsCodeProps {
  wbsCode: VerifyWbsCodeFields;
  financialPeriod: {
    name: string;
  };
}

export const verifyWbsCodeExists = async ({ wbsCode, financialPeriod }: VerifyWbsCodeProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowWbsCode);

  await setSearchText(page, getSearchTerm(wbsCode));

  const expectedFirstRow: Array<RowData> = [
    { colId: "code", expectedValue: wbsCode.wbsCodeText },
    { colId: "companyCodeAndName", expectedValue: wbsCode.providerName },
    { colId: "comment", expectedValue: wbsCode.comment },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];
  const displayedRow = await getDisplayedRows(page);
  await checkRow(displayedRow, expectedFirstRow);
};
const getSearchTerm = (wbsCode: VerifyWbsCodeFields) => wbsCode.wbsCodeText + " " + wbsCode.providerName;
