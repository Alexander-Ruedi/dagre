import { EdgeInterface, NodeInterface } from "../../models/DataModels";
import { CalculatedNode } from "../../models/CalculationModels";

export const getBuyerEdgeOfCurrentNode = ({ label }: NodeInterface, edges: EdgeInterface[]) =>
  edges.filter((edge) => edge.seller.id === label).map((edge) => edge.buyer.id);

export const getSellerEdgeOfCurrentNode = ({ label }: NodeInterface, edges: EdgeInterface[]) =>
  edges.filter((edge) => edge.buyer.id === label).map((edge) => edge.seller.id);

export const getCalculatedNodes = (nodes: NodeInterface[], edges: EdgeInterface[]) => {
  const calculatedNodes: CalculatedNode[] = nodes.map((node) => {
    return { ...node, sellerEdges: getSellerEdgeOfCurrentNode(node, edges), buyerEdges: getBuyerEdgeOfCurrentNode(node, edges) };
  });
  return calculatedNodes;
};

export const getNextNodeGroup: (nodes: CalculatedNode[]) => { topLeftNodes: CalculatedNode[]; otherNodes: CalculatedNode[] } = (
  nodes: CalculatedNode[],
) => {
  const nodesWithLowestBuyers = nodes.sort((nodeA, nodeB) => (nodeA.buyerEdges >= nodeB.buyerEdges ? 1 : -1));

  const topLeftNodes: CalculatedNode[] = [];
  const otherNodes: CalculatedNode[] = [];
  let minimumBuyers = 0;
  nodesWithLowestBuyers.forEach((node, index) => {
    if (index === 0) {
      minimumBuyers = node.buyerEdges.length;
    }
    minimumBuyers === node.buyerEdges.length ? topLeftNodes.push(node) : otherNodes.push(node);
  });

  return { topLeftNodes, otherNodes };
};

export const getAllNodeGroups: (nodes: NodeInterface[], edges: EdgeInterface[]) => Array<Array<CalculatedNode>> = (nodes, edges) => {
  const nodeGroups = [];
  const calculatedNodes = getCalculatedNodes(nodes, edges);

  let notGroupedNodes = calculatedNodes;
  let isStuck = false;
  let currentGroup = 0;
  while (notGroupedNodes.length > 0 && !isStuck) {
    const newNodeGroup = getNextNodeGroup(notGroupedNodes);
    if (newNodeGroup.otherNodes.length === notGroupedNodes.length) {
      isStuck = true;
    } else {
      notGroupedNodes = newNodeGroup.otherNodes;
    }
    nodeGroups[currentGroup] = newNodeGroup.topLeftNodes;
    currentGroup++;
  }

  return nodeGroups;
};
