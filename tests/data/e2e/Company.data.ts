import { TestRelevance } from "../../features/Company.tests";
import { newFinancialPeriodName } from "../common/Common.data";

export const e2eImportCompany = {
  company: { fileName: "e2eCountryCompany.xlsx", worksheetName: "Entities", expectedRows: 11 },
  financialPeriod: { name: newFinancialPeriodName },
};
export const e2eVerifyCompany = {
  financialPeriod: { name: newFinancialPeriodName },
  company: {
    code: "0001",
    shortName: "",
    longName: "DE01",
    countryName: "Germany",
    segment: "",
    businessUnit: "",
    companyRegion: "",
    city: "Munich",
    relevanceName: TestRelevance.RELEVANT,
    vatNr: "",
    comment: "",
    debitorNr: "",
    currency: "EUR",
  },
};
