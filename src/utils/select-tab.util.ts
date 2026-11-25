import type {
  TNavigateToTab,
  TTabBarEmitter,
} from "@/interfaces/expandable-tab-bar.interface";

const selectTab = (
  emitter: TTabBarEmitter,
  navigateToTab: TNavigateToTab,
  routeKey: string,
  activeKey: string,
): void => {
  const event = emitter.emit({
    canPreventDefault: true,
    target: routeKey,
    type: "tabPress",
  });

  if (routeKey !== activeKey && !event.defaultPrevented) {
    navigateToTab(routeKey);
  }
};

export { selectTab };
