import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, getDisplayedRows, setSearchText } from "../usability/AGGrid";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";

interface VerifyBillingFileProps {
  billingFile: {
    salesOrder: string;
    item: string;
    itemType: string;
    materialNumber: string;
    description: string;
    providerCostCenterName: string;
    recipientCostCenterName: string;
    quantity: string;
    price: string;
    currency: string;
    conditionType: string;
    serviceDate: string;
  };
  financialPeriod: {
    name: string;
  };
  bucket: {
    name: string;
    fiscalYear: string;
  };
}

export const verifyBillingFileExists = async ({ financialPeriod, bucket, billingFile }: VerifyBillingFileProps, page: Page) => {
  await openFeature(page, RoutingLinks.BillingFile);
  await page.waitForTimeout(5000);

  const searchTerm = [
    billingFile.salesOrder,
    billingFile.item,
    billingFile.materialNumber,
    billingFile.providerCostCenterName,
    billingFile.recipientCostCenterName,
  ].join(" ");

  await setSearchText(page, searchTerm);

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  const expectedRow: Array<RowData> = [
    { colId: "salesOrder", expectedValue: billingFile.salesOrder },
    { colId: "item", expectedValue: billingFile.item },
    { colId: "itemType", expectedValue: billingFile.itemType },
    { colId: "materialNumber", expectedValue: billingFile.materialNumber },
    { colId: "description", expectedValue: billingFile.description },
    { colId: "providerCostCenter", expectedValue: billingFile.providerCostCenterName },
    { colId: "recipientCostCenter", expectedValue: billingFile.recipientCostCenterName },
    { colId: "quantity", expectedValue: billingFile.quantity },
    { colId: "price", expectedValue: billingFile.price },
    { colId: "currency", expectedValue: billingFile.currency },
    { colId: "conditionType", expectedValue: billingFile.conditionType },
    { colId: "serviceDate", expectedValue: billingFile.serviceDate },
  ];

  await checkRow(displayedRow, expectedRow);
};
