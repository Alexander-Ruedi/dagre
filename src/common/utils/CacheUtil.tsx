import { updateLastChangedBillingPeriod } from "../../billing-period/util/BillingPeriodApi";
import { updateLastChangedBucket } from "../../bucket/utils/BucketApi";
import { updateLastChangedCompany } from "../../company/util/CompanyApi";
import { updateLastChangedCountry } from "../../country/util/CountryApi";
import { updateLastChangedDebitorMapping } from "../../debitor-mapping/util/DebitorMappingApi";
import { updateLastChangedDirectAllocation } from "../../direct-allocation/utils/DirectAllocationApi";
import { updateLastChangedExclusionReason } from "../../exclusion-reason/utils/ExclusionReasonApi";
import { updateLastChangedCostCenter } from "../../expense-income-datas/page/cost-center/utils/CostCenterApi";
import { updateLastChangedCostElement } from "../../expense-income-datas/page/cost-element/utils/CostElementApi";
import { updateLastChangedWbsCode } from "../../expense-income-datas/page/wbs-code/utils/WbsCodeApi";
import { updateLastChangedExpenseIncomeData } from "../../expense-income-datas/utils/ExpenseIncomeDatasApi";
import { updateLastChangedFinancialPeriod } from "../../financial-period/util/FinancialPeriodApi";
import { updateLastChangedMasterKey } from "../../indirect-allocation/master-keys/util/MasterKeysDataUtil";
import { updateLastChangedRelativeKey } from "../../indirect-allocation/master-keys/util/RelativeKeysDataUtil";
import { updateLastChangedMixedKey } from "../../indirect-allocation/mixed-keys/util/MixedKeysDataUtil";
import { updateLastChangedCostToServiceAllocations } from "../../mapping-cc-services/utils/MappingCCServiceApi";
import { updateLastChangedServiceRecipientMapping } from "../../mapping-services-recipient/util/ServiceRecipientDataUtil";
import { updateLastChangedMarkUp } from "../../mark-ups/util/MarkUpApi";
import { updateLastChangedMaterialMapping } from "../../material-mapping/util/MaterialMappingApi";
import { updateLastChangedOrderMapping } from "../../order-mapping/util/OrderMappingApi";
import { updateLastChangedRecipientCCMapping } from "../../recipient-cc-mapping/util/RecipientCCMappingApi";
import { updateLastChangedRecipientExclusion } from "../../recipient-exclusions/utils/RecipientExclusionApi";
import { updateLastChangedRecipientGroup } from "../../recipient-groups/util/RecipientGroupApi";
import { updateLastChangedService } from "../../services/util/ServiceApi";
import { NavigationLinks } from "../components/table/models/TableModel";
import { updateLastChangedContract } from "../../contract/util/ContractApi";

export const cleanCacheSingle = (table: NavigationLinks) => {
  console.info("cleaned cache (single)", table);
  switch (table) {
    case NavigationLinks.Buckets:
      updateLastChangedBucket();
      break;
    case NavigationLinks.FinancialPeriods:
      updateLastChangedFinancialPeriod();
      break;
    case NavigationLinks.BillingPeriods:
      updateLastChangedBillingPeriod();
      break;
    case NavigationLinks.Countries:
      updateLastChangedCountry();
      updateLastChangedRecipientGroup();
      break;
    case NavigationLinks.Companies:
      updateLastChangedCompany();
      break;
    case NavigationLinks.RecipientGroups:
      updateLastChangedRecipientGroup();
      break;
    case NavigationLinks.Services:
      updateLastChangedService();
      break;
    case NavigationLinks.Contracts:
      updateLastChangedContract();
      break;
    case NavigationLinks.MarkUps:
      updateLastChangedMarkUp();
      break;
    case NavigationLinks.IndirectAllocations:
    case NavigationLinks.MixedAllocationKey:
    case NavigationLinks.MasterAllocationKey:
      updateLastChangedMasterKey();
      updateLastChangedMixedKey();
      break;
    case NavigationLinks.ExpenseIncomeData:
    case NavigationLinks.CostElements:
    case NavigationLinks.CostCenters:
    case NavigationLinks.WbsCodes:
      updateLastChangedExpenseIncomeData();
      updateLastChangedCostElement();
      updateLastChangedCostCenter();
      updateLastChangedWbsCode();
      break;
    case NavigationLinks.DirectAllocations:
      updateLastChangedDirectAllocation();
      break;
    case NavigationLinks.CostToServiceAllocation:
    case NavigationLinks.ExclusionReasons:
      updateLastChangedCostToServiceAllocations();
      updateLastChangedExclusionReason();
      break;
    case NavigationLinks.MappingServicesToKeysAndRecipients:
      updateLastChangedServiceRecipientMapping();
      break;
    case NavigationLinks.RecipientExclusions:
      updateLastChangedRecipientExclusion();
      break;
    case NavigationLinks.DebitorMapping:
      updateLastChangedDebitorMapping();
      break;
    case NavigationLinks.SalesOrderMapping:
      updateLastChangedOrderMapping();
      break;
    case NavigationLinks.RecipientCCMapping:
      updateLastChangedRecipientCCMapping();
      break;
    case NavigationLinks.DummyMaterialMapping:
      updateLastChangedMaterialMapping();
      break;
    default:
      console.warn("CACHE NOT CLEANED!", `table definition for ${table} is missing`);
  }
  // clear full cache on import
  cleanCacheCascading(table);
};

// # TODO: Rather aggressive solution to clear cache - can be optimized later
export const cleanCacheCascading = (table: NavigationLinks) => {
  console.info("cleaned cache (cascading)", table);
  switch (table) {
    case NavigationLinks.Buckets:
      updateLastChangedBucket();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.FinancialPeriods:
      updateLastChangedFinancialPeriod();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.BillingPeriods:
      updateLastChangedBillingPeriod();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.Countries:
      updateLastChangedCountry();
      updateLastChangedRecipientGroup();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.Companies:
      updateLastChangedCompany();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.RecipientGroups:
      updateLastChangedRecipientGroup();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.Contracts:
    case NavigationLinks.Services:
    case NavigationLinks.DirectAllocations:
      updateLastChangedService();
      updateLastChangedContract();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.MarkUps:
      updateLastChangedMarkUp();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.IndirectAllocations:
    case NavigationLinks.MasterAllocationKey:
    case NavigationLinks.MixedAllocationKey:
      updateLastChangedMixedKey();
      updateLastChangedMasterKey();
      updateLastChangedRelativeKey();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.ExpenseIncomeData:
    case NavigationLinks.CostElements:
    case NavigationLinks.CostCenters:
    case NavigationLinks.WbsCodes:
      updateLastChangedExpenseIncomeData();
      updateLastChangedCostElement();
      updateLastChangedCostCenter();
      updateLastChangedWbsCode();

    // eslint-disable-next-line
    case NavigationLinks.DirectAllocations:
      updateLastChangedDirectAllocation();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.CostToServiceAllocation:
    case NavigationLinks.ExclusionReasons:
      updateLastChangedCostToServiceAllocations();
      updateLastChangedExclusionReason();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.MappingServicesToKeysAndRecipients:
      updateLastChangedServiceRecipientMapping();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.RecipientExclusions:
      updateLastChangedRecipientExclusion();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.DebitorMapping:
      updateLastChangedDebitorMapping();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.SalesOrderMapping:
      updateLastChangedOrderMapping();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.RecipientCCMapping:
      updateLastChangedRecipientCCMapping();

    // eslint-disable-next-line no-fallthrough
    case NavigationLinks.DummyMaterialMapping:
      updateLastChangedMaterialMapping();
      break;

    default:
      console.warn("CASCADING CACHE NOT CLEANED!", `table definition for ${table} is missing`);
  }
};
