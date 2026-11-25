import {
  BAR_DISMISS_LABEL,
  BAR_GLASS_SPACING,
  BAR_HEIGHT,
  BAR_HORIZONTAL_INSET,
  TAB_FALLBACK_ICON,
} from "@/constants/expandable-tab-bar.const";
import { ACCOUNT_CURRENT, WORKSPACE_CURRENT } from "@/data/workspace.data";
import { useExpandableTabBar } from "@/hooks/use-expandable-tab-bar";
import { usePalette } from "@/hooks/use-palette";
import type {
  TExpandableTabBar,
  TPresence,
} from "@/interfaces/expandable-tab-bar.interface";
import { registerComponent } from "@/utils/register-component.util";
import { resolveBarLayout } from "@/utils/resolve-bar-layout.util";
import { resolveBlurPulse } from "@/utils/resolve-blur-pulse.util";
import { resolveTabItems } from "@/utils/resolve-tab-items.util";
import { selectTab } from "@/utils/select-tab.util";
import { GlassContainer } from "expo-glass-effect";
import { type FC, useMemo } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { useDerivedValue } from "react-native-reanimated";
import { AccessoryGlass } from "./accessory-glass";
import { NavigationSegment } from "./navigation-segment";
import { ProfileSegment } from "./profile-segment";
import { StatusMenu } from "./status-menu";
import { WorkspaceSegment } from "./workspace-segment";

const ExpandableTabBarBase: FC<TExpandableTabBar> = ({
  state,
  descriptors,
  emitter,
  navigateToTab,
  insets,
}: TExpandableTabBar &
  React.ComponentProps<typeof ExpandableTabBarBase>): React.ReactNode &
  React.JSX.Element => {
  const palette = usePalette();
  const window = useWindowDimensions();
  const bar = useExpandableTabBar();
  const { mode, presence, isMenuOpen } = bar.state;
  const isCollapsed = mode === "collapsed";

  const layout = useMemo(
    () => resolveBarLayout(window.width, insets.bottom),
    [window.width, insets.bottom],
  );

  const items = useMemo(
    () => resolveTabItems(state, descriptors),
    [state, descriptors],
  );

  const clarity = useDerivedValue(
    () =>
      1 -
      Math.max(
        resolveBlurPulse(bar.expansion.get()),
        resolveBlurPulse(bar.focus.get()),
      ),
  );

  const motion = useMemo(
    () => ({
      clarity,
      expansion: bar.expansion,
      focus: bar.focus,
      menu: bar.menu,
    }),
    [clarity, bar.expansion, bar.focus, bar.menu],
  );

  const activeKey = state.routes[state.index]?.key ?? "";
  const activeIcon = items[state.index]?.icon ?? TAB_FALLBACK_ICON;

  return (
    <View style={styles.root}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={BAR_DISMISS_LABEL}
        accessibilityElementsHidden={isCollapsed}
        importantForAccessibility={isCollapsed ? "no-hide-descendants" : "auto"}
        onPress={() => bar.dispatch({ type: "dismiss" })}
        style={[
          styles.backdrop,
          { pointerEvents: isCollapsed ? "none" : "auto" },
        ]}
      />
      <View style={[styles.stage, { bottom: layout.bottom }]}>
        <StatusMenu
          motion={motion}
          presence={presence}
          isOpen={isMenuOpen}
          palette={palette}
          onSelect={(next: TPresence): void =>
            bar.dispatch({ presence: next, type: "selectPresence" })
          }
        />
        <GlassContainer spacing={BAR_GLASS_SPACING} style={styles.row}>
          <NavigationSegment
            layout={layout}
            motion={motion}
            mode={mode}
            items={items}
            activeKey={activeKey}
            activeIcon={activeIcon}
            palette={palette}
            onSelect={(key: string): void =>
              selectTab(emitter, navigateToTab, key, activeKey)
            }
            onCollapse={(): void => bar.dispatch({ type: "collapse" })}
          />
          <AccessoryGlass
            layout={layout}
            motion={motion}
            mode={mode}
            onPress={(): void =>
              bar.dispatch({ focus: "workspace", type: "open" })
            }
          />
          <WorkspaceSegment
            layout={layout}
            motion={motion}
            mode={mode}
            workspace={WORKSPACE_CURRENT}
            palette={palette}
            onPress={(): void =>
              bar.dispatch({ focus: "workspace", type: "open" })
            }
          />
          <ProfileSegment
            layout={layout}
            motion={motion}
            mode={mode}
            account={ACCOUNT_CURRENT}
            presence={presence}
            isMenuOpen={isMenuOpen}
            palette={palette}
            onPress={() => bar.dispatch({ focus: "profile", type: "open" })}
            onToggleMenu={() => bar.dispatch({ type: "toggleMenu" })}
          />
        </GlassContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
  },
  root: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "box-none",
  },
  row: {
    bottom: 0,
    height: BAR_HEIGHT,
    left: 0,
    pointerEvents: "box-none",
    position: "absolute",
    right: 0,
  },
  stage: {
    left: BAR_HORIZONTAL_INSET,
    pointerEvents: "box-none",
    position: "absolute",
    right: BAR_HORIZONTAL_INSET,
    top: 0,
  },
});

const ExpandableTabBar = registerComponent(
  "ExpandableTabBar",
  ExpandableTabBarBase,
);

export { ExpandableTabBar };
