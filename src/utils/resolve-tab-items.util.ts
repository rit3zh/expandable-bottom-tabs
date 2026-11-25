import {
  TAB_FALLBACK_ICON,
  TAB_ICONS,
} from "@/constants/expandable-tab-bar.const";
import type {
  ITabItem,
  TTabBarDescriptors,
  TTabBarRoute,
  TTabBarState,
} from "@/interfaces/expandable-tab-bar.interface";

const resolveTabItems = (
  state: TTabBarState,
  descriptors: TTabBarDescriptors,
): ITabItem[] =>
  state.routes.map(
    (route: TTabBarRoute): ITabItem => ({
      icon: TAB_ICONS[route.name] ?? TAB_FALLBACK_ICON,
      key: route.key,
      label: descriptors[route.key]?.options.title ?? route.name,
    }),
  );

export { resolveTabItems };
