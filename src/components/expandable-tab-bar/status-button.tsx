import type { FC } from "react";
import { StyleSheet } from "react-native";
import Animated from "react-native-reanimated";

import { SpringPressable } from "@/components/ui/spring-pressable";
import {
  BAR_STATUS_BUTTON_SIZE,
  BAR_STATUS_LABEL,
  PRESENCE_APPEARANCES,
  PRESENCE_BUTTON_GLYPH_SIZE,
  PRESENCE_TINT_TRANSITION_MS,
} from "@/constants/expandable-tab-bar.const";
import { registerComponent } from "@/utils/register-component.util";

import type {
  IStatusButton,
} from "@/interfaces/expandable-tab-bar.interface";
import { PresenceMorph } from "./presence-morph";

const StatusButtonBase: FC<IStatusButton> = ({
  presence,
  isActive,
  palette,
  onPress,
}: IStatusButton & React.ComponentProps<typeof StatusButtonBase>): React.ReactNode &
  React.JSX.Element => {
  const appearance = PRESENCE_APPEARANCES[presence];

  return (
    <SpringPressable
      accessibilityRole="button"
      accessibilityLabel={BAR_STATUS_LABEL}
      accessibilityValue={{ text: appearance.label }}
      accessibilityState={{ expanded: isActive }}
      pulseKey={presence}
      onPress={(): void => onPress()}
      style={styles.frame}
    >
      <Animated.View
        style={[
          styles.tint,
          {
            backgroundColor: palette[appearance.tint],
            transitionDuration: PRESENCE_TINT_TRANSITION_MS,
            transitionProperty: "backgroundColor",
          },
        ]}
      >
        <PresenceMorph
          presence={presence}
          size={PRESENCE_BUTTON_GLYPH_SIZE}
          color={palette[appearance.ink]}
        />
      </Animated.View>
    </SpringPressable>
  );
};

const styles = StyleSheet.create({
  frame: {
    height: BAR_STATUS_BUTTON_SIZE,
    width: BAR_STATUS_BUTTON_SIZE,
  },
  tint: {
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: BAR_STATUS_BUTTON_SIZE / 2,
    flex: 1,
    justifyContent: "center",
  },
});

const StatusButton = registerComponent("StatusButton", StatusButtonBase);

export { StatusButton };
