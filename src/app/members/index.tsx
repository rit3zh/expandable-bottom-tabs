import type { FC } from "react";

import { TabScreen } from "@/components/tab-screen";

const MembersScreen: FC = (): React.ReactNode & React.JSX.Element => (
  <TabScreen title="Members" shape="row" count={10} searchPlaceholder="Search members" />
);

export default MembersScreen;
