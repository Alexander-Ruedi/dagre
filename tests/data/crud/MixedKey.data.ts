import { newFinancialPeriodName } from "../common/Common.data";

export const crudMixedKey1 = {
  financialPeriod: { name: newFinancialPeriodName },
  mixedKey: {
    name: "Example",
    masterKeys: [
      { masterKeyName: "Master_Revenues", weightingFactor: 22 },
      { masterKeyName: "Master_IT User", weightingFactor: 11 },
    ],
    comment: "some comment",
  },
};

export const crudMixedKey1Updated = {
  financialPeriod: { name: newFinancialPeriodName },
  mixedKey: {
    name: "Example",
    masterKeys: [
      { masterKeyName: "Master_Revenues", weightingFactor: 1 },
      { masterKeyName: "Master_IT User", weightingFactor: 2 },
    ],
    comment: "some other comment 12",
  },
};

export const crudMixedKey2 = {
  financialPeriod: { name: newFinancialPeriodName },
  mixedKey: {
    name: "Another mixed key",
    masterKeys: [
      { masterKeyName: "Master_Revenues", weightingFactor: 5 },
      { masterKeyName: "Master_IT User", weightingFactor: 15 },
    ],
    comment: "some other comment",
  },
};
