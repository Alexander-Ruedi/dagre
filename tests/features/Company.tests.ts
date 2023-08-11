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
  company: {
    fileName: string;
    worksheetName: string;
    expectedRows?: number;
  };
  financialPeriod: {
    name: string;
  };
}

export const importCompany = async ({ company, financialPeriod }: ImportCompanyProps, page: Page) => {
  const { worksheetName, fileName, expectedRows } = company;

  await testImport({
    page,
    routingLink: RoutingLinks.ShowCompany,
    worksheetName,
    fileName,
  });
};

export enum TestRelevance {
  RELEVANT = "Relevant",
  IRRELEVANT = "irrelevant",
}
interface CreateCompanyFields {
  code: string;
  shortName: string;
  longName: string;
  countryName: string;
  companyRegion: string;
  city: string;
  currency: string;
  debitorNr: string;
  segment: string;
  businessUnit: string;
  vatNr: string;
  comment: string;
  relevanceName: TestRelevance;
}
interface CreateCompanyProps {
  company: CreateCompanyFields;
  financialPeriod: {
    name: string;
  };
}

export const createCompany = async ({ company, financialPeriod }: CreateCompanyProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateCompany);

  const textFieldsFilledById: Array<keyof CreateCompanyFields> = [
    "code",
    "shortName",
    "longName",
    "companyRegion",
    "city",
    "currency",
    "debitorNr",
    "segment",
    "businessUnit",
    "vatNr",
    "comment",
  ];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, company[textField]);
  }

  await setComboboxByTestId(page, "country", "Please select", company.countryName);
  await setDropdownByTestId(page, "relevance", "Relevant", company.relevanceName);

  await submitForm(page, RoutingLinks.ShowCompany);
};

export const verifyCompanyExists = async ({ company, financialPeriod }: CreateCompanyProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCompany);

  await setSearchText(page, getSearchTerm(company));

  const expectedFirstRow: Array<RowData> = [
    { colId: "code", expectedValue: company.code },
    { colId: "shortName", expectedValue: company.shortName },
    { colId: "longName", expectedValue: company.longName },
    { colId: "country.name", expectedValue: company.countryName },
    { colId: "segment", expectedValue: company.segment },
    { colId: "businessUnit", expectedValue: company.businessUnit },
    { colId: "companyRegion", expectedValue: company.companyRegion },
    { colId: "city", expectedValue: company.city },
    { colId: "relevance", expectedValue: company.relevanceName },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];
  const displayedRow = await getDisplayedRows(page);

  await checkRow(displayedRow, expectedFirstRow);
};

interface UpdateCompanyProps {
  oldCompany: CreateCompanyProps;
  newCompany: CreateCompanyProps;
}
export const updateCompany = async ({ oldCompany, newCompany }: UpdateCompanyProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCompany);

  await setSearchText(page, getSearchTerm(oldCompany.company));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditCompany + "*");

  const textFieldsFilledById: Array<keyof CreateCompanyFields> = [
    "code",
    "shortName",
    "longName",
    "companyRegion",
    "city",
    "currency",
    "debitorNr",
    "segment",
    "businessUnit",
    "vatNr",
    "comment",
  ];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, newCompany.company[textField]);
  }

  await setComboboxByTestId(page, "country", "Please select", newCompany.company.countryName);
  await setDropdownByTestId(page, "relevance", "Relevant", newCompany.company.relevanceName);

  await submitForm(page, RoutingLinks.ShowCompany);
};

export const verifyCompanyDoesntExists = async ({ company }: CreateCompanyProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowCompany, getSearchTerm(company), page);
};
const getSearchTerm = (company: CreateCompanyFields) => company.code + " " + company.longName;

export const deleteCompany = async ({ financialPeriod, company }: CreateCompanyProps, page: Page) => {
  await deleteData(RoutingLinks.ShowCompany, getSearchTerm(company), page);
  await verifyRowDoesntExist(RoutingLinks.ShowCompany, getSearchTerm(company), page);
};

interface BatchDeleteCompanyProps {
  companyNames: Array<string>;
}
export const batchDeleteCompany = async ({ companyNames }: BatchDeleteCompanyProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCompany);

  await setTableFilter(page, 0, companyNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};
