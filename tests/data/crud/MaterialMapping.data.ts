export const crudCreateMaterialMapping1 = {
  materialMapping: {
    providerNames: ["first-code-test company1"],
    directMaterialCode: "direct code",
    directMaterialName: "direct name",
    indirectMaterialCode: "indirect code",
    indirectMaterialName: "indirect name",
  },
};

export const crudVerifyMaterialMapping1 = {
  materialMapping: {
    providerName: "first-code-test company1",
    directMaterialCode: "direct code",
    directMaterialName: "direct name",
    indirectMaterialCode: "indirect code",
    indirectMaterialName: "indirect name",
  },
};

export const crudMaterialMapping1Updated = {
  materialMapping: {
    providerName: "first-code-test company1",
    directMaterialCode: "a",
    directMaterialName: "",
    indirectMaterialCode: "b",
    indirectMaterialName: "",
  },
};
export const crudVerifyMaterialMapping1Updated = {
  materialMapping: {
    providerName: "first-code-test company1",
    directMaterialCode: "a",
    directMaterialName: "",
    indirectMaterialCode: "b",
    indirectMaterialName: "",
  },
};

export const crudCreateMaterialMappings = {
  materialMapping: {
    providerNames: ["second-code-test company2", "third-company-test company3"],
    directMaterialCode: "example0 direct code",
    directMaterialName: "example0 direct name",
    indirectMaterialCode: "example0 indirect code",
    indirectMaterialName: "example0 indirect name",
  },
};
export const crudVerifyMaterialMapping2 = {
  materialMapping: {
    providerName: "second-code-test company2",
    directMaterialCode: "example0 direct code",
    directMaterialName: "example0 direct name",
    indirectMaterialCode: "example0 indirect code",
    indirectMaterialName: "example0 indirect name",
  },
};
export const crudVerifyMaterialMapping3 = {
  materialMapping: {
    providerName: "third-company-test company3",
    directMaterialCode: "example0 direct code",
    directMaterialName: "example0 direct name",
    indirectMaterialCode: "example0 indirect code",
    indirectMaterialName: "example0 indirect name",
  },
};

export const crudDeleteMaterialMappings = {
  providerNames: ["second-code-test company2", "third-company-test company3"],
  directDummyMaterialNames: ["example0 direct code-example0 direct name"],
  indirectDummyMaterialNames: ["example0 indirect code-example0 indirect name"],
};
