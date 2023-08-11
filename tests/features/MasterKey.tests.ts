import { Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, getDisplayedRows, setSearchText } from "../usability/AGGrid";
import { verifyRowDoesntExist } from "../usability/Delete.tests";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";

interface Weighting {
  masterKeyName: string;
  weightingFactor: number;
}

interface VerifyMasterKeyFields {
  masterKeyName: string;
  relativeKeyName: string;
}
interface VerifyMasterKeyProps {
  masterKey: VerifyMasterKeyFields;
  financialPeriod: {
    name: string;
  };
}

export const verifyMasterKeyExists = async ({ financialPeriod, masterKey }: VerifyMasterKeyProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowIndirectAllocation);

  await setSearchText(page.getByTestId("masterKeyTable"), getSearchTerm(masterKey));

  const expectedRow: Array<RowData> = [
    { colId: "masterAllocationKey.name", expectedValue: masterKey.masterKeyName },
    { colId: "name", expectedValue: masterKey.relativeKeyName },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];

  const masterKeyRow = await getDisplayedRows(page.getByTestId("masterKeyTable"));
  await checkRow(masterKeyRow, expectedRow);
};

export const verifyMasterKeyDoesntExists = async ({ masterKey }: VerifyMasterKeyProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowIndirectAllocation, getSearchTerm(masterKey), page.getByTestId("masterKeyTable"));
};
const getSearchTerm = (masterKey: VerifyMasterKeyFields) => masterKey.masterKeyName + " " + masterKey.relativeKeyName;
