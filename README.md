# expandable-bottom-tabs

A Liquid Glass bottom tab bar for iOS that expands into a workspace card and a profile card with a status menu.

---


https://github.com/user-attachments/assets/e88265d3-1449-4299-aa1b-b1699d9289e3


## ⚙️ Installation

```bash
git clone https://github.com/rit3zh/expandable-bottom-tabs
cd expandable-bottom-tabs
bun install
bunx expo run:ios
```

This uses native modules, so it needs a development build and won't run in Expo Go. Liquid Glass needs iOS 26 or newer.

---

## 🚀 Usage

Pass `ExpandableTabBar` to Expo Router's `Tabs` as the `tabBar`:

```tsx
import { Tabs } from "expo-router/tabs";
import { ExpandableTabBar } from "@/components/expandable-tab-bar";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <ExpandableTabBar {...props} />}
    >
      <Tabs.Screen name="members" options={{ title: "Members" }} />
      <Tabs.Screen name="chats" options={{ title: "Chats" }} />
    </Tabs>
  );
}
```

Tap the workspace or the avatar to expand the bar. Tap the status button on the profile card to open the menu, then tap a status or drag across the rows and let go to pick one. Tap outside to collapse the bar.

---

## 🧩 Customizing

| What                  | Where                                                                                     |
| --------------------- | ----------------------------------------------------------------------------------------- |
| Tabs                  | [`src/constants/navigation.const.ts`](src/constants/navigation.const.ts)                  |
| Tab icons (SF Symbols) | `TAB_ICONS` in [`src/constants/expandable-tab-bar.const.ts`](src/constants/expandable-tab-bar.const.ts) |
| Workspace and account | [`src/data/workspace.data.ts`](src/data/workspace.data.ts)                                |
| Sizes and springs     | [`src/constants/expandable-tab-bar.const.ts`](src/constants/expandable-tab-bar.const.ts)  |
| Colours               | [`src/constants/palette.const.ts`](src/constants/palette.const.ts)                        |

---

## 🧱 Stack

[Expo SDK 58](https://expo.dev/changelog) · [React Native 0.88](https://reactnative.dev/) · [Expo Router](https://docs.expo.dev/router/introduction/) · [Expo UI](https://docs.expo.dev/versions/latest/sdk/ui/) · [Reanimated](https://docs.swmansion.com/react-native-reanimated/) · [Skia](https://shopify.github.io/react-native-skia/)

This component is inspired by: https://x.com/yanayank/status/2053518552150221240
