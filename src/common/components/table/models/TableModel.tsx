export enum NavigationLinks {
  "FinancialPeriods" = "financial-periods",
  "BillingPeriods" = "billing-periods",
  "Companies" = "companies",
  "CostCenters" = "cost-centers",
  "WbsCodes" = "wbs-codes",
  "CostElements" = "cost-elements",
  "ExpenseIncomeData" = "expense-income-datas",
  "Services" = "services",
  "Contracts" = "contracts",
  "DirectServices" = "direct-services",
  "IndirectServices" = "indirect-services",
  "Countries" = "countries",
  "RecipientGroups" = "recipient-groups",
  "RecipientGroupCompanies" = "recipient-groups",
  "MarkUps" = "markups",
  "IndirectAllocations" = "indirect-allocations",
  "IndirectAllocationKeys" = "indirect-allocations",
  "DirectAllocations" = "direct-allocations",
  "CostToServiceAllocation" = "cost-to-service-allocation",
  "MappingServicesToKeysAndRecipients" = "service-mappings",
  "RecipientExclusions" = "recipient-exclusions",
  "FxRates" = "fx-rates",
  "BillingData" = "billing-data",
  "ExclusionReasons" = "exclusion-reasons",
  "AllocationRules" = "allocation-rules",
  "AllocationRulesUpdateAbsoluteAllocation" = "allocation-rules/absolute",
  "RelativeKeys" = "indirect-allocations/relative",
  "AllocationRulesForExpenseData" = "expense-income-datas/rules",
  "LaunchCalculation" = "calculation",
  "CalculationToBe" = "calculation/to-be",
  "CalculationTrueUp" = "calculation/true-up",
  "CalculationValidation" = "financial-periods/validate",
  "AnalysisReporting" = "reporting",
  "BillingFile" = "billing-file",
  "BillingFileValidation" = "billing-periods/validate",
  "AllocationKey" = "allocation-key",
  "MixedAllocationKey" = "mixed-allocation-key",
  "MasterAllocationKey" = "master-allocation-key",
  "RelativeAllocationKey" = "relative-allocation-key",
  "UserProfileSettings" = "user-profile/settings",
  "Buckets" = "buckets",
  "Support" = "support",
  "AboutOptravis" = "about-optravis",
  "DebitorMapping" = "company-debitor-mappings",
  "SalesOrderMapping" = "sales-order-mappings",
  "RecipientCCMapping" = "cost-center-mappings",
  "DummyMaterialMapping" = "dummy-material-mappings",
  "Export" = "exports",
}

export interface TableDefinition {
  href: NavigationLinks;
  displayedColumns: DisplayedColumns;
}

export interface DisplayedColumns {
  headerName: NavigationLinks;
  field: string;
}
