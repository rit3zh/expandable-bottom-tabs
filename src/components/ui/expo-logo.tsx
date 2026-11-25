import type { FC } from "react";
import Svg, { Path } from "react-native-svg";

import { EXPO_LOGO_PATH, EXPO_LOGO_VIEWBOX } from "@/constants/expo-logo.const";
import { registerComponent } from "@/utils/register-component.util";

import type { ILogo } from "@/interfaces/logo.interface";

const ExpoLogoBase: FC<ILogo> = ({
  size,
  color,
}: ILogo & React.ComponentProps<typeof ExpoLogoBase>): React.ReactNode &
  React.JSX.Element => (
  <Svg width={size} height={size} viewBox={EXPO_LOGO_VIEWBOX}>
    <Path d={EXPO_LOGO_PATH} fill={color} />
  </Svg>
);

const ExpoLogo = registerComponent("ExpoLogo", ExpoLogoBase);

export { ExpoLogo };
