import { newFinancialPeriodName } from "../common/Common.data";

export const crudCreateMarkup1 = {
  markUp: {
    valueAdd: "2",
    passThrough: "12",
    serviceAndCompanyNames: ["first-code-test company1-first-service"],
    comment: "test comment 123",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudVerifyMarkup1 = {
  markUp: {
    serviceName: "first-service",
    valueAdd: "2",
    passThrough: "12",
    comment: "test comment 123",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudMarkup1Default = {
  markUp: {
    valueAdd: "2",
    passThrough: "12",
    serviceName: "first-service",
    comment: "test comment 123",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudMarkup1Updated = {
  markUp: {
    valueAdd: "4",
    passThrough: "4",
    serviceName: "first-service",
    comment: "test comment 123",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
export const crudCreateMarkup2 = {
  markUp: {
    valueAdd: "4",
    passThrough: "4",
    serviceAndCompanyNames: ["first-code-test company1-third-service"],
    comment: "test comment 123",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudCreateMarkups = {
  markUp: {
    valueAdd: "4",
    passThrough: "4",
    serviceAndCompanyNames: ["first-code-test company1-first-service", "first-code-test company1-third-service"],
    comment: "test comment 123",
  },
  financialPeriod: { name: newFinancialPeriodName },
};

export const crudDeleteMarkups = {
  providerNames: ["first-code-test company1"],
  serviceNames: ["first-service", "third-service"],
};
export const crudVerifyMarkup2 = {
  markUp: {
    serviceName: "third-service",
    valueAdd: "4",
    passThrough: "4",
    comment: "test comment 123",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
export const crudVerifyMarkup3 = {
  markUp: {
    serviceName: "fourth service",
    valueAdd: "4",
    passThrough: "4",
    comment: "test comment 123",
  },
  financialPeriod: { name: newFinancialPeriodName },
};
