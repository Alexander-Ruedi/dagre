import { NavigationLinks } from "../../../table/models/TableModel";
import { PresentationChartLineIcon } from "@heroicons/react/24/outline";

export enum NavigationDropdowns {
  financialPeriod = "Financial period",
  billingPeriod = "Billing period",
}

export interface NavigationModel {
  name: string;
  breadCrumbsName?: string;
  current: boolean;
  dropdown?: NavigationDropdowns;
  href?: any;
  mocked?: boolean;
  icon?: any;
  children?: Array<NavigationModel>;
  isNavigationLink?: boolean;
  hidden?: boolean;
}

export const navigation: Array<NavigationModel> = [
  {
    name: "Dagre",
    icon: PresentationChartLineIcon,
    current: true,
    children: [
      { name: "D3", href: "dagre-d3", current: true },
      { name: "Antv", href: "dagre-antv", current: false },
    ],
  },
];

export const categoriesWithinFinancialPeriod: Array<NavigationLinks> = [NavigationLinks.ExpenseIncomeData, NavigationLinks.CostToServiceAllocation];
export const categoriesWithinBillingPeriod: Array<NavigationLinks> = [];
export const linksWithinBucket: Array<NavigationLinks> = [NavigationLinks.FinancialPeriods];

export const linksWithinFinancialPeriod: Array<NavigationLinks> = [
  NavigationLinks.BillingPeriods,
  NavigationLinks.Countries,
  NavigationLinks.Companies,
  NavigationLinks.RecipientGroups,
  NavigationLinks.Services,
  NavigationLinks.MarkUps,
  NavigationLinks.IndirectAllocationKeys,
  NavigationLinks.ExpenseIncomeData,
  NavigationLinks.WbsCodes,
  NavigationLinks.CostElements,
  NavigationLinks.CostCenters,
  NavigationLinks.DirectAllocations,
  NavigationLinks.CostToServiceAllocation,
  NavigationLinks.ExclusionReasons,
  NavigationLinks.MappingServicesToKeysAndRecipients,
  NavigationLinks.RecipientExclusions,
  NavigationLinks.LaunchCalculation,
  NavigationLinks.AnalysisReporting,
];
export const linksWithinBillingPeriod: Array<NavigationLinks> = [
  NavigationLinks.DebitorMapping,
  NavigationLinks.SalesOrderMapping,
  NavigationLinks.RecipientCCMapping,
  NavigationLinks.DummyMaterialMapping,
  NavigationLinks.BillingFile,
];
