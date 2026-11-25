import type {
  IBarState,
  TBarAction,
} from "@/interfaces/expandable-tab-bar.interface";

const reduceBarState = <T extends IBarState, S extends TBarAction>(
  state: T,
  action: S,
): IBarState => {
  switch (action.type) {
    case "open":
      return state.mode === action.focus
        ? state
        : { ...state, isMenuOpen: false, mode: action.focus };
    case "collapse":
      return { ...state, isMenuOpen: false, mode: "collapsed" };
    case "dismiss":
      return state.isMenuOpen
        ? { ...state, isMenuOpen: false }
        : { ...state, mode: "collapsed" };
    case "toggleMenu":
      return { ...state, isMenuOpen: !state.isMenuOpen };
    case "selectPresence":
      return { ...state, isMenuOpen: false, presence: action.presence };
  }
};

export { reduceBarState };
