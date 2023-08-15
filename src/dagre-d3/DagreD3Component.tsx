import { example0 } from "../data/example0";
import { getAllNodeGroups } from "./utils/NodeHelper";
import { ProviderNode } from "./components/ProviderNode";
import { ButtonGroupComponent } from "../common/components/controls/button-group/ButtonGroup";
import { useMemo, useState } from "react";
import { example2 } from "../data/example2";
import { example1 } from "../data/example1";

export const DagreD3Component = () => {
  //console.log("those are left of ch01 ", getBuyerEdgeOfCurrentNode(example0.nodes[0], example0.edges));
  //console.log("those are left of fr01 ", getBuyerEdgeOfCurrentNode(example0.nodes[3], example0.edges));
  //console.log("those are right of ch01 ", getSellerEdgeOfCurrentNode(example0.nodes[0], example0.edges));
  //const calculatedNodes = getCalculatedNodes(example0.nodes, example0.edges);
  //const nodeGroup1 = getNextNodeGroup(calculatedNodes);
  //const nodeGroup2 = getNextNodeGroup(nodeGroup1.otherNodes);

  const [selectedExample, setSelectedExample] = useState<string>("0");
  const selectedData = useMemo(() => {
    switch (selectedExample) {
      case "0":
        return example0;
        break;
      case "1":
        return example1;
        break;
      case "2":
        return example2;
        break;
      default:
        return example0;
    }
  }, [selectedExample]);

  const allNodeGroups = useMemo(() => getAllNodeGroups(selectedData.nodes, selectedData.edges), [selectedData]);

  console.log("node groups are", allNodeGroups);
  return (
    <>
      <span>dagre d3</span>
      <div>
        <ButtonGroupComponent
          items={[
            { id: "0", label: "first example" },
            { id: "1", label: "second example" },
            { id: "2", label: "third example" },
          ]}
          onChange={setSelectedExample}
          value={selectedExample}
        />
      </div>
      <svg width="1920px" height="1080px" className="mt-10">
        {allNodeGroups.map((nodeGroup, nodeGroupIndex) => {
          return nodeGroup.map((node, nodeIndex) => {
            if (node.label !== "#") {
              return <ProviderNode key={"provider-" + node.id} node={node} nodeGroupIndex={nodeGroupIndex} nodeIndex={nodeIndex} />;
            }
          });
        })}
      </svg>
    </>
  );
};
