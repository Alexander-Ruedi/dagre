import { newFinancialPeriodName } from "../common/Common.data";

export const e2eImportCountry = {
  country: { fileName: "e2eCountryCompany.xlsx", worksheetName: "Country" },
  financialPeriod: { name: newFinancialPeriodName },
};
export const e2eVerifyCountry = { financialPeriod: { name: newFinancialPeriodName }, country: { name: "Afghanistan", iso2: "AF", iso3: "AFG" } };
