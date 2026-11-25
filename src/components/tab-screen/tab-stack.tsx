import { Stack } from "expo-router";
import type { FC } from "react";

import { usePalette } from "@/hooks/use-palette";
import { registerComponent } from "@/utils/register-component.util";

const TabStackBase: FC = (): React.ReactNode & React.JSX.Element => {
  const palette = usePalette();

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: palette.background },
        headerLargeTitleShadowVisible: false,
        headerShadowVisible: false,
        headerTransparent: true,
      }}
    />
  );
};

const TabStack = registerComponent("TabStack", TabStackBase);

export { TabStack };
