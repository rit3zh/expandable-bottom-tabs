import { useColorScheme } from "react-native";

import type { TPalette } from "@/interfaces/palette.interface";
import {
  PALETTE_DEFAULT_SCHEME,
  PALETTE_THEMES,
} from "@/constants/palette.const";

const usePalette = (): TPalette => {
  const scheme = useColorScheme() ?? PALETTE_DEFAULT_SCHEME;
  return PALETTE_THEMES[scheme];
};

export { usePalette };
