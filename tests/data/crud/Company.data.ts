import { TestRelevance } from "../../features/Company.tests";
import { newFinancialPeriodName } from "../common/Common.data";

export const crudCompany1 = {
  company: {
    code: "first-code",
    shortName: "company1",
    longName: "test company1",
    comment: "test company1",
    city: "test company1",
    countryName: "Test country",
    companyRegion: "test company1",
    businessUnit: "test business unit",
    currency: "www",
    debitorNr: "test debitor nr",
    relevanceName: TestRelevance.RELEVANT,
    segment: "test segment",
    vatNr: "test vat nr",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudCompany1Updated = {
  company: {
    code: "second-code-updated",
    shortName: "test company2-updated",
    longName: "test company2-updated",
    comment: "test company2-updated",
    city: "test company2-updated",
    countryName: "Test country",
    companyRegion: "test company2-updated",
    businessUnit: "test business unit",
    currency: "www",
    debitorNr: "test debitor nr",
    relevanceName: TestRelevance.RELEVANT,
    segment: "test segment",
    vatNr: "test vat nr",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
export const crudCompany2 = {
  company: {
    code: "second-code",
    shortName: "test company2",
    longName: "test company2",
    comment: "test company2",
    city: "test company2",
    countryName: "Test country",
    companyRegion: "test company2",
    businessUnit: "test business unit",
    currency: "www",
    debitorNr: "test debitor nr",
    relevanceName: TestRelevance.RELEVANT,
    segment: "test segment",
    vatNr: "test vat nr",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudCompany3 = {
  company: {
    code: "third-company",
    shortName: "test company3",
    longName: "test company3",
    comment: "test company3",
    city: "test company3",
    countryName: "Test country",
    companyRegion: "test company3",
    businessUnit: "test business unit",
    currency: "www",
    debitorNr: "test debitor nr",
    relevanceName: TestRelevance.RELEVANT,
    segment: "test segment",
    vatNr: "test vat nr",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
