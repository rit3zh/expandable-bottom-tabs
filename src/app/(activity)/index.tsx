import type { FC } from "react";

import { TabScreen } from "@/components/tab-screen";

const ActivityScreen: FC = (): React.ReactNode & React.JSX.Element => (
  <TabScreen title="Activity" shape="card" count={4} />
);

export default ActivityScreen;
