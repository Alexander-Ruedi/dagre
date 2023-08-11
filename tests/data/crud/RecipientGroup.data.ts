import { newFinancialPeriodName } from "../common/Common.data";

export const crudRecipientGroup1 = {
  recipientGroup: {
    name: "First recipient group",
    recipientCompanyCodes: ["first-code"],
    comment: "test comment",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
export const crudRecipientGroup1Updated = {
  recipientGroup: {
    name: "First recipient group updated",
    recipientCompanyCodes: ["second-code"],
    comment: "test comment updated",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudRecipientGroup2 = {
  recipientGroup: {
    name: "second recipient group",
    recipientCompanyCodes: ["first-code"],
    comment: "test comment",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudRecipientGroup3 = {
  recipientGroup: {
    name: "third recipient group",
    recipientCompanyCodes: ["first-code"],
    comment: "test comment",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
