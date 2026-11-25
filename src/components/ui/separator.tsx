import type { FC } from "react";
import { StyleSheet, View } from "react-native";

import { SEPARATOR_THICKNESS } from "@/constants/separator.const";
import { registerComponent } from "@/utils/register-component.util";

import type { ISeparator } from "@/interfaces/separator.interface";

const SeparatorBase: FC<ISeparator> = ({
  color,
  inset = 0,
}: ISeparator & React.ComponentProps<typeof SeparatorBase>): React.ReactNode &
  React.JSX.Element => (
  <View style={[styles.line, { backgroundColor: color, marginLeft: inset }]} />
);

const styles = StyleSheet.create({
  line: {
    alignSelf: "stretch",
    height: SEPARATOR_THICKNESS,
  },
});

const Separator = registerComponent("Separator", SeparatorBase);

export { Separator };
