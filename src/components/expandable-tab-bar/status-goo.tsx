import {
  GOO_BLUR,
  GOO_MATRIX,
  GOO_REVEAL_END,
  GOO_SHADOW_BLUR,
  GOO_SHADOW_OFFSET,
} from "@/constants/expandable-tab-bar.const";
import type { IStatusGoo } from "@/interfaces/expandable-tab-bar.interface";
import { registerComponent } from "@/utils/register-component.util";
import { resolveGooNeck } from "@/utils/resolve-goo-neck.util";
import { resolveGooRect } from "@/utils/resolve-goo-rect.util";
import { resolveGooSwell } from "@/utils/resolve-goo-swell.util";
import type { FC } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import {
  Blur,
  Canvas,
  ColorMatrix,
  Group,
  Paint,
  rect,
  RoundedRect,
  rrect,
  Shadow,
} from "react-native-skia";

const StatusGooBase: FC<IStatusGoo> = ({
  geometry,
  progress,
  color,
  shadowColor,
}: IStatusGoo & React.ComponentProps<typeof StatusGooBase>): React.ReactNode &
  React.JSX.Element => {
  const triggerShape = useDerivedValue(
    () => {
      const shape = resolveGooSwell(
        geometry.trigger,
        progress.get(),
      );
      return rrect(rect(shape.x, shape.y, shape.w, shape.h), shape.r, shape.r);
    },
  );

  const blobShape = useDerivedValue(
    () => {
      const shape = resolveGooRect(geometry, progress.get());
      return rrect(rect(shape.x, shape.y, shape.w, shape.h), shape.r, shape.r);
    },
  );

  const neckShape = useDerivedValue(
    () => {
      const blob = resolveGooRect(geometry, progress.get());
      const shape = resolveGooNeck(
        geometry,
        blob,
        progress.get(),
      );
      return rrect(rect(shape.x, shape.y, shape.w, shape.h), shape.r, shape.r);
    },
  );

  const revealStyle = useAnimatedStyle(
    () => ({
      opacity: interpolate(
        progress.get(),
        [0, GOO_REVEAL_END],
        [0, 1],
        Extrapolation.CLAMP,
      ),
    }),
  );

  return (
    <Animated.View style={[styles.layer, revealStyle]}>
      <Canvas style={styles.layer}>
        <Group
          layer={
            <Paint>
              <Shadow
                dx={0}
                dy={GOO_SHADOW_OFFSET}
                blur={GOO_SHADOW_BLUR}
                color={shadowColor}
              />
            </Paint>
          }
        >
          <Group
            layer={
              <Paint>
                <Blur blur={GOO_BLUR} />
                <ColorMatrix matrix={GOO_MATRIX} />
              </Paint>
            }
          >
            <RoundedRect rect={triggerShape} color={color} />
            <RoundedRect rect={neckShape} color={color} />
            <RoundedRect rect={blobShape} color={color} />
          </Group>
        </Group>
      </Canvas>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  layer: {
    ...StyleSheet.absoluteFill,
    pointerEvents: "none",
  },
});

const StatusGoo = registerComponent("StatusGoo", StatusGooBase);

export { StatusGoo };
