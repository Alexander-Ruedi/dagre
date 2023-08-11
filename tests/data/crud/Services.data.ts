import { TestServiceType } from "../../features/Service.tests";
import { newFinancialPeriodName } from "../common/Common.data";

export const crudService1 = {
  service: {
    name: "first-service",
    serviceType: TestServiceType.INDIRECT,
    description: "Some description",
    benefit: "Some benefit",
    materialNr: "Some material number",
    materialName: "Some material name",
    providerName: "first-code-test company1",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudService1Updated = {
  service: {
    name: "first-service",
    serviceType: TestServiceType.INDIRECT,
    description: "Some description",
    benefit: "Some benefit2",
    materialNr: "Some material number2",
    materialName: "Some material name2",
    providerName: "first-code-test company1",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudService2 = {
  service: {
    name: "second-service",
    serviceType: TestServiceType.DIRECT,
    description: "Some description",
    benefit: "Some benefit",
    materialNr: "Some material number",
    materialName: "Some material name",
    providerName: "second-code-test company2",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudService3 = {
  service: {
    name: "third-service",
    serviceType: TestServiceType.INDIRECT,
    description: "Some description",
    benefit: "Some benefit",
    materialNr: "Some material number",
    materialName: "Some material name",
    providerName: "first-code-test company1",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
export const crudService4 = {
  service: {
    name: "fourth service",
    serviceType: TestServiceType.INDIRECT,
    description: "Some description",
    benefit: "Some benefit",
    materialNr: "Some material number",
    materialName: "Some material name",
    providerName: "first-code-test company1",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudService5 = {
  service: {
    name: "fifth service",
    serviceType: TestServiceType.DIRECT,
    description: "Some description",
    benefit: "Some benefit",
    materialNr: "Some material number",
    materialName: "Some material name",
    providerName: "first-code-test company1",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
export const crudService6 = {
  service: {
    name: "sixth service",
    serviceType: TestServiceType.DIRECT,
    description: "Some description",
    benefit: "Some benefit",
    materialNr: "Some material number",
    materialName: "Some material name",
    providerName: "first-code-test company1",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
