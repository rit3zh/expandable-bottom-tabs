import { ExpoLogo } from "@/components/ui/expo-logo";
import type { IAccount, IWorkspace } from "@/interfaces/expandable-tab-bar.interface";

const WORKSPACE_CURRENT: IWorkspace = {
  caption: "1.2k Members",
  isVerified: true,
  logo: ExpoLogo,
  name: "Expo",
};

const ACCOUNT_CURRENT: IAccount = {
  avatar: "https://i.pinimg.com/736x/63/4c/66/634c6654633e49ad9c649de9bd3335e4.jpg",
  id: "rit3zh",
  name: "rit3zh",
};

export { ACCOUNT_CURRENT, WORKSPACE_CURRENT };
