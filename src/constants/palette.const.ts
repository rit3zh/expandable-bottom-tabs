import type { TPalette, TScheme } from "@/interfaces/palette.interface";

const PALETTE_DEFAULT_SCHEME: TScheme = "light";

const PALETTE_LIGHT: TPalette = {
  accent: "#2F7CF6",
  background: "#F5F5F7",
  busyInk: "#C9292D",
  busyTint: "rgba(237, 66, 69, 0.14)",
  fill: "rgba(120, 120, 128, 0.14)",
  idleInk: "#B86E00",
  idleTint: "rgba(250, 168, 26, 0.18)",
  initials: "#7381F0",
  mark: "#EDEDF0",
  offlineInk: "#5B6470",
  offlineTint: "rgba(116, 127, 141, 0.16)",
  onAccent: "#FFFFFF",
  onlineInk: "#23803F",
  onlineTint: "rgba(59, 165, 93, 0.16)",
  ring: "#FFFFFF",
  secondaryText: "#8A8A8F",
  separator: "rgba(60, 60, 67, 0.14)",
  shadow: "rgba(0, 0, 0, 0.14)",
  surface: "#FFFFFF",
  tabSelection: "rgba(0, 0, 0, 0.06)",
  text: "#0B0B0F",
};

const PALETTE_DARK: TPalette = {
  accent: "#4C8FFF",
  background: "#0B0B0D",
  busyInk: "#F49A96",
  busyTint: "#481716",
  fill: "rgba(120, 120, 128, 0.28)",
  idleInk: "#FFC870",
  idleTint: "#3E2B0C",
  initials: "#7C89FF",
  mark: "#2A2A2E",
  offlineInk: "#AEB6C2",
  offlineTint: "#262A31",
  onAccent: "#FFFFFF",
  onlineInk: "#8EE0A0",
  onlineTint: "#16301E",
  ring: "#1C1C1E",
  secondaryText: "#98989F",
  separator: "rgba(84, 84, 88, 0.42)",
  shadow: "rgba(0, 0, 0, 0.5)",
  surface: "#1C1C1E",
  tabSelection: "rgba(255, 255, 255, 0.12)",
  text: "#F5F5F7",
};

const PALETTE_THEMES: Record<TScheme, TPalette> = {
  dark: PALETTE_DARK,
  light: PALETTE_LIGHT,
};

export { PALETTE_DARK, PALETTE_DEFAULT_SCHEME, PALETTE_LIGHT, PALETTE_THEMES };
