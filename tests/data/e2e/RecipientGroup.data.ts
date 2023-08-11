import { newFinancialPeriodName } from "../common/Common.data";

export const e2eRecipientGroup1 = {
  recipientGroup: {
    name: "First recipient group",
    recipientCompanyCodes: ["0001"],
    comment: "test comment",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
export const e2eRecipientGroup2 = {
  recipientGroup: {
    name: "Second recipient group",
    recipientCompanyCodes: ["0002"],
    comment: "test comment2",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
