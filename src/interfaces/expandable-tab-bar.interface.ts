import type { BottomTabBarProps } from "expo-router/tabs";
import type { SFSymbol } from "expo-symbols";
import type { ActionDispatch, ComponentType } from "react";
import type { DerivedValue, SharedValue } from "react-native-reanimated";
import type { SkRRect } from "react-native-skia";

import type { ILogo } from "./logo.interface";
import type { TPalette, TPaletteKey } from "./palette.interface";

type TBarMode = "collapsed" | "workspace" | "profile";
type TBarFocus = Exclude<TBarMode, "collapsed">;
type TPresence = "online" | "idle" | "busy" | "invisible";
type TBarAction =
  | { type: "open"; focus: TBarFocus }
  | { type: "collapse" }
  | { type: "dismiss" }
  | { type: "toggleMenu" }
  | { type: "selectPresence"; presence: TPresence };

type TExpandableTabBar = BottomTabBarProps;
type TTabBarState = ValueOf<BottomTabBarProps, "state">;
type TTabBarRoute = ValueOf<ValueOf<TTabBarState, "routes">, number>;
type TTabBarDescriptors = ValueOf<BottomTabBarProps, "descriptors">;
type TTabBarEmitter = ValueOf<BottomTabBarProps, "emitter">;
type TNavigateToTab = ValueOf<BottomTabBarProps, "navigateToTab">;

interface IBarState {
  mode: TBarMode;
  presence: TPresence;
  isMenuOpen: boolean;
}

interface IBarLayout {
  rowWidth: number;
  bottom: number;
  tabStripWidth: number;
  accessoryWidth: number;
  pillWidth: number;
  workspaceCollapsedX: number;
  profileCollapsedX: number;
  detailWidth: number;
  profileDetailWidth: number;
}

interface IBarMotion {
  clarity: DerivedValue<number>;
  expansion: DerivedValue<number>;
  focus: DerivedValue<number>;
  menu: DerivedValue<number>;
}

interface ITabItem {
  key: string;
  label: string;
  icon: SFSymbol;
}

interface IWorkspace {
  name: string;
  caption: string;
  logo: ComponentType<ILogo>;
  isVerified: boolean;
}

interface IAccount {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
}

interface IPresenceAppearance {
  label: string;
  glyph: string;
  tint: TPaletteKey;
  ink: TPaletteKey;
}

interface IPresenceGlyph {
  presence: TPresence;
  size: number;
  color: string;
}

interface IPresenceCaption {
  presence: TPresence;
  color: string;
}

interface IPresenceMorph {
  presence: TPresence;
  size: number;
  color: string;
}

interface IMenuHighlight {
  index: SharedValue<number>;
  offset: SharedValue<number>;
  opacity: SharedValue<number>;
}

interface INavigationSegment {
  layout: IBarLayout;
  motion: IBarMotion;
  mode: TBarMode;
  items: ITabItem[];
  activeKey: string;
  activeIcon: SFSymbol;
  palette: TPalette;
  onSelect: (key: string) => void;
  onCollapse: () => void;
}

interface ITabStrip {
  width: number;
  items: ITabItem[];
  activeKey: string;
  palette: TPalette;
  onSelect: (key: string) => void;
}

interface IAccessoryGlass {
  layout: IBarLayout;
  motion: IBarMotion;
  mode: TBarMode;
  onPress: () => void;
}
interface IWorkspaceSegment {
  layout: IBarLayout;
  motion: IBarMotion;
  mode: TBarMode;
  workspace: IWorkspace;
  palette: TPalette;
  onPress: () => void;
}
interface IProfileSegment {
  layout: IBarLayout;
  motion: IBarMotion;
  mode: TBarMode;
  account: IAccount;
  presence: TPresence;
  isMenuOpen: boolean;
  palette: TPalette;
  onPress: () => void;
  onToggleMenu: () => void;
}

interface IPresenceDot {
  visibility: DerivedValue<number>;
  presence: TPresence;
  palette: TPalette;
}

interface IStatusButton {
  presence: TPresence;
  isActive: boolean;
  palette: TPalette;
  onPress: () => void;
}

interface IStatusMenu {
  motion: IBarMotion;
  presence: TPresence;
  isOpen: boolean;
  palette: TPalette;
  onSelect: (presence: TPresence) => void;
}

interface IRoundedRect {
  x: number;
  y: number;
  w: number;
  h: number;
  r: number;
}

interface IGooGeometry {
  width: number;
  height: number;
  trigger: IRoundedRect;
  panel: IRoundedRect;
}

interface IStatusGoo {
  geometry: IGooGeometry;
  progress: DerivedValue<number>;
  color: string;
  shadowColor: string;
}

interface IStatusOption {
  presence: TPresence;
  isSelected: boolean;
  palette: TPalette;
  onSelect: (presence: TPresence) => void;
}

interface IVerifiedTitle {
  title: string;
  isVerified: boolean;
  palette: TPalette;
}

type TPresenceMorph = {
  cutout: DerivedValue<SkRRect>;
  color: SharedValue<string>;
};

type TExpandableTabBarState = {
  state: IBarState;
  dispatch: ActionDispatch<[TBarAction]>;
  expansion: SharedValue<number>;
  focus: SharedValue<number>;
  menu: SharedValue<number>;
};

export {
  type IAccessoryGlass,
  type IAccount,
  type IBarLayout,
  type IBarMotion,
  type IBarState,
  type IGooGeometry,
  type IMenuHighlight,
  type INavigationSegment,
  type IPresenceAppearance,
  type IPresenceCaption,
  type IPresenceDot,
  type IPresenceGlyph,
  type IPresenceMorph,
  type IProfileSegment,
  type IRoundedRect,
  type IStatusButton,
  type IStatusGoo,
  type IStatusMenu,
  type IStatusOption,
  type ITabItem,
  type ITabStrip,
  type IVerifiedTitle,
  type IWorkspace,
  type IWorkspaceSegment,
  type TBarAction,
  type TBarFocus,
  type TBarMode,
  type TExpandableTabBar,
  type TExpandableTabBarState,
  type TNavigateToTab,
  type TPresence,
  type TPresenceMorph,
  type TTabBarDescriptors,
  type TTabBarEmitter,
  type TTabBarRoute,
  type TTabBarState,
};
