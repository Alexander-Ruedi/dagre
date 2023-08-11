import { navigation, NavigationModel } from "../data/NavigationData";

export const updateCurrentNavigation = (pathname: string) => {
  if (pathname !== "/") {
    navigation.forEach((group: any) => {
      group.current =
        group.children.filter((item: any) => {
          let childrenHit = [];
          if (item.children) {
            childrenHit = item.children.filter((item: any) => {
              const isSelectedItem = pathname.indexOf(item.href) == 1;
              item.current = isSelectedItem;
              return isSelectedItem;
            });
          }
          const childIsSelected = childrenHit.length > 0;
          const isSelectedItem = pathname.indexOf(item.href) == 1;
          item.current = isSelectedItem || childIsSelected;
          return isSelectedItem || childIsSelected;
        }).length > 0;
      return group.current;
    });
  }
};

const getCurrentNavigationItem = (navigationPointer: Array<NavigationModel>) => {
  return navigationPointer.filter((item) => item.current)[0];
};

export const getNavigationTree = (navigation: Array<NavigationModel>) => {
  let currentNavigationItem = getCurrentNavigationItem(navigation);
  const tree: Array<NavigationModel> = [currentNavigationItem];
  let timeout = 0;
  while (currentNavigationItem?.children && currentNavigationItem.children.length > 0 && timeout < 100) {
    currentNavigationItem = getCurrentNavigationItem(currentNavigationItem.children);
    if (currentNavigationItem) {
      tree.push(currentNavigationItem);
    }
    timeout++;
  }
  return tree;
};

export const getOptionalBreadCrumbs = (pathname: string) => {
  if (isEditPage(pathname)) {
    return "Edit";
  }
  if (isBatchEditPage(pathname)) {
    return "Edit multiple";
  }
  if (isImportPage(pathname)) {
    return "Import";
  }
  if (isCreatePage(pathname)) {
    return "Create";
  }
};

const isEditPage = (pathname: string) => {
  return pathname.indexOf("/edit") > 0;
};
const isBatchEditPage = (pathname: string) => {
  return pathname.indexOf("/batch-edit") > 0;
};
const isImportPage = (pathname: string) => {
  return pathname.indexOf("/import") > 0;
};
const isCreatePage = (pathname: string) => {
  return pathname.endsWith("/create");
};
const isShowPage = (pathname: string) => {
  return pathname.endsWith("/show");
};

export const isPeriodDisabled = (pathname: string) => {
  if (isShowPage(pathname)) return false;
  if (isCreatePage(pathname)) return false;
  if (isEditPage(pathname)) return true;
  if (isBatchEditPage(pathname)) return true;
};
