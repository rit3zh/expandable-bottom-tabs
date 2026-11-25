import { useEffect, useReducer } from "react";
import { useSharedValue, withSpring } from "react-native-reanimated";

import {
  BAR_INITIAL_STATE,
  BAR_SPRING,
  MENU_CLOSE_SPRING,
  MENU_OPEN_SPRING,
} from "@/constants/expandable-tab-bar.const";

import type {
  IBarState,
  TBarAction,
  TExpandableTabBarState,
} from "@/interfaces/expandable-tab-bar.interface";
import { reduceBarState } from "@/reducers/bar-state.reducer";

const useExpandableTabBar = (): TExpandableTabBarState => {
  const [state, dispatch] = useReducer<IBarState, [TBarAction]>(
    reduceBarState,
    BAR_INITIAL_STATE,
  );
  const expansion = useSharedValue(0);
  const focus = useSharedValue(0);
  const menu = useSharedValue(0);

  useEffect(() => {
    expansion.set(
      withSpring(state.mode === "collapsed" ? 0 : 1, BAR_SPRING),
    );
    if (state.mode !== "collapsed") {
      focus.set(
        withSpring(state.mode === "profile" ? 1 : 0, BAR_SPRING),
      );
    }
  }, [expansion, focus, state.mode]);

  useEffect(() => {
    menu.set(
      withSpring(
        state.isMenuOpen ? 1 : 0,
        state.isMenuOpen ? MENU_OPEN_SPRING : MENU_CLOSE_SPRING,
      ),
    );
  }, [menu, state.isMenuOpen]);

  return { dispatch, expansion, focus, menu, state };
};

export { useExpandableTabBar };
