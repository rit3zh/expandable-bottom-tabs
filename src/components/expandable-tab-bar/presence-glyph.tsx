import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import {
  PRESENCE_APPEARANCES,
  PRESENCE_GLYPH_VIEWBOX,
} from "@/constants/expandable-tab-bar.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IPresenceGlyph } from "@/interfaces/expandable-tab-bar.interface";

const PresenceGlyphBase: FC<IPresenceGlyph> = ({
  presence,
  size,
  color,
}: IPresenceGlyph & React.ComponentProps<typeof PresenceGlyphBase>): React.ReactNode &
  React.JSX.Element => (
  <Svg width={size} height={size} viewBox={PRESENCE_GLYPH_VIEWBOX}>
    <Path
      d={PRESENCE_APPEARANCES[presence].glyph}
      fill={color}
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </Svg>
);

const PresenceGlyph = registerComponent("PresenceGlyph", PresenceGlyphBase);

export { PresenceGlyph };
