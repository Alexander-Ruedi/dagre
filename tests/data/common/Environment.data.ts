import { RoutingLinks } from "../../../src/common/components/routing/data/RoutingData";

export const frontendPath = "http://localhost:3000";
export const frontendDefaultPath = frontendPath + RoutingLinks.ShowFinancialPeriod;
export const currentYear = new Date().getFullYear().toString();
