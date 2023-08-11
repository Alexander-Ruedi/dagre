import { AnyAction, Dispatch } from "@reduxjs/toolkit";
import { NavigationLinks } from "../../components/table/models/TableModel";
import { setModifiedBillingPeriods, setSelectedBillingPeriod } from "../slices/billing-periods/BillingPeriodSlice";
import { setModifiedBuckets, setSelectedBucket } from "../slices/buckets/BucketSlice";
import { setModifiedCompanies, setSelectedCompany } from "../slices/company/CompanySlice";
import { setModifiedCostCenters, setSelectedCostCenter } from "../slices/cost-centers/CostCenterSlice";
import { setModifiedCostElements, setSelectedCostElement } from "../slices/cost-elements/CostElementSlice";
import { setModifiedCountries, setSelectedCountry } from "../slices/country/CountrySlice";
import { setModifiedDebitorMappings, setSelectedDebitorMapping } from "../slices/debitor-mapping/DebitorMappingSlice";
import { setModifiedDirectAllocations, setSelectedDirectAllocation } from "../slices/direct-allocations/DirectAllocationSlice";
import { setModifiedExclusionReasons, setSelectedExclusionReason } from "../slices/exclusion-reasons/ExclusionReasonSlice";
import { setModifiedExpenseIncomeDatas, setSelectedExpenseIncomeData } from "../slices/expense-income-datas/ExpenseIncomeDatasSlice";
import { setModifiedFinancialPeriods, setSelectedFinancialPeriod } from "../slices/financial-periods/FinancialPeriodSlice";
import { setModifiedMasterKeys, setSelectedMasterKey } from "../slices/indirect-allocation/MasterKeysSlice";
import { setModifiedMixedKeys, setSelectedMixedKey } from "../slices/indirect-allocation/MixedKeysSlice";
import { setModifiedMarkups, setSelectedMarkup } from "../slices/markups/MarkupSlice";
import { setModifiedMaterialMappings, setSelectedMaterialMapping } from "../slices/material-mapping/MaterialMappingSlice";
import { setModifiedOrderMappings, setSelectedOrderMapping } from "../slices/order-mapping/OrderMappingSlice";
import { setModifiedRecipientCCMappings, setSelectedRecipientCCMapping } from "../slices/recipient-cc-mapping/RecipientCCMappingSlice";
import { setModifiedRecipientExclusions, setSelectedRecipientExclusion } from "../slices/recipient-exclusions/RecipientExclusionSlice";
import { setModifiedRecipientGroups, setSelectedRecipientGroup } from "../slices/recipient-groups/RecipientGroupSlice";
import {
  setModifiedServiceRecipientMappings,
  setSelectedServiceRecipientMapping,
} from "../slices/service-recipient-mappings/ServiceRecipientMappingSlice";
import { setModifiedServices, setSelectedService } from "../slices/services/ServiceSlice";
import { setModifiedWbsCodes, setSelectedWbsCode } from "../slices/wbs-code/WbsCodeSlice";
import { setModifiedContracts, setSelectedContract } from "../slices/contracts/ContractSlice";

export const removeModified = (table: NavigationLinks, dispatch: Dispatch<AnyAction>) => {
  setModified(table, [], dispatch);
};

export const removeSelected = (table: NavigationLinks, dispatch: Dispatch<AnyAction>) => {
  setSelected(table, [], dispatch);
};

export const setSelected = (table: NavigationLinks, selectedItem: any, dispatch: Dispatch<AnyAction>) => {
  switch (table) {
    case NavigationLinks.Buckets:
      dispatch(setSelectedBucket(selectedItem));
      break;
    case NavigationLinks.FinancialPeriods:
      dispatch(setSelectedFinancialPeriod(selectedItem));
      break;
    case NavigationLinks.BillingPeriods:
      dispatch(setSelectedBillingPeriod(selectedItem));
      break;
    case NavigationLinks.Countries:
      dispatch(setSelectedCountry(selectedItem));
      break;
    case NavigationLinks.Companies:
      dispatch(setSelectedCompany(selectedItem));
      break;
    case NavigationLinks.RecipientGroups:
      dispatch(setSelectedRecipientGroup(selectedItem));
      break;
    case NavigationLinks.Services:
      dispatch(setSelectedService(selectedItem));
      break;
    case NavigationLinks.Contracts:
      dispatch(setSelectedContract(selectedItem));
      break;
    case NavigationLinks.MarkUps:
      dispatch(setSelectedMarkup(selectedItem));
      break;
    case NavigationLinks.ExpenseIncomeData:
      dispatch(setSelectedExpenseIncomeData(selectedItem));
      break;
    case NavigationLinks.CostCenters:
      dispatch(setSelectedCostCenter(selectedItem));
      break;
    case NavigationLinks.WbsCodes:
      dispatch(setSelectedWbsCode(selectedItem));
      break;
    case NavigationLinks.CostElements:
      dispatch(setSelectedCostElement(selectedItem));
      break;
    case NavigationLinks.DirectAllocations:
      dispatch(setSelectedDirectAllocation(selectedItem));
      break;
    case NavigationLinks.ExclusionReasons:
      dispatch(setSelectedExclusionReason(selectedItem));
      break;
    case NavigationLinks.MappingServicesToKeysAndRecipients:
      dispatch(setSelectedServiceRecipientMapping(selectedItem));
      break;
    case NavigationLinks.RecipientExclusions:
      dispatch(setSelectedRecipientExclusion(selectedItem));
      break;
    case NavigationLinks.MasterAllocationKey:
      dispatch(setSelectedMasterKey(selectedItem));
      break;
    case NavigationLinks.MixedAllocationKey:
      dispatch(setSelectedMixedKey(selectedItem));
      break;
    case NavigationLinks.DebitorMapping:
      dispatch(setSelectedDebitorMapping(selectedItem));
      break;
    case NavigationLinks.SalesOrderMapping:
      dispatch(setSelectedOrderMapping(selectedItem));
      break;
    case NavigationLinks.RecipientCCMapping:
      dispatch(setSelectedRecipientCCMapping(selectedItem));
      break;
    case NavigationLinks.DummyMaterialMapping:
      dispatch(setSelectedMaterialMapping(selectedItem));
      break;
  }
};

export const setModified = (table: NavigationLinks, selectedItem: any, dispatch: Dispatch<AnyAction>) => {
  switch (table) {
    case NavigationLinks.Buckets:
      dispatch(setModifiedBuckets(selectedItem));
      break;
    case NavigationLinks.FinancialPeriods:
      dispatch(setModifiedFinancialPeriods(selectedItem));
      break;
    case NavigationLinks.BillingPeriods:
      dispatch(setModifiedBillingPeriods(selectedItem));
      break;
    case NavigationLinks.Countries:
      dispatch(setModifiedCountries(selectedItem));
      break;
    case NavigationLinks.Companies:
      dispatch(setModifiedCompanies(selectedItem));
      break;
    case NavigationLinks.RecipientGroups:
      dispatch(setModifiedRecipientGroups(selectedItem));
      break;
    case NavigationLinks.Services:
      dispatch(setModifiedServices(selectedItem));
      break;
    case NavigationLinks.Contracts:
      dispatch(setModifiedContracts(selectedItem));
      break;
    case NavigationLinks.MarkUps:
      dispatch(setModifiedMarkups(selectedItem));
      break;
    case NavigationLinks.ExpenseIncomeData:
      dispatch(setModifiedExpenseIncomeDatas(selectedItem));
      break;
    case NavigationLinks.CostCenters:
      dispatch(setModifiedCostCenters(selectedItem));
      break;
    case NavigationLinks.WbsCodes:
      dispatch(setModifiedWbsCodes(selectedItem));
      break;
    case NavigationLinks.CostElements:
      dispatch(setModifiedCostElements(selectedItem));
      break;
    case NavigationLinks.DirectAllocations:
      dispatch(setModifiedDirectAllocations(selectedItem));
      break;
    case NavigationLinks.ExclusionReasons:
      dispatch(setModifiedExclusionReasons(selectedItem));
      break;
    case NavigationLinks.MappingServicesToKeysAndRecipients:
      dispatch(setModifiedServiceRecipientMappings(selectedItem));
      break;
    case NavigationLinks.RecipientExclusions:
      dispatch(setModifiedRecipientExclusions(selectedItem));
      break;
    case NavigationLinks.MasterAllocationKey:
      dispatch(setModifiedMasterKeys(selectedItem));
      break;
    case NavigationLinks.MixedAllocationKey:
      dispatch(setModifiedMixedKeys(selectedItem));
      break;
    case NavigationLinks.DebitorMapping:
      dispatch(setModifiedDebitorMappings(selectedItem));
      break;
    case NavigationLinks.SalesOrderMapping:
      dispatch(setModifiedOrderMappings(selectedItem));
      break;
    case NavigationLinks.RecipientCCMapping:
      dispatch(setModifiedRecipientCCMappings(selectedItem));
      break;
    case NavigationLinks.DummyMaterialMapping:
      dispatch(setModifiedMaterialMappings(selectedItem));
      break;
  }
};
