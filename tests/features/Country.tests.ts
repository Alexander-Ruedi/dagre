import { expect, Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { newFinancialPeriodName } from "../data/common/Common.data";
import { frontendPath } from "../data/common/Environment.data";
import { checkRow, editRow, getDisplayedRows, setSearchText, setTableFilter } from "../usability/AGGrid";
import { deleteData, verifyRowDoesntExist } from "../usability/Delete.tests";
import { submitForm } from "../usability/Form";
import { RowData, testImport } from "../usability/Importer";
import { openFeature } from "../usability/Navigation";
import { setTextFieldByTestId } from "../usability/TextBox";

interface ImportCountryProps {
  country: {
    fileName: string;
    worksheetName: string;
    expectedRows?: number;
  };
  financialPeriod: {
    name: string;
  };
}

export const importCountry = async ({ country, financialPeriod }: ImportCountryProps, page: Page) => {
  const { worksheetName, fileName, expectedRows } = country;
  await testImport({
    page,
    routingLink: RoutingLinks.ShowCountry,
    worksheetName,
    fileName,
    expectedRows,
  });
};

interface CreateCountryFields {
  name: string;
  iso2: string;
  iso3: string;
}

interface CreateCountryProps {
  country: CreateCountryFields;
  financialPeriod: {
    name: string;
  };
}
export const createCountry = async ({ country, financialPeriod }: CreateCountryProps, page: Page) => {
  await openFeature(page, RoutingLinks.CreateCountry);

  const textFieldsFilledById: Array<keyof CreateCountryFields> = ["name", "iso2", "iso3"];

  for (const textField of textFieldsFilledById) {
    await setTextFieldByTestId(page, textField, country[textField]);
  }

  await submitForm(page, RoutingLinks.ShowCountry);
};
export const verifyCountryExists = async ({ country, financialPeriod }: CreateCountryProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCountry);

  await setSearchText(page, getSearchTerm(country));

  const expectedFirstRow: Array<RowData> = [
    { colId: "name", expectedValue: country.name },
    { colId: "iso2", expectedValue: country.iso2.toUpperCase() },
    { colId: "iso3", expectedValue: country.iso3.toUpperCase() },
    { colId: "financialPeriod.name", expectedValue: financialPeriod.name },
  ];
  const displayedRow = await getDisplayedRows(page);
  await checkRow(displayedRow, expectedFirstRow);
};

export const verifyCountryDoesntExists = async ({ country }: CreateCountryProps, page: Page) => {
  await verifyRowDoesntExist(RoutingLinks.ShowCountry, getSearchTerm(country), page);
};

const getSearchTerm = (country: CreateCountryFields) => country.name + " " + country.iso2;

interface UpdateCountryProps {
  oldCountry: CreateCountryProps;
  newCountry: CreateCountryProps;
}

export const updateCountry = async ({ oldCountry, newCountry }: UpdateCountryProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCountry);

  await setSearchText(page, getSearchTerm(oldCountry.country));

  const displayedRow = await getDisplayedRows(page);
  await expect(displayedRow).toHaveCount(1);

  await editRow(displayedRow);

  await page.waitForURL(frontendPath + RoutingLinks.EditCountry + "*");

  await setTextFieldByTestId(page, "name", newCountry.country.name);
  await setTextFieldByTestId(page, "iso2", newCountry.country.iso2);
  await setTextFieldByTestId(page, "iso3", newCountry.country.iso3);

  await submitForm(page, RoutingLinks.ShowCountry);
};

export const deleteCountry = async ({ financialPeriod, country }: CreateCountryProps, page: Page) => {
  await deleteData(RoutingLinks.ShowCountry, country.name, page);
  await verifyRowDoesntExist(RoutingLinks.ShowCountry, getSearchTerm(country), page);
};

interface BatchDeleteCountryProps {
  countryNames: Array<string>;
}
export const batchDeleteCountry = async ({ countryNames }: BatchDeleteCountryProps, page: Page) => {
  await openFeature(page, RoutingLinks.ShowCountry);

  await setTableFilter(page, 0, countryNames);

  await page.getByTestId("batchDeleteButton").click();
  await page.getByTestId("submitButton").click();
};
