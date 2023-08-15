import { NodeInterface } from "../../models/DataModels";

interface NodeComponentProps {
  nodeGroupIndex: number;
  nodeIndex: number;
  node: NodeInterface;
}

export const ProviderNode = (props: NodeComponentProps) => {
  const { nodeIndex, nodeGroupIndex, node } = props;
  const isSecondaryColumn = nodeGroupIndex % 2 == 0;
  const additionalMarginTop = isSecondaryColumn ? 100 : 0;

  const xPosition = nodeGroupIndex * 300 + 1;
  const yPosition = nodeIndex * 200 + additionalMarginTop + 1;

  return (
    <g transform={`translate(${xPosition} ${yPosition})`} height="100" width="250">
      <rect key={node.id} width="250" height="100" style={{ stroke: "black", fill: "white" }} />
      <text x="125" y="25" dominantBaseline="middle" textAnchor="middle">
        {node.label}
      </text>
      <text x="62.5" y="75" dominantBaseline="middle" textAnchor="middle">
        {node.salesInbound.toFixed(0)}
      </text>
      <text x="187.5" y="75" dominantBaseline="middle" textAnchor="middle">
        {node.salesOutbound.toFixed(0)}
      </text>
    </g>
  );
};
