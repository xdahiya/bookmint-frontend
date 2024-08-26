"use client";

import React, { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "@/app/theme-provider";

import { useAccount, WagmiProvider } from "wagmi";
import { createWeb3Modal } from "@web3modal/wagmi/react";
// import Moralis from "moralis";
import { config, projectId } from "@/config/web3";
import { GLOABAL_CONSTANTS } from "@/constants";
import { useWeb3Account } from "@/hooks/useAccount";
import { selfUser } from "@/http/client";
import { furoreFont } from "@/app/fonts";
import { Lato } from "next/font/google";
const lato = Lato({
  weight: ["900", "100", "300", "400", "700"],
  subsets: ["latin"],
  variable: "--font-lato",
});
// Create web3 modal
createWeb3Modal({
  // themeMode: (localStorage.getItem("theme") as any) || "dark",
  wagmiConfig: config,
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  // enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true, // Optional - false as default

  themeVariables: {
    "--w3m-accent": "#FF9601",
    "--w3m-font-family": `${lato.className}`,
  },
});

function Common({ children }: any) {
  // async function startMoralis() {
  //   await Moralis.start({
  //     apiKey: GLOABAL_CONSTANTS.MORALIS_API_KEY,
  //   });
  // }

  const { authUser, setAuthUser } = useWeb3Account();

  useEffect(() => {
    try {
      // if (!Moralis.Core.isStarted) {
      //   startMoralis();
      // }
    } catch (error) {
      console.log("error in starting moralis ", error);
    }
  }, []);

  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <NextTopLoader
          color="#FF9601"
          initialPosition={0.08}
          crawlSpeed={100}
          height={5}
          crawl={true}
          showSpinner={true}
          easing="ease"
          speed={100}
          shadow="0 0 10px #18977F,0 0 5px #18977F"
          template='<div class="bar" role="bar"><div class="peg"></div></div> 
  <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
          zIndex={1600}
          showAtBottom={false}
        />
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </ThemeProvider>
    </>
  );
}

export default Common;
