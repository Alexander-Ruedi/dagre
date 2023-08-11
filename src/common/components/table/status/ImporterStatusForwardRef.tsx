import React, { forwardRef, useImperativeHandle, useState } from "react";

export interface ImportStatusStats {
  updatedRowCount: number;
  deletedRowCount: number;
  addedRowCount: number;
  unchangedRowCount: number;
}
export interface ImportStatusBarProps {
  stats: ImportStatusStats;
}
export const ImporterStatusForwardRef = forwardRef(function ClickableStatusBarComponent(props, ref) {
  const [stats, setStats] = useState<ImportStatusStats>({ addedRowCount: 0, unchangedRowCount: 0, updatedRowCount: 0, deletedRowCount: 0 });

  useImperativeHandle(ref, () => {
    return {
      setStats,
    };
  });

  return (
    <div className="ag-status-bar-right" role="status">
      <div className="ag-status-name-value ag-status-panel ag-status-panel-total-row-count">
        <span>Create</span>:&nbsp;
        <span className="ag-status-name-value-value">{stats.addedRowCount}</span>
      </div>
      <div className="ag-status-name-value ag-status-panel ag-status-panel-filtered-row-count">
        <span>Update</span>:&nbsp;
        <span className="ag-status-name-value-value">{stats.updatedRowCount}</span>
      </div>
      <div className="ag-status-name-value ag-status-panel ag-status-panel-selected-row-count">
        <span>Delete</span>:&nbsp;
        <span className="ag-status-name-value-value">{stats.deletedRowCount}</span>
      </div>
      <div className="ag-status-name-value ag-status-panel ag-status-panel-selected-row-count">
        <span>Unchanged</span>:&nbsp;
        <span className="ag-status-name-value-value">{stats.unchangedRowCount}</span>
      </div>
    </div>
  );
});
