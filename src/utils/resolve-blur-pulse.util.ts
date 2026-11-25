const resolveBlurPulse = <T extends number>(progress: T): T => {
  "worklet";
  return Math.sin(Math.PI * Math.min(Math.max(progress, 0), 1)) as T;
};

export { resolveBlurPulse };
