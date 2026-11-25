import type { FC } from "react";

import { TabScreen } from "@/components/tab-screen";

const ChatsScreen: FC = (): React.ReactNode & React.JSX.Element => (
  <TabScreen title="Chats" shape="row" count={10} searchPlaceholder="Search chats" />
);

export default ChatsScreen;
