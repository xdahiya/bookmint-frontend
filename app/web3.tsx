"use client";

import { useAccount } from "wagmi";
import React, { useEffect } from "react";
import { useWeb3Account } from "@/hooks/useAccount";

function Web3({ children }: any) {
  const { address } = useAccount();
  const { setAccount } = useWeb3Account();

  useEffect(() => {
    if (address) {
      setAccount(address);
    }
  }, [address, setAccount]);

  return <>{children}</>;
}

export default Web3;
