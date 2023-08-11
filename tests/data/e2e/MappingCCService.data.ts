import { newFinancialPeriodName } from "../common/Common.data";

export const e2eCreateMappingByPercentage = {
  financialPeriod: { name: newFinancialPeriodName },
  providerName: "0001-DE01",
  mappedPercentage: "100",
};
export const e2eVerifyMappingByPercentage = {
  financialPeriod: { name: newFinancialPeriodName },
  providerName: "0001-DE01",
  expectedPercentage: "100,00 %",
};

export const e2e1To1Mapping = {
  financialPeriod: { name: newFinancialPeriodName },
  providerNames: ["0001-DE01"],
};
