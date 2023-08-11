import { NodeInterface } from "./DataModels";

export interface CalculatedNode extends NodeInterface {
  sellerEdges: string[];
  buyerEdges: string[];
}
