import "./style.css";
import { SNode } from "sprotty-protocol";
import "reflect-metadata";
import { LocalModelSource, TYPES } from "sprotty";
import { graph } from "./model-source";
import { createContainer } from "./ContainerCreator";
import { useEffect } from "react";

export default function run() {
  const container = createContainer("sprotty-container");
  const modelSource = container.get<LocalModelSource>(TYPES.ModelSource);
  modelSource.setModel(graph);
}

export interface TaskNode extends SNode {
  name: string;
  isRunning: boolean;
  isFinished: boolean;
}
export const SprottyComponent = () => {
  useEffect(() => {
    run();
  }, []);

  return <div id="sprotty-container" />;
};
