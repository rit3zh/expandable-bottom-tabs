import type { FC } from "react";
import { StyleSheet } from "react-native";
import * as CupertinoTabs from "react-native-cupertino-tabs";

import {
  TAB_ICON_LABEL_GAP,
  TAB_ICON_SIZE,
  TAB_LABEL_FONT_SIZE,
  TAB_STRIP_HEIGHT,
} from "@/constants/expandable-tab-bar.const";
import { TYPOGRAPHY_ROUNDED_FAMILY } from "@/constants/typography.const";
import { registerComponent } from "@/utils/register-component.util";

import type { ITabItem, ITabStrip } from "@/interfaces/expandable-tab-bar.interface";

const TabStripBase: FC<ITabStrip> = ({
  width,
  items,
  activeKey,
  palette,
  onSelect,
}: ITabStrip & React.ComponentProps<typeof TabStripBase>): React.ReactNode &
  React.JSX.Element => (
  <CupertinoTabs.Root
    value={activeKey}
    onValueChange={(value: string): void => onSelect(value)}
    tabBarOptions={{
      activeTintColor: palette.accent,
      backgroundColor: "transparent",
      cornerRadius: TAB_STRIP_HEIGHT / 2,
      direction: "column",
      gap: TAB_ICON_LABEL_GAP,
      height: TAB_STRIP_HEIGHT,
      iconSize: TAB_ICON_SIZE,
      inactiveTintColor: palette.text,
      selectedBackgroundColor: palette.tabSelection,
      width,
    }}
  >
    {items.map(
      (item: ITabItem): React.JSX.Element => (
        <CupertinoTabs.Trigger
          key={item.key}
          value={item.key}
          accessibilityLabel={item.label}
        >
          <CupertinoTabs.Icon name={item.icon} />
          <CupertinoTabs.Label style={styles.label}>
            {item.label}
          </CupertinoTabs.Label>
        </CupertinoTabs.Trigger>
      ),
    )}
  </CupertinoTabs.Root>
);

const styles = StyleSheet.create({
  label: {
    fontFamily: TYPOGRAPHY_ROUNDED_FAMILY,
    fontSize: TAB_LABEL_FONT_SIZE,
    fontWeight: "500",
  },
});

const TabStrip = registerComponent("TabStrip", TabStripBase);

export { TabStrip };
