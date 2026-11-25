import type { FC } from "react";
import { StyleSheet } from "react-native";
import { Canvas, Circle, Group } from "react-native-skia";

import {
  PRESENCE_GLYPH_RADIUS,
  PRESENCE_GLYPH_UNITS,
} from "@/constants/expandable-tab-bar.const";
import { registerComponent } from "@/utils/register-component.util";

import { usePresenceMorph } from "@/hooks/use-presence-morph";
import type {
  IPresenceMorph,
} from "@/interfaces/expandable-tab-bar.interface";

const PresenceMorphBase: FC<IPresenceMorph> = ({
  presence,
  size,
  color,
}: IPresenceMorph & React.ComponentProps<typeof PresenceMorphBase>): React.ReactNode &
  React.JSX.Element => {
  const morph = usePresenceMorph(presence, color);

  return (
    <Canvas style={[styles.canvas, { height: size, width: size }]}>
      <Group transform={[{ scale: size / PRESENCE_GLYPH_UNITS }]}>
        <Group clip={morph.cutout} invertClip>
          <Circle
            cx={PRESENCE_GLYPH_RADIUS}
            cy={PRESENCE_GLYPH_RADIUS}
            r={PRESENCE_GLYPH_RADIUS}
            color={morph.color}
          />
        </Group>
      </Group>
    </Canvas>
  );
};

const styles = StyleSheet.create({
  canvas: {
    pointerEvents: "none",
  },
});

const PresenceMorph = registerComponent("PresenceMorph", PresenceMorphBase);

export { PresenceMorph };
