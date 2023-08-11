import { CountryForm } from "../../../../../country/form/CountryForm";
import { ExclusionReasonForm } from "../../../../../exclusion-reason/form/ExclusionReasonForm";
import { MixedKeysForm } from "../../../../../indirect-allocation/mixed-keys/form/MixedKeysForm";
import { MarkUpForm } from "../../../../../mark-ups/form/MarkUpForm";
import { RecipientGroupForm } from "../../../../../recipient-groups/form/RecipientGroupForm";
import { ServiceForm } from "../../../../../services/form/ServiceForm";
import { FormModesModel } from "../../../../models/common/FormPropsModel";
import { ServiceType } from "../../../../models/common/ServiceTypeModel";
import { store } from "../../../../store/Store";
import { NavigationLinks } from "../../../table/models/TableModel";
import { ContractForm } from "../../../../../contract/form/ContractForm";

export const getCreatePopupContent = (
  table: NavigationLinks,
  handleCreated: (createdItem: any) => void,
  handleModified: (modifiedItem: any) => void,
  handleCancel: () => void,
) => {
  switch (table) {
    case NavigationLinks.Countries:
      return (
        <CountryForm mode={FormModesModel.CREATE} onCreated={handleCreated} onModified={handleModified} onCancel={handleCancel} isPopup={true} />
      );
    case NavigationLinks.ExclusionReasons:
      return (
        <ExclusionReasonForm
          mode={FormModesModel.CREATE}
          onCreated={handleCreated}
          onModified={handleModified}
          onCancel={handleCancel}
          isPopup={true}
        />
      );
    case NavigationLinks.DirectServices: {
      const companyId = store.getState().directAllocation.popup.companyId;
      return (
        <ServiceForm
          mode={FormModesModel.CREATE}
          onCreated={handleCreated}
          onModified={handleModified}
          onCancel={handleCancel}
          isPopup={true}
          serviceTypeToBeCreated={ServiceType.DIRECT}
          companyIdToBeCreated={companyId}
        />
      );
    }
    case NavigationLinks.IndirectServices: {
      const companyId = store.getState().mappingCCService.popup.companyId;
      return (
        <ServiceForm
          mode={FormModesModel.CREATE}
          onCreated={handleCreated}
          onModified={handleModified}
          onCancel={handleCancel}
          isPopup={true}
          serviceTypeToBeCreated={ServiceType.INDIRECT}
          companyIdToBeCreated={companyId}
        />
      );
    }
    case NavigationLinks.RecipientGroups:
      return (
        <RecipientGroupForm
          mode={FormModesModel.CREATE}
          onCreated={handleCreated}
          onModified={handleModified}
          onCancel={handleCancel}
          isPopup={true}
        />
      );
    case NavigationLinks.MixedAllocationKey:
      return (
        <MixedKeysForm mode={FormModesModel.CREATE} onCreated={handleCreated} onModified={handleModified} onCancel={handleCancel} isPopup={true} />
      );
    case NavigationLinks.MarkUps: {
      const mode = store.getState().markup.popup.mode;
      const id = store.getState().markup.popup.id;
      if (mode && id) {
        return <MarkUpForm mode={mode} onCreated={handleCreated} onModified={handleModified} onCancel={handleCancel} isPopup={true} id={id} />;
      }
      return <></>;
    }
    case NavigationLinks.Contracts: {
      const mode = store.getState().contract.popup.mode;
      if (mode) {
        return (
          <ContractForm mode={mode} onCreated={handleCreated} onModified={handleModified} onCancel={handleCancel} isPopup={true} id={undefined} />
        );
      }
    }
  }
};
