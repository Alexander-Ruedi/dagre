import { newFinancialPeriodName } from "../common/Common.data";

export const mappingServiceRecipient1 = {
  financialPeriod: { name: newFinancialPeriodName },
  mappingServiceRecipient: {
    providerCompanyName: "first-code-test company1",
    serviceName: "first-service",
    allocationKeyName: "Master_IT User",
    recipientGroupName: "First recipient group",
  },
};
export const mappingServiceRecipient2 = {
  financialPeriod: { name: newFinancialPeriodName },
  mappingServiceRecipient: {
    providerCompanyName: "first-code-test company1",
    serviceName: "fourth service",
    allocationKeyName: "Master_Revenues",
    recipientGroupName: "All companies",
  },
};
export const mappingServiceRecipient3 = {
  financialPeriod: { name: newFinancialPeriodName },
  mappingServiceRecipient: {
    providerCompanyName: "first-code-test company1",
    serviceName: "fourth service",
    allocationKeyName: "Master_Revenues",
    recipientGroupName: "All companies",
  },
};

export const crudDeleteMappingServiceRecipient = {
  providerNames: ["first-code-test company1"],
  serviceNames: ["first-service", "fourth service"],
};
