import { NavigationLinks } from "../../table/models/TableModel";

export interface PagesModel {
  title: string;
  singularLabel: string;
  link: NavigationLinks;
  sizeColumnToFit: boolean;
  sizeColumnAsNeeded: boolean;
  relatedDelete?: Array<string>;
}

export const pages: Array<PagesModel> = [
  {
    title: "Financial periods",
    singularLabel: "financial period",
    link: NavigationLinks.FinancialPeriods,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [
      NavigationLinks.BillingPeriods,
      NavigationLinks.Countries,
      NavigationLinks.Companies,
      NavigationLinks.RecipientGroups,
      NavigationLinks.Services,
      NavigationLinks.MarkUps,
      NavigationLinks.IndirectAllocationKeys,
      NavigationLinks.ExpenseIncomeData,
      NavigationLinks.DirectAllocations,
      NavigationLinks.CostToServiceAllocation,
      NavigationLinks.MappingServicesToKeysAndRecipients,
      NavigationLinks.RecipientExclusions,
      NavigationLinks.DebitorMapping,
      NavigationLinks.SalesOrderMapping,
      NavigationLinks.RecipientCCMapping,
      NavigationLinks.DummyMaterialMapping,
    ],
  },
  {
    title: "Billing periods",
    singularLabel: "billing period",
    link: NavigationLinks.BillingPeriods,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [
      NavigationLinks.DebitorMapping,
      NavigationLinks.SalesOrderMapping,
      NavigationLinks.RecipientCCMapping,
      NavigationLinks.DummyMaterialMapping,
    ],
  },
  {
    title: "Companies",
    singularLabel: "company",
    link: NavigationLinks.Companies,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [
      NavigationLinks.Contracts,
      NavigationLinks.RecipientGroups,
      NavigationLinks.Services,
      NavigationLinks.MarkUps,
      NavigationLinks.IndirectAllocationKeys,
      NavigationLinks.ExpenseIncomeData,
      NavigationLinks.DirectAllocations,
      NavigationLinks.CostToServiceAllocation,
      NavigationLinks.MappingServicesToKeysAndRecipients,
      NavigationLinks.RecipientExclusions,
      NavigationLinks.DebitorMapping,
      NavigationLinks.SalesOrderMapping,
      NavigationLinks.RecipientCCMapping,
      NavigationLinks.DummyMaterialMapping,
    ],
  },
  {
    title: "Recipient groups",
    singularLabel: "recipient group",
    link: NavigationLinks.RecipientGroups,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.MappingServicesToKeysAndRecipients],
  },
  {
    title: "Recipient groups",
    singularLabel: "recipient group",
    link: NavigationLinks.RecipientGroupCompanies,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.MappingServicesToKeysAndRecipients],
  },
  {
    title: "Services",
    singularLabel: "service",
    link: NavigationLinks.Services,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [
      NavigationLinks.MarkUps,
      NavigationLinks.DirectAllocations,
      NavigationLinks.MappingServicesToKeysAndRecipients,
      NavigationLinks.RecipientExclusions,
      NavigationLinks.RecipientCCMapping,
    ],
  },
  {
    title: "Contracts",
    singularLabel: "contract",
    link: NavigationLinks.Contracts,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
  },
  {
    title: "Direct services",
    singularLabel: "direct service",
    link: NavigationLinks.DirectServices,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
  },
  {
    title: "Indirect services",
    singularLabel: "indirect service",
    link: NavigationLinks.IndirectServices,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
  },
  {
    title: "Mark-ups",
    singularLabel: "mark-up",
    link: NavigationLinks.MarkUps,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: undefined,
  },
  {
    title: "Indirect allocation keys",
    singularLabel: "indirect allocation key",
    link: NavigationLinks.IndirectAllocationKeys,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
  },
  {
    title: "Direct service allocations",
    singularLabel: "direct service allocation",
    link: NavigationLinks.DirectAllocations,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: undefined,
  },
  {
    title: "Cost centers",
    singularLabel: "cost center",
    link: NavigationLinks.CostCenters,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.ExpenseIncomeData, NavigationLinks.DirectAllocations, NavigationLinks.CostToServiceAllocation],
  },
  {
    title: "WBS codes",
    singularLabel: "WBS code",
    link: NavigationLinks.WbsCodes,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.ExpenseIncomeData, NavigationLinks.DirectAllocations, NavigationLinks.CostToServiceAllocation],
  },
  {
    title: "Cost elements",
    singularLabel: "cost element",
    link: NavigationLinks.CostElements,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.ExpenseIncomeData, NavigationLinks.DirectAllocations, NavigationLinks.CostToServiceAllocation],
  },
  {
    title: "Cost & income data",
    singularLabel: "cost/income data",
    link: NavigationLinks.ExpenseIncomeData,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [
      NavigationLinks.CostCenters,
      NavigationLinks.CostElements,
      NavigationLinks.DirectAllocations,
      NavigationLinks.CostToServiceAllocation,
    ],
  },
  {
    title: "Services",
    singularLabel: "service",
    link: NavigationLinks.Services,
    sizeColumnToFit: false,
    sizeColumnAsNeeded: false,
  },
  {
    title: "Cost-to-Indirect service mapping",
    singularLabel: "cost-to-indirect service allocation",
    link: NavigationLinks.CostToServiceAllocation,
    sizeColumnToFit: false,
    sizeColumnAsNeeded: false,
  },
  {
    title: "Countries",
    singularLabel: "country",
    link: NavigationLinks.Countries,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [
      NavigationLinks.Companies,
      NavigationLinks.RecipientGroups,
      NavigationLinks.Services,
      NavigationLinks.MarkUps,
      NavigationLinks.IndirectAllocationKeys,
      NavigationLinks.ExpenseIncomeData,
      NavigationLinks.CostCenters,
      NavigationLinks.WbsCodes,
      NavigationLinks.CostElements,
      NavigationLinks.DirectAllocations,
      NavigationLinks.CostToServiceAllocation,
      NavigationLinks.MappingServicesToKeysAndRecipients,
      NavigationLinks.RecipientExclusions,
      NavigationLinks.DebitorMapping,
      NavigationLinks.SalesOrderMapping,
      NavigationLinks.RecipientCCMapping,
      NavigationLinks.DummyMaterialMapping,
    ],
  },
  {
    title: "Exclusion reasons",
    singularLabel: "exclusion reason",
    link: NavigationLinks.ExclusionReasons,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.CostToServiceAllocation],
  },
  {
    title: "Indirect service-to-Recipient mapping",
    singularLabel: "indirect service-to-recipient mapping",
    link: NavigationLinks.MappingServicesToKeysAndRecipients,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: undefined,
  },
  {
    title: "Recipient exclusions",
    singularLabel: "recipient exclusion",
    link: NavigationLinks.RecipientExclusions,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: undefined,
  },
  {
    title: "Mixed keys",
    singularLabel: "mixed key",
    link: NavigationLinks.MixedAllocationKey,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.MappingServicesToKeysAndRecipients],
  },
  {
    title: "User profile settings",
    singularLabel: "user profile settings",
    link: NavigationLinks.UserProfileSettings,
    sizeColumnToFit: false,
    sizeColumnAsNeeded: false,
  },
  {
    title: "Buckets",
    singularLabel: "bucket",
    link: NavigationLinks.Buckets,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [
      NavigationLinks.FinancialPeriods,
      NavigationLinks.BillingPeriods,
      NavigationLinks.Countries,
      NavigationLinks.Companies,
      NavigationLinks.RecipientGroups,
      NavigationLinks.Services,
      NavigationLinks.MarkUps,
      NavigationLinks.IndirectAllocationKeys,
      NavigationLinks.ExpenseIncomeData,
      NavigationLinks.DirectAllocations,
      NavigationLinks.CostToServiceAllocation,
      NavigationLinks.ExclusionReasons,
      NavigationLinks.MappingServicesToKeysAndRecipients,
      NavigationLinks.RecipientExclusions,
      NavigationLinks.DebitorMapping,
      NavigationLinks.SalesOrderMapping,
      NavigationLinks.RecipientCCMapping,
      NavigationLinks.DummyMaterialMapping,
    ],
  },
  {
    title: "Allocation rules",
    singularLabel: "allocation rule",
    link: NavigationLinks.AllocationRules,
    sizeColumnToFit: false,
    sizeColumnAsNeeded: false,
  },
  {
    title: "Master keys",
    singularLabel: "master key",
    link: NavigationLinks.MasterAllocationKey,
    sizeColumnToFit: false,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.RelativeKeys, NavigationLinks.MixedAllocationKey, NavigationLinks.MappingServicesToKeysAndRecipients],
  },
  {
    title: "Relative keys",
    singularLabel: "relative key",
    link: NavigationLinks.RelativeAllocationKey,
    sizeColumnToFit: false,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.MixedAllocationKey, NavigationLinks.MappingServicesToKeysAndRecipients],
  },
  {
    title: "Relative keys",
    singularLabel: "relative key",
    link: NavigationLinks.RelativeKeys,
    sizeColumnToFit: false,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.MixedAllocationKey, NavigationLinks.MappingServicesToKeysAndRecipients],
  },
  {
    title: "Mixed allocations",
    singularLabel: "mixed allocation",
    link: NavigationLinks.MixedAllocationKey,
    sizeColumnToFit: false,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.MappingServicesToKeysAndRecipients],
  },
  {
    title: "Company debitor mappings",
    singularLabel: "company debitor mapping",
    link: NavigationLinks.DebitorMapping,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: [NavigationLinks.SalesOrderMapping],
  },
  {
    title: "Sales order mappings",
    singularLabel: "order mapping",
    link: NavigationLinks.SalesOrderMapping,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: undefined,
  },
  {
    title: "Provider-recipient-cost center mappings",
    singularLabel: "provider-recipient-cost center mapping",
    link: NavigationLinks.RecipientCCMapping,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: undefined,
  },
  {
    title: "Dummy material mappings",
    singularLabel: "dummy material mapping",
    link: NavigationLinks.DummyMaterialMapping,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
    relatedDelete: undefined,
  },
  {
    title: "Billing file data",
    singularLabel: "billing file data",
    link: NavigationLinks.BillingFile,
    sizeColumnToFit: true,
    sizeColumnAsNeeded: false,
  },
];

export const getPageByNavigation = (href: string) => pages.filter((item) => item.link === href)[0];
