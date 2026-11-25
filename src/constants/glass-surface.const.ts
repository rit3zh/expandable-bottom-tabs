import type { BlurTint } from "expo-backdrop";
import type { GlassStyle } from "expo-glass-effect";

const GLASS_STYLE: GlassStyle = "regular";
const GLASS_HIDDEN_STYLE: GlassStyle = "none";
const GLASS_ANIMATION_SECONDS = 0.32;
const GLASS_FALLBACK_TINT: BlurTint = "systemUltraThinMaterial";
const GLASS_FALLBACK_INTENSITY = 100;
const GLASS_FALLBACK_FADE_MS = 260;

export {
  GLASS_ANIMATION_SECONDS,
  GLASS_FALLBACK_FADE_MS,
  GLASS_FALLBACK_INTENSITY,
  GLASS_FALLBACK_TINT,
  GLASS_HIDDEN_STYLE,
  GLASS_STYLE,
};
