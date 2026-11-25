import type { FC } from "react";
import { StyleSheet, View } from "react-native";

import {
  SKELETON_AVATAR_SIZE,
  SKELETON_CARD_HEIGHT,
  SKELETON_CARD_RADIUS,
  SKELETON_LINE_HEIGHT,
  SKELETON_LINE_WIDTHS,
} from "@/constants/tab-screen.const";
import { registerComponent } from "@/utils/register-component.util";

import type { ISkeletonItem } from "@/interfaces/tab-screen.interface";

const SkeletonItemBase: FC<ISkeletonItem> = ({
  shape,
  index,
  color,
}: ISkeletonItem & React.ComponentProps<typeof SkeletonItemBase>): React.ReactNode &
  React.JSX.Element => {
  const bone = { backgroundColor: color };
  const width = SKELETON_LINE_WIDTHS[index % SKELETON_LINE_WIDTHS.length];

  if (shape === "card") {
    return (
      <View style={styles.cardGroup}>
        <View style={[styles.card, bone]} />
        <View style={[styles.line, bone, { width }]} />
      </View>
    );
  }

  return (
    <View style={styles.row}>
      <View style={[styles.avatar, bone]} />
      <View style={styles.lines}>
        <View style={[styles.line, bone, { width }]} />
        <View style={[styles.line, styles.short, bone]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    borderRadius: SKELETON_AVATAR_SIZE / 2,
    height: SKELETON_AVATAR_SIZE,
    width: SKELETON_AVATAR_SIZE,
  },
  card: {
    borderCurve: "continuous",
    borderRadius: SKELETON_CARD_RADIUS,
    height: SKELETON_CARD_HEIGHT,
  },
  cardGroup: {
    gap: 12,
  },
  line: {
    borderRadius: SKELETON_LINE_HEIGHT / 2,
    height: SKELETON_LINE_HEIGHT,
  },
  lines: {
    flex: 1,
    gap: 8,
  },
  row: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
  },
  short: {
    width: "28%",
  },
});

const SkeletonItem = registerComponent("SkeletonItem", SkeletonItemBase);

export { SkeletonItem };
