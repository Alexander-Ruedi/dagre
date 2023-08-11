export interface MaterialMappingPreviewModel {
  billingPeriodId: string;
  providerCompanyId: string;
  providerCompanyCode: string;
  providerCompanyName: string;
  directMaterialNumber: string;
  directMaterialName?: string | null;
  indirectMaterialNumber: string;
  indirectMaterialName?: string | null;
}
