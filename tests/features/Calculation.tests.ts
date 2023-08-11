import { Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { frontendPath } from "../data/common/Environment.data";
import { openFeature } from "../usability/Navigation";

interface VerifyCalculationProps {
  calculation: {};
  financialPeriod: {
    name: string;
  };
  bucket: {
    name: string;
    fiscalYear: string;
  };
}

export const verifyCalculation = async ({ financialPeriod, bucket, calculation }: VerifyCalculationProps, page: Page) => {
  await page.setViewportSize({ width: 1920, height: 1080 });

  await openFeature(page, RoutingLinks.Calculation);
  await page.waitForTimeout(5000);

  await page.getByRole("button", { name: "Expand all" }).click();
};
