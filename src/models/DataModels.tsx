export interface NodeInterface {
  id: string;
  label: string;
  type: "ENTITY" | "UNKNOWN";
  salesOutbound: number;
  salesInbound: number;
  marginPercentOutbound?: number;
  marginPercentInbound?: number;
}
export interface EdgeInterface {
  seller: {
    id: string;
  };
  buyer: {
    id: string;
  };
}

export interface DagreData {
  nodes: NodeInterface[];
  edges: EdgeInterface[];
}
