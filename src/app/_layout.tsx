import { type BottomTabBarProps, Tabs } from "expo-router/tabs";
import type { FC } from "react";
import { StyleSheet } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { ExpandableTabBar } from "@/components/expandable-tab-bar";
import type { INavigationTab } from "@/interfaces/navigation.interface";
import { NAVIGATION_TABS } from "@/constants/navigation.const";

const RootLayout: FC = (): React.ReactNode & React.JSX.Element => (
  <GestureHandlerRootView style={styles.root}>
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props: BottomTabBarProps): React.JSX.Element => (
        <ExpandableTabBar {...props} />
      )}
    >
      {NAVIGATION_TABS.map(
        (tab: INavigationTab): React.JSX.Element => (
          <Tabs.Screen
            key={tab.name}
            name={tab.name}
            options={{ title: tab.title }}
          />
        ),
      )}
    </Tabs>
  </GestureHandlerRootView>
);

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default RootLayout;
