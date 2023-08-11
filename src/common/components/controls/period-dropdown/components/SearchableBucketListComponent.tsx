import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ReducerModel } from "../../../../store/models/ReducerMapModel";
import { ComboboxOptionsComponent } from "./ComboboxOptionsComponent";

export interface AllBucketListProps {
  onInitialRender: (newId: string) => void;
  onClick: (newId: string) => void;
  selectedBucketId: string;
  searchTerm: string;
}
export const SearchableBucketListComponent = (props: AllBucketListProps) => {
  const allBuckets = useSelector((state: ReducerModel) => state.bucket.all);
  const coveredYears: Array<number> = allBuckets
    .map((bucket) => bucket.fiscalYear)
    .sort((yearA, yearB) => {
      return yearA > yearB ? -1 : 1;
    });

  const distinctCoveredYears = Array.from(new Set(coveredYears));

  const allBucketsByYear = distinctCoveredYears.map((fiscalYear) => {
    const bucketsWithinYear = allBuckets.filter((bucket) => bucket.fiscalYear === fiscalYear);
    return { fiscalYear, buckets: bucketsWithinYear };
  });

  useEffect(() => {
    const firstBucketIds = allBucketsByYear.map((groupedBuckets) => {
      if (groupedBuckets.buckets.length > 0) {
        return groupedBuckets.buckets[0].id;
      }
    });
    if (firstBucketIds.length !== -1) {
      !props.selectedBucketId && props.onInitialRender(firstBucketIds[0] || "");
    }
  }, [allBuckets, allBucketsByYear, props]);

  return (
    <>
      {allBucketsByYear.map((bucketByYear) => {
        return (
          <ComboboxOptionsComponent
            key={bucketByYear.fiscalYear}
            optionsLabel={bucketByYear.fiscalYear.toString()}
            onClick={props.onClick}
            items={bucketByYear.buckets
              .filter((bucket) => bucket.name.toLowerCase().includes(props.searchTerm.toLowerCase()))
              .map((bucket) => ({ id: bucket.id, label: bucket.name }))}
            selectedBucketId={props.selectedBucketId}
          />
        );
      })}
    </>
  );
};
