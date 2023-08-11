import { newFinancialPeriodName } from "../common/Common.data";

export const crudDirectAllocation1 = {
  financialPeriod: { name: newFinancialPeriodName },
  directAllocation: {
    providerName: "second-code-test company2",
    costCenterName: "10000-Cost center 2",
    employeeName: "Test employee",
    quantity: "",
    price: "",
    fixedAmount: "100,00 €",
    recipientCompanyName: "first-code-test company1",
    serviceName: "second-service",
    costElementName: "-",
    quantityInfo: "",
    percentage: "",
  },
};

export const crudDirectAllocation1Updated = {
  financialPeriod: { name: newFinancialPeriodName },
  directAllocation: {
    providerName: "second-code-test company2",
    costCenterName: "10000-Cost center 2",
    employeeName: "Test employee",
    quantity: "",
    price: "",
    fixedAmount: "50,00 €",
    recipientCompanyName: "first-code-test company1",
    serviceName: "second-service",
    costElementName: "-",
    quantityInfo: "",
    percentage: "",
  },
};

export const crudDirectAllocation2 = {
  financialPeriod: { name: newFinancialPeriodName },
  directAllocation: {
    providerName: "second-code-test company2",
    costCenterName: "10000-Cost center 2",
    employeeName: "test employee 1",
    quantity: "",
    price: "",
    fixedAmount: "500,00 €",
    recipientCompanyName: "first-code-test company1",
    serviceName: "second-service",
    costElementName: "-",
    quantityInfo: "",
    percentage: "",
  },
};
export const crudDirectAllocation3 = {
  financialPeriod: { name: newFinancialPeriodName },
  directAllocation: {
    providerName: "first-code-test company1",
    costCenterName: "10000-Cost center 1",
    employeeName: "Test employee X",
    quantity: "",
    price: "",
    fixedAmount: "5,00 €",
    recipientCompanyName: "second-code-test company2",
    serviceName: "fifth service",
    costElementName: "-",
    quantityInfo: "",
    percentage: "",
  },
};

export const crudDeleteDirectAllocations = {
  providerNames: ["second-code-test company2"],
  costCenterNames: ["10000-Cost center 2"],
};
