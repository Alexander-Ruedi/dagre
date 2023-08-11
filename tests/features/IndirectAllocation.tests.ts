import { Page } from "@playwright/test";
import { RoutingLinks } from "../../src/common/components/routing/data/RoutingData";
import { testImport } from "../usability/Importer";

interface ImportIndirectAllocationProps {
  indirectAllocation: {
    fileName: string;
    worksheetName: string;
    expectedRows?: number;
  };
  financialPeriod: {
    name: string;
  };
}

export const importIndirectAllocations = async ({ indirectAllocation, financialPeriod }: ImportIndirectAllocationProps, page: Page) => {
  const { worksheetName, fileName, expectedRows } = indirectAllocation;

  await testImport({
    page,
    routingLink: RoutingLinks.ShowIndirectAllocation,
    worksheetName,
    fileName,
    expectedRows,
  });
};
