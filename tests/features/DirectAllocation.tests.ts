import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { setComboboxByTestId } from "../usability/Combobox";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { setDropdownByTestId } from "../usability/Dropdown";
import { submitForm } from "../usability/Form";
import { RowData, testImport } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface ImportDirectAllocationProps {
  directAllocation: {
    fileName: string;
    worksheetName: string;
  };
  financialPeriod: {
    name: string;
  };
}

export const importDirectAllocations = async ({ directAllocation, financialPeriod }: ImportDirectAllocationProps, page: Page) => {
  const { worksheetName, fileName } = directAllocation;

  await testImport({
    page,
    routingLink: RoutingLinks.ShowDirectServiceAllocation,
    worksheetName,
    fileName,
  });
};

interface CreateDirectAllocationFields {
  providerName: string;
  costCenterName: string;
  costElementName: string;
  quantityInfo: string;
  quantity: string;
  price: string;
  fixedAmount: string;
  recipientCompanyName: string;
  serviceName: string;
  percentage: string;
}

interface CreateDirectAllocationProps {
  directAllocation: CreateDirectAllocationFields;
  financialPeriod: {
    name: string;
  };
}

export const createDirectAllocation = async ({ directAllocation, financialPeriod }: CreateDirectAllocationProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateDirectServiceAllocation);

  const textFieldsFilledById: Array<keyof CreateDirectAllocationFields> = ["quantityInfo", "quantity", "price", "fixedAmount"];

  for (const textField of textFieldsFilledById) {
    if (directAllocation[textField] && directAllocation[textField] !== "") {
      await setTextFieldByTestId(page, textField, directAllocation[textField]);
    }
  }

  await setComboboxByTestId(page, "provider", "", directAllocation.providerName);
  await setComboboxByTestId(page, "costCenter", "Please select", directAllocation.costCenterName);
  if (directAllocation.costElementName && directAllocation.costElementName !== "-") {
    await setComboboxByTestId(page, "costElement", "Please select", directAllocation.costElementName);
  }
  await setComboboxByTestId(page, "recipientCompanyId", "", directAllocation.recipientCompanyName);
  await setComboboxByTestId(page, "serviceId", "Please select", directAllocation.serviceName);

  await submitForm(page, RoutingLinks.ShowDirectServiceAllocation);
};
export const verifyDirectAllocationExists = async ({ directAllocation, financialPeriod }: CreateDirectAllocationProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowDirectServiceAllocation);

  await setSearchText(page, getSearchTerm(directAllocation));

  const expectedFirstRow: Array<RowData> = [
    { colId: "providerCompanyCodeAndName", expectedValue: directAllocation.providerName },
    { colId: "providerCostCenterCodeAndName", expectedValue: directAllocation.costCenterName },
    { colId: "providerCostElement.account", expectedValue: directAllocation.costElementName },
    { colId: "allocationAmount.quantityInfo", expectedValue: directAllocation.quantityInfo },
    { colId: "allocationAmount.quantity", expectedValue: directAllocation.quantity },
    { colId: "allocationAmount.percentage", expectedValue: directAllocation.percentage },
    { colId: "allocationAmount.price", expectedValue: directAllocation.price },
    { colId: "allocationAmount.amount", expectedValue: directAllocation.fixedAmount },
    { colId: "recipientCompanyCodeAndName", expectedValue: directAllocation.recipientCompanyName },
    { colId: "serviceName", expectedValue: directAllocation.serviceName },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];
  const displayedRow = await getDisplayedRows(page);
  await checkRow(displayedRow, expectedFirstRow);
};

export const verifyDirectAllocationDoesntExists = async ({ directAllocation }: CreateDirectAllocationProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowDirectServiceAllocation, getSearchTerm(directAllocation), page);
};
const getSearchTerm = (directAllocation: CreateDirectAllocationFields) => {
  const relevantFields = [
    directAllocation.providerName,
    directAllocation.costCenterName,
    directAllocation.quantityInfo,
    directAllocation.recipientCompanyName,
    directAllocation.serviceName,
  ];
  return relevantFields.join(" ");
};

export const deleteDirectAllocation = async ({ financialPeriod, directAllocation }: CreateDirectAllocationProps, page: Page) => {
  await deleteData(RoutingLinks.ShowDirectServiceAllocation, getSearchTerm(directAllocation), page);
  await verifyRowDoesntExist(RoutingLinks.ShowDirectServiceAllocation, getSearchTerm(directAllocation), page);
};

interface BatchDeleteDirectAllocationProps {
  providerNames: Array<string>;
  costCenterNames: Array<string>;
}
export const batchDeleteDirectAllocation = async ({ providerNames, costCenterNames }: BatchDeleteDirectAllocationProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowDirectServiceAllocation);

  await setTableFilter(page, 0, providerNames);
  await setTableFilter(page, 1, costCenterNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateDirectAllocationProps {
  oldDirectAllocation: CreateDirectAllocationProps;
  newDirectAllocation: CreateDirectAllocationProps;
}
export const updateDirectAllocation = async ({ oldDirectAllocation, newDirectAllocation }: UpdateDirectAllocationProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowDirectServiceAllocation);

  await setSearchText(page, getSearchTerm(oldDirectAllocation.directAllocation));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditDirectServiceAllocation + "*");

  const textFieldsFilledById: Array<keyof CreateDirectAllocationFields> = ["quantityInfo", "quantity", "price", "fixedAmount"];

  for (const textField of textFieldsFilledById) {
    if (newDirectAllocation.directAllocation[textField] && newDirectAllocation.directAllocation[textField] !== "") {
      await setTextFieldByTestId(page, textField, newDirectAllocation.directAllocation[textField]);
    }
  }

  await setComboboxByTestId(page, "provider", "", newDirectAllocation.directAllocation.providerName);
  await setComboboxByTestId(page, "costCenter", "Please select", newDirectAllocation.directAllocation.costCenterName);
  if (newDirectAllocation.directAllocation.costElementName && newDirectAllocation.directAllocation.costElementName !== "-") {
    await setComboboxByTestId(page, "costElement", "Please select", newDirectAllocation.directAllocation.costElementName);
  }
  await setComboboxByTestId(page, "recipientCompanyId", "", newDirectAllocation.directAllocation.recipientCompanyName);
  await setComboboxByTestId(page, "serviceId", "Please select", newDirectAllocation.directAllocation.serviceName);

  await submitForm(page, RoutingLinks.ShowDirectServiceAllocation);
};
