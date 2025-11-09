import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

export const wagmiConfig = getDefaultConfig({
  appName: "Orbix Intellegence",
  projectId: "YOUR_WALLETCONNECT_PROJECT_ID", // Replace with actual WalletConnect project ID
  chains: [mainnet, polygon, optimism, arbitrum],
  ssr: false,
});
