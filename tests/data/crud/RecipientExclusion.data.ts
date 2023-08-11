import { newFinancialPeriodName } from "../common/Common.data";

const recipientName1 = "first-code-test company1";
const serviceType1 = "Indirect";
const serviceName1 = "first-service";
const comment1 = "Test Comment";
const reallocatTo1 = "second-code-test company2";

export const crudCreateRecipientExclusion1 = {
  financialPeriod: { name: newFinancialPeriodName },
  recipientExclusion: {
    recipientNames: [recipientName1],
    serviceNames: [recipientName1 + "-" + serviceName1 + " (Indirect)"],
    reallocateToText: reallocatTo1,
    comment: comment1,
  },
};

export const crudVerifyRecipientExclusion1 = {
  financialPeriod: { name: newFinancialPeriodName },
  recipientExclusion: {
    recipientName: recipientName1,
    reallocateTo: reallocatTo1,
    comment: comment1,
    serviceName: serviceName1,
    serviceType: serviceType1,
  },
};

const recipientName2 = "second-code-test company2";
const serviceType2 = "Direct";
const serviceName2 = "second-service";
const reallocatTo2 = "Service provider";
export const crudCreateRecipientExclusions = {
  financialPeriod: { name: newFinancialPeriodName },
  recipientExclusion: {
    recipientNames: [recipientName2],
    serviceNames: [recipientName1 + "-" + serviceName1 + " (Indirect)", recipientName2 + "-" + serviceName2 + " (Direct)"],
    reallocateToText: reallocatTo2,
    comment: comment1,
  },
};

export const crudDeleteRecipientExclusions = {
  recipientNames: ["first-code-test company1", "second-code-test company2"],
  serviceNames: ["first-service"],
  serviceTypes: ["Indirect"],
  reallocateToNames: ["second-code-test company2", "Service provider"],
};

export const crudVerifyRecipientExclusions1 = {
  financialPeriod: { name: newFinancialPeriodName },
  recipientExclusion: {
    recipientName: "first-code-test company1",
    serviceType: "Indirect",
    serviceName: "first-service (Indirect)",
    reallocateTo: "second-code-test company2",
    comment: "Test Comment",
  },
};
export const crudVerifyRecipientExclusions2 = {
  financialPeriod: { name: newFinancialPeriodName },
  recipientExclusion: {
    recipientName: "second-code-test company2",
    serviceType: "Indirect",
    serviceName: "first-service (Indirect)",
    reallocateTo: "Sender",
    comment: "Test Comment",
  },
};
