import { example } from "../data/example";
import { getAllNodeGroups } from "./utils/NodeHelper";

export const DagreD3Component = () => {
  //console.log("those are left of ch01 ", getBuyerEdgeOfCurrentNode(example.nodes[0], example.edges));
  //console.log("those are left of fr01 ", getBuyerEdgeOfCurrentNode(example.nodes[3], example.edges));
  //console.log("those are right of ch01 ", getSellerEdgeOfCurrentNode(example.nodes[0], example.edges));
  //const calculatedNodes = getCalculatedNodes(example.nodes, example.edges);
  //const nodeGroup1 = getNextNodeGroup(calculatedNodes);
  //const nodeGroup2 = getNextNodeGroup(nodeGroup1.otherNodes);

  const allNodeGroups = getAllNodeGroups(example.nodes, example.edges);

  console.log("details", allNodeGroups);

  return (
    <>
      <span>dagre d3</span>
      <svg width={"100px"} height="100px">
        <line x1={0} x2={100} y1={0} y2={100} stroke={"red"} />
      </svg>
    </>
  );
};
