import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFinancialPeriodDisabled } from "../../store/slices/financial-periods/FinancialPeriodSlice";
import { ImportFormComponent } from "./ImportFormComponent";
import { MergeTableComponent } from "./MergeTableComponent";
import { ImportConfig } from "./models/ImportConfig";
import { ProposeResponse } from "./models/ProposeResponse";

interface ImportProps<Data, ColumnHeaders extends string> {
  config: ImportConfig<Data, ColumnHeaders>;
}

export const ImportComponent = <Data, ColumnHeaders extends string>(props: ImportProps<Data, ColumnHeaders>) => {
  const [proposeResponse, setProposeResponse] = useState<ProposeResponse<Data> | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setFinancialPeriodDisabled(proposeResponse != null));
  }, [dispatch, proposeResponse]);

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-full w-full flex flex-col grow">
        {proposeResponse == null ? (
          <div className="space-y-8 divide-y divide-gray-200 flex flex-col overflow-y-auto px-6 grow pt-5">
            <ImportFormComponent {...props.config} setProposeResponse={setProposeResponse} />
          </div>
        ) : (
          <MergeTableComponent
            periodId={proposeResponse.periodId}
            mergeProposal={proposeResponse.mergeProposal}
            colDef={props.config.previewColumns}
            navigationLink={props.config.table}
          />
        )}
      </div>
    </div>
  );
};
