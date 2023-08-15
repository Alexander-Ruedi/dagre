import { Container, ContainerModule } from "inversify";
import {
  configureModelElement,
  configureViewerOptions,
  loadDefaultModules,
  LocalModelSource,
  PolylineEdgeView,
  SEdge,
  SGraph,
  SGraphView,
  SNode,
  TYPES,
} from "sprotty";
import { TaskNodeView } from "./TasknodeView";

export const createContainer = (containerId: string) => {
  const myModule = new ContainerModule((bind, unbind, isBound, rebind) => {
    bind(TYPES.ModelSource).to(LocalModelSource).inSingletonScope();

    const context = { bind, unbind, isBound, rebind } as any;
    configureModelElement(context, "graph", SGraph, SGraphView);
    configureModelElement(context, "task", SNode, TaskNodeView);
    configureModelElement(context, "edge", SEdge, PolylineEdgeView);

    configureViewerOptions(context, {
      needsClientLayout: false,
      baseDiv: containerId,
    });
  });

  const container = new Container();
  loadDefaultModules(container as any);
  container.load(myModule);
  return container;
};
