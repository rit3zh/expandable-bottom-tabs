import { GaussianBlurView } from "expo-backdrop";
import { createAnimatedComponent } from "react-native-reanimated";

import { registerComponent } from "@/utils/register-component.util";

const AnimatedGaussianBlurView = registerComponent(
  "AnimatedGaussianBlurView",
  createAnimatedComponent(GaussianBlurView),
);

export { AnimatedGaussianBlurView };
