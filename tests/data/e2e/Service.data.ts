import { TestServiceType } from "../../features/Service.tests";
import { newFinancialPeriodName } from "../common/Common.data";

export const e2eImportService = {
  service: { fileName: "e2eServices.xlsx", worksheetName: "Sheet2" },
  financialPeriod: { name: newFinancialPeriodName },
};
export const e2eVerifyService = {
  financialPeriod: { name: newFinancialPeriodName },
  service: {
    name: "Gesundheitsmanagment",
    providerName: "0001-DE01",
    materialName: "",
    materialNr: "",
    serviceType: TestServiceType.INDIRECT,
    benefit: "",
    description: "",
  },
};
