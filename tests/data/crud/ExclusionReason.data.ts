import { newFinancialPeriodName } from "../common/Common.data";

export const crudExclusionReason1 = {
  financialPeriod: { name: newFinancialPeriodName },
  exclusionReason: {
    exclusionReasonName: "one reason",
    exclusionReasonComment: "some comment",
  },
};

export const crudExclusionReason1Updated = {
  financialPeriod: { name: newFinancialPeriodName },
  exclusionReason: {
    exclusionReasonName: "one reason updated",
    exclusionReasonComment: "some comment updated",
  },
};

export const crudExclusionReason2 = {
  financialPeriod: { name: newFinancialPeriodName },
  exclusionReason: {
    exclusionReasonName: "Another reason",
    exclusionReasonComment: "some comment",
  },
};

export const crudExclusionReason3 = {
  financialPeriod: { name: newFinancialPeriodName },
  exclusionReason: {
    exclusionReasonName: "Test reason",
    exclusionReasonComment: "some comment",
  },
};

export const crudDeleteExclusionReasons = {
  exclusionReasonNames: ["one reason", "Another reason"],
};
