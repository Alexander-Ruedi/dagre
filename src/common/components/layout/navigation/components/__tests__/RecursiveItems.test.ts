import { navigation, NavigationModel } from "../../data/NavigationData";
import { getDefaultOpenState } from "../utils/RecursiveItems.util";

describe("Reopen navigation", () => {
  test("On feature Financial periods", () => {
    const financialPeriodItemOfNavigationObject = findNavigationItemByName(navigation, "Period management");
    expect(financialPeriodItemOfNavigationObject).toBeDefined();
    if (financialPeriodItemOfNavigationObject) {
      const result = getDefaultOpenState(financialPeriodItemOfNavigationObject, "/financial-periods/show");
      expect(result).toBeTruthy();
    }
  });
  test("On feature Expense income data", () => {
    const inputfinancialPeriodItemOfNavigationObject = findNavigationItemByName(navigation, "Input financial period");
    const inputCostAndIncomeDataItemOfNavigationObject = findNavigationItemByName(
      inputfinancialPeriodItemOfNavigationObject?.children,
      "6 Cost & income data",
    );

    expect(inputCostAndIncomeDataItemOfNavigationObject).toBeDefined();
    if (inputCostAndIncomeDataItemOfNavigationObject) {
      const result = getDefaultOpenState(inputCostAndIncomeDataItemOfNavigationObject, "/expense-income-datas/show");
      expect(result).toBeTruthy();
    }
  });
  test("On feature Calculation", () => {
    const financialPeriodItemOfNavigationObject = findNavigationItemByName(navigation, "Calculation");
    expect(financialPeriodItemOfNavigationObject).toBeDefined();
    if (financialPeriodItemOfNavigationObject) {
      const result = getDefaultOpenState(financialPeriodItemOfNavigationObject, "/calculation/show");
      expect(result).toBeTruthy();
    }
  });
});

const findNavigationItemByName = (currentNavigation: NavigationModel | NavigationModel[] | undefined, featureName: string) =>
  (currentNavigation && Array.isArray(currentNavigation) && currentNavigation.find((item) => item.name === featureName)) || undefined;
