import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { setComboboxByTestId } from "../usability/Combobox";
import { deleteData } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";

interface UpdateMappingServiceRecipientFields {
  providerCompanyName: string;
  serviceName: string;
  allocationKeyName: string;
  recipientGroupName: string;
}
interface UpdateMappingServiceRecipientProps {
  mappingServiceRecipient: UpdateMappingServiceRecipientFields;
  financialPeriod: {
    name: string;
  };
}

export const updateMappingServiceRecipient = async ({ mappingServiceRecipient, financialPeriod }: UpdateMappingServiceRecipientProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowServiceMapping);

  await setSearchText(page, getSearchTerm(mappingServiceRecipient));

  const currentDataRow = await getDisplayedRows(page);
  await expect(currentDataRow).toBeVisible();

  await editRow(currentDataRow);

  await setComboboxByTestId(page, "allocationKeyField", "Please select", mappingServiceRecipient.allocationKeyName);
  await setComboboxByTestId(page, "recipientGroupField", "Please select", mappingServiceRecipient.recipientGroupName);

  await submitForm(page, RoutingLinks.ShowServiceMapping);
};
export const verifyMappingServiceRecipientExists = async (
  { mappingServiceRecipient, financialPeriod }: UpdateMappingServiceRecipientProps,
  page: Page,
) => {
  await openFeature(page, RoutingLinks.ShowServiceMapping);

  await setSearchText(page, getSearchTerm(mappingServiceRecipient));

  const displayedRows = await getDisplayedRows(page);
  await expect(displayedRows).toHaveCount(1);

  const expectedRow: Array<RowData> = [
    { colId: "allocationKey", expectedValue: mappingServiceRecipient.allocationKeyName },
    { colId: "recipientGroup.name", expectedValue: mappingServiceRecipient.recipientGroupName },
  ];

  await checkRow(displayedRows, expectedRow);
};

export const verifyMappingServiceRecipientDoesntExists = async ({ mappingServiceRecipient }: UpdateMappingServiceRecipientProps, page: Page) => {
  await setSearchText(page, getSearchTerm(mappingServiceRecipient));

  const displayedRows = await getDisplayedRows(page);
  await expect(displayedRows).toHaveCount(1);

  const allocationKeyCell = await displayedRows.locator(".ag-cell[col-id='allocationKey']");
  const recipientGroupCell = await displayedRows.locator(".ag-cell[col-id='recipientGroup.name']");

  await expect(allocationKeyCell).not.toHaveText(mappingServiceRecipient.allocationKeyName);
  await expect(recipientGroupCell).not.toHaveText(mappingServiceRecipient.recipientGroupName);
};
const getSearchTerm = (mappingServiceRecipient: UpdateMappingServiceRecipientFields) =>
  mappingServiceRecipient.providerCompanyName + " " + mappingServiceRecipient.serviceName;

export const deleteMappingServiceRecipient = async ({ financialPeriod, mappingServiceRecipient }: UpdateMappingServiceRecipientProps, page: Page) => {
  await deleteData(RoutingLinks.ShowServiceMapping, getSearchTerm(mappingServiceRecipient), page);
  await verifyMappingServiceRecipientDoesntExists({ mappingServiceRecipient, financialPeriod }, page);
};

interface BatchDeleteMappingServiceRecipientProps {
  providerNames: Array<string>;
  serviceNames: Array<string>;
}
export const batchDeletMappingServiceRecipient = async ({ providerNames, serviceNames }: BatchDeleteMappingServiceRecipientProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowServiceMapping);

  await setTableFilter(page, 0, providerNames);
  await setTableFilter(page, 1, serviceNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};
