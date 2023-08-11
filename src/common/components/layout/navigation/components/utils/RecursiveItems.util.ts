import { NavigationModel } from "../../data/NavigationData";

export const findAllChildren = (item: NavigationModel) => {
  const result: Array<NavigationModel> = [];
  item.children?.map((obj: NavigationModel) => {
    if (obj.children) {
      const el = { ...obj, ...{} };
      delete el.children;
      result.push(el);
      Object.values(obj.children).map((v) => {
        result.push(v);
      });
    } else {
      result.push(obj);
    }
  });

  return result;
};
export const checkHasActiveChildren = (item: NavigationModel, currentPathName: string) => {
  return findAllChildren(item)?.filter((nestedItem) => nestedItem.href && currentPathName.indexOf(nestedItem.href) !== -1);
};

export const getDefaultOpenState = (item: NavigationModel, currentPathName: string) => {
  return checkHasActiveChildren(item, currentPathName)?.length > 0;
};
