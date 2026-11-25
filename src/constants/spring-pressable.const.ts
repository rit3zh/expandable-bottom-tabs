import type { WithSpringConfig } from "react-native-reanimated";

const SPRING_PRESS_SCALE = 0.84;
const SPRING_PULSE_SCALE = 1.18;
const SPRING_PRESS_IN: WithSpringConfig = { duration: 180, dampingRatio: 0.9 };
const SPRING_PRESS_OUT: WithSpringConfig = { duration: 520, dampingRatio: 0.38 };
const SPRING_PULSE_UP: WithSpringConfig = { duration: 140, dampingRatio: 1 };

export {
  SPRING_PRESS_IN,
  SPRING_PRESS_OUT,
  SPRING_PRESS_SCALE,
  SPRING_PULSE_SCALE,
  SPRING_PULSE_UP,
};
