export const recipientCCMapping1 = {
  recipientCCMapping: {
    recipientName: "second-code-test company2",
    serviceType: "Indirect",
    serviceProvider: "first-code-test company1",
    serviceName: "first-service",
    costCenterCode: "cc code",
    costCenterName: "cc name",
  },
};
export const recipientCCMapping1Updated = {
  recipientCCMapping: {
    recipientName: "first-code-test company1",
    serviceType: "Direct",
    serviceProvider: "second-code-test company2",
    serviceName: "second-service",
    costCenterCode: "cc code 1",
    costCenterName: "cc name 1",
  },
};

export const recipientCCMapping2 = {
  recipientCCMapping: {
    recipientName: "second-code-test company2",
    serviceType: "Direct",
    serviceProvider: "second-code-test company2",
    serviceName: "second-service",
    costCenterCode: "cc code 2",
    costCenterName: "cc name 2",
  },
};
export const recipientCCMapping3 = {
  recipientCCMapping: {
    recipientName: "second-code-test company2",
    serviceType: "Indirect",
    serviceProvider: "first-code-test company1",
    serviceName: "third-service",
    costCenterCode: "cc code 3",
    costCenterName: "cc name 3",
  },
};

export const crudDeleteRecipientMappings = {
  providerNames: ["first-code-test company1"],
  serviceNames: ["first-service", "third-service"],
  serviceTypes: ["Indirect"],
  recipientNames: ["second-code-test company2"],
  recipientCostCenterNames: ["cc code-cc name", "cc code 3-cc name 3"],
};
