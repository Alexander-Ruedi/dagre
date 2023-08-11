import { newFinancialPeriodName } from "../common/Common.data";

export const e2eCreateMarkups = {
  markUp: {
    valueAdd: "12",
    passThrough: "2",
    serviceAndCompanyNames: ["0001-DE01-Gesundheitsmanagment", "0001-DE01-IT User Service Fee"],
    comment: "test comment",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const e2eVerifyMarkup1 = {
  markUp: {
    serviceName: "Gesundheitsmanagment",
    valueAdd: "12",
    passThrough: "2",
    comment: "test comment",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
export const e2eVerifyMarkup2 = {
  markUp: {
    serviceName: "IT User Service Fee",
    valueAdd: "12",
    passThrough: "2",
    comment: "test comment",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
