import { Company } from "../../models/CompanyModel";
import { CostCenter } from "../../models/CostCenterModel";
import { CostElement } from "../../models/CostElementModel";
import { WbsCode } from "../../models/WbsCodeModel";
import { combineCodeAndName, getCompanyCodeAndName, getCostCenterCodeAndName, getCostElementAccountAndName, getWbsCodeAndName } from "../DisplayUtil";

describe("Check 'combineCodeAndName' method", () => {
  [
    { code: "CH01", name: "CH Company", expected: "CH01-CH Company" },
    { code: "DE01", name: "DE Company", expected: "DE01-DE Company" },
    { code: "0001", name: "", expected: "0001" },
    { code: "0001", name: null, expected: "0001" },
  ].forEach(({ code, name, expected }) => {
    test(`with code '${code}' and name '${name}'`, () => {
      expect(combineCodeAndName(code, name)).toBe(expected);
    });
  });
});

describe("Check wrapper methods for 'combineCodeAndName'", () => {
  [
    { code: "CH01", name: "CH Company", expected: "CH01-CH Company" },
    { code: "DE01", name: "DE Company", expected: "DE01-DE Company" },
    { code: "0001", name: "", expected: "0001" },
    { code: "0001", name: null, expected: "0001" },
  ].forEach(({ code, name, expected }) => {
    describe(`with code '${code}' and name '${name}'`, () => {
      test("'getCompanyCodeAndName'", () => {
        const result = getCompanyCodeAndName({ code: code, longName: name } as Company);
        expect(result).toBe(expected);
      });

      test("'getCostCenterCodeAndName'", () => {
        const result = getCostCenterCodeAndName({ code: code, name: name } as CostCenter);
        expect(result).toBe(expected);
      });

      test("'getWbsCodeAndName'", () => {
        const result = getWbsCodeAndName({ code: code, name: name } as WbsCode);
        expect(result).toBe(expected);
      });

      test("'getCostElementAccountAndName'", () => {
        const result = getCostElementAccountAndName({ account: code, name: name } as CostElement);
        expect(result).toBe(expected);
      });
    });
  });

  describe(`with input: 'undefined'`, () => {
    test("'getCompanyCodeAndName'", () => {
      const result = getCompanyCodeAndName();
      expect(result).toBe("-");
    });

    test("'getCostCenterCodeAndName'", () => {
      const result = getCostCenterCodeAndName();
      expect(result).toBe("-");
    });

    test("'getWbsCodeAndName'", () => {
      const result = getWbsCodeAndName();
      expect(result).toBe("-");
    });

    test("'getCostElementAccountAndName'", () => {
      const result = getCostElementAccountAndName();
      expect(result).toBe("-");
    });
  });
});
