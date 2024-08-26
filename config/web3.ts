import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { cookieStorage, createStorage } from "wagmi";
import {
  mainnet,
  sepolia,
  arbitrumSepolia,
  polygonAmoy,
  avalancheFuji,
} from "wagmi/chains";

// Get projectId at https://cloud.walletconnect.com
// export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID;
export const projectId = "440f0f5016ff3ec67c7b55910c473bf6";

if (!projectId) throw new Error("Project ID is not defined");

const metadata = {
  name: "NFTSpace ",
  description: "NFTSpace Example",
  url: "https://web3modal.com", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// Create wagmiConfig
const chains = [
  // polygonAmoy
  // avalancheFuji,
  arbitrumSepolia,
] as const;

export const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
