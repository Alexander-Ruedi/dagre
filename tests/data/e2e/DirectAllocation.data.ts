import { newFinancialPeriodName } from "../common/Common.data";

export const e2eImportDirectAllocation = {
  directAllocation: { fileName: "e2eDirectAllocations.xlsx", worksheetName: "Tabelle1", expectedRows: 10 },
  financialPeriod: { name: newFinancialPeriodName },
};
export const e2eVerifyDirectAllocation = {
  directAllocation: {
    providerName: "0001-DE01",
    serviceName: "Controlling Project",
    fixedAmount: "1.500,00 €",
    price: "150,00 €",
    quantity: "10,00",
    quantityInfo: "",
    percentage: "",
    recipientCompanyName: "0002-DE02",
    costCenterName: "10000-Group Controlling",
    costElementName: "-",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const e2eDeleteDirectAllocations = [
  {
    provider: "0001-DE01",
    costCenter: "10000-Group Controlling",
    amount: "1600",
    recipient: "0003-DE03",
    serviceName: "Controlling Project",
  },
  {
    provider: "0001-DE01",
    costCenter: "10000-Group Controlling",
    amount: "1000",
    recipient: "1001-CA01",
    serviceName: "Controlling Project",
  },
  {
    provider: "0001-DE01",
    costCenter: "10001-Werbung Sponsoring",
    amount: "3000",
    recipient: "1002-FR01",
    serviceName: "Marketing Project",
  },
  {
    provider: "0001-DE01",
    costCenter: "10001-Werbung Sponsoring",
    amount: "6000",
    recipient: "1003-CH01",
    serviceName: "Marketing Project",
  },
  {
    provider: "0001-DE01",
    costCenter: "10001-Werbung Sponsoring",
    amount: "500",
    recipient: "1004-UK01",
    serviceName: "Marketing Project",
  },
  {
    provider: "0001-DE01",
    costCenter: "10047-IT-Service",
    amount: "900",
    recipient: "1005-JP01",
    serviceName: "IT Project",
  },
  {
    provider: "0001-DE01",
    costCenter: "10047-IT-Service",
    amount: "240",
    recipient: "1006-US01",
    serviceName: "IT Project",
  },
  {
    provider: "0001-DE01",
    costCenter: "10047-IT-Service",
    amount: "150",
    recipient: "1007-CN01",
    serviceName: "IT Project",
  },
  {
    provider: "0001-DE01",
    costCenter: "10047-IT-Service",
    amount: "1350",
    recipient: "1008-SG01",
    serviceName: "IT Project",
  },
];
