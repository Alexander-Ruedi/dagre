import { newBucketName, newBucketYear, newFinancialPeriodName } from "../common/Common.data";

export const e2eBillingFile = {
  bucket: { name: newBucketName, fiscalYear: newBucketYear },
  financialPeriod: { name: newFinancialPeriodName },
  billingFile: {
    salesOrder: "SO123456",
    item: "10010",
    itemType: "",
    materialNumber: "MAT0002CON",
    description: "Controlling Project",
    providerCostCenterName: "10000",
    recipientCostCenterName: "DE123457",
    quantity: "2,86",
    price: "157,34 €",
    currency: "",
    conditionType: "",
    serviceDate: "31.3.2023",
  },
};
