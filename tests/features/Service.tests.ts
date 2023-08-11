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

interface ImportCompanyProps {
  service: {
    fileName: string;
    worksheetName: string;
    expectedRows?: number;
  };
  financialPeriod: {
    name: string;
  };
}

export const importService = async ({ service, financialPeriod }: ImportCompanyProps, page: Page) => {
  const { worksheetName, fileName, expectedRows } = service;

  await testImport({
    page,
    routingLink: RoutingLinks.ShowService,
    worksheetName,
    fileName,
    expectedRows,
  });
};

export enum TestServiceType {
  DIRECT = "Direct",
  INDIRECT = "Indirect",
}

interface CreateServiceFields {
  name: string;
  serviceType: TestServiceType;
  providerName: string;
  description: string;
  benefit: string;
  materialNr: string;
  materialName: string;
}
interface CreateServiceProps {
  service: CreateServiceFields;
  financialPeriod: {
    name: string;
  };
}

export const createService = async ({ service, financialPeriod }: CreateServiceProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowService);
  await page.getByTestId("createButton").click();

  const textFieldsFilledById: Array<keyof CreateServiceFields> = ["name", "description", "benefit", "materialNr", "materialName"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, service[textField]);
  }

  await setDropdownByTestId(page, "type", "Indirect", service.serviceType);
  await setComboboxByTestId(page, "providerCompany", "Please select", service.providerName);

  await submitForm(page, RoutingLinks.ShowService);
};

export const verifyServiceExists = async ({ service, financialPeriod }: CreateServiceProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowService);

  await setSearchText(page, getSearchTerm(service));

  const expectedRow: Array<RowData> = [
    { colId: "companyId", expectedValue: service.providerName },
    { colId: "name", expectedValue: service.name },
    { colId: "type", expectedValue: service.serviceType },
    { colId: "description", expectedValue: service.description },
    { colId: "benefit", expectedValue: service.benefit },
    { colId: "materialNr", expectedValue: service.materialNr },
    { colId: "materialName", expectedValue: service.materialName },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];
  const currentDataRow = await getDisplayedRows(page);
  await checkRow(currentDataRow, expectedRow);
};

export const verifyServiceDoesntExists = async ({ service }: CreateServiceProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowService, getSearchTerm(service), page);
};
const getSearchTerm = (service: CreateServiceFields) =>
  service.providerName + " " + service.name + " " + service.serviceType + " " + service.description;

export const deleteService = async ({ financialPeriod, service }: CreateServiceProps, page: Page) => {
  await deleteData(RoutingLinks.ShowService, getSearchTerm(service), page);
  await verifyRowDoesntExist(RoutingLinks.ShowService, getSearchTerm(service), page);
};

interface BatchDeleteServiceProps {
  providerNames: Array<string>;
  serviceNames: Array<string>;
}
export const batchDeleteService = async ({ providerNames, serviceNames }: BatchDeleteServiceProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowService);

  await setTableFilter(page, 0, providerNames);
  await setTableFilter(page, 1, serviceNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};

interface UpdateServiceProps {
  oldService: CreateServiceProps;
  newService: CreateServiceProps;
}
export const updateService = async ({ oldService, newService }: UpdateServiceProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowService);

  await setSearchText(page, getSearchTerm(oldService.service));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditService + "*");

  const textFieldsFilledById: Array<keyof CreateServiceFields> = ["description", "benefit", "materialNr", "materialName"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newService.service[textField]);
  }

  await submitForm(page, RoutingLinks.ShowService);
};
