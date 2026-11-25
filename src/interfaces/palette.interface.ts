type TScheme = "light" | "dark";

type TPalette = {
  readonly accent: string;
  readonly background: string;
  busyInk: string;
  readonly busyTint: string;
  fill: string;
  readonly idleInk: string;
  idleTint: string;
  readonly initials: string;
  readonly mark: string;
  readonly offlineInk: string;
  offlineTint: string;
  onAccent: string;
  onlineInk: string;
  onlineTint: string;
  ring: string;
  secondaryText: string;
  separator: string;
  shadow: string;
  surface: string;
  tabSelection: string;
  text: string;
};

type TPaletteKey = keyof TPalette;

export { type TPalette, type TPaletteKey, type TScheme };
