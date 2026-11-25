import { Host, Text } from "@expo/ui/swift-ui";
import {
  animation,
  contentTransition,
  font,
  foregroundStyle,
  lineLimit,
} from "@expo/ui/swift-ui/modifiers";
import type { FC } from "react";
import { StyleSheet } from "react-native";

import {
  PRESENCE_APPEARANCES,
  PRESENCE_CAPTION_ANIMATION,
  PRESENCE_CAPTION_SIZE,
  PRESENCE_ORDER,
} from "@/constants/expandable-tab-bar.const";
import { registerComponent } from "@/utils/register-component.util";

import type { IPresenceCaption } from "@/interfaces/expandable-tab-bar.interface";

const PresenceCaptionBase: FC<IPresenceCaption> = ({
  presence,
  color,
}: IPresenceCaption &
  React.ComponentProps<typeof PresenceCaptionBase>): React.ReactNode &
  React.JSX.Element => {
  const order = PRESENCE_ORDER.indexOf(presence);

  return (
    <Host
      matchContents={{ vertical: true }}
      alignment="leading"
      pointerEvents="none"
      style={styles.host}
    >
      <Text
        modifiers={[
          font({ design: "rounded", size: PRESENCE_CAPTION_SIZE }),
          foregroundStyle(color),
          lineLimit(1),
          contentTransition("numericText"),
          animation(PRESENCE_CAPTION_ANIMATION, order),
        ]}
      >
        {PRESENCE_APPEARANCES[presence].label}
      </Text>
    </Host>
  );
};

const styles = StyleSheet.create({
  host: {
    alignSelf: "stretch",
    marginTop: 1,
  },
});

const PresenceCaption = registerComponent("PresenceCaption", PresenceCaptionBase);

export { PresenceCaption };
