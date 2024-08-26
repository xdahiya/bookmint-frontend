"use client";
import { ethers } from "ethers";
import { useCallback, useContext } from "react";
import { MetaMaskInpageProvider } from "@metamask/providers";
import { GlobalContext, ContextType } from "@/app/providers";
import { useAccount } from "wagmi";

// import { CoinbaseWalletSDK } from "@coinbase/wallet-sdk";

import NftSpace from "@/contracts/Nft.sol/NFTSpace.json";
import NftMarketPlace from "@/contracts/Marketplace.sol/NFTAuction.json";
// import { useWeb3Modal } from "@web3modal/ethers/react";
// import Web3Modal from "web3modal";
// import { coinbasewallet } from "web3modal/dist/providers/connectors";
// declare global {
//   interface Window {
//     ethereum?: MetaMaskInpageProvider;
//   }
// }

// const pinataSDK = require("@pinata/sdk");
// const pinata = new pinataSDK({
//   pinataApiKey: "087c8735e164246c4a49",
//   pinataSecretApiKey:
//     "53bed7671c5af06c3bd642d6669d7ab4bb87d1e5a0b927915b289f34796924aa",
// });

// const providerOptions = {
//   coinbasewallet: {
//     package: CoinbaseWalletSDK,
//     options: {
//       appName: "NFTSpace",
//       infuraId: { 3: "https://test.com" },
//     },
//   },
// };

export const useWeb3Account = () => {
  // const { open } = useWeb3Modal();

  const { account, authUser, setAuthUser, setAccount, provider, setProvider } =
    useContext(GlobalContext) as ContextType;

  // const requestGetAccount = useCallback(async () => {
  //   try {
  //     const { ethereum } = window;
  //     if (ethereum == null) {
  //       console.log("METAMASK NOT INSTALLED");
  //     } else {
  //       const account: string[] = (await ethereum.request({
  //         method: "eth_requestAccounts",
  //       })) as string[];
  //       setAccount(account[0]);
  //       ethereum.on("accountsChanged", (_acc) => {
  //         window.location.reload();
  //       });
  //       setAccount(account[0]);
  //       const provider = new ethers.BrowserProvider(ethereum);
  //       setProvider(provider);
  //     }

  //     // const signer = provider.getSigner(); //write the blockchain

  //     // const contract = new ethers.Contract(
  //     //   contractAddres,
  //     //   contractABI,
  //     //   signer
  //     // );
  //     // console.log(contract);
  //     // setState({ provider, signer, contract });
  //   } catch (error) {
  //     console.log("ERROR IN GETTING METAMASK ACCOUNT ", error);
  //   }
  // }, [setAccount, setProvider]);

  async function requestGetAccount() {
    // try {
    //   let web3modal = new Web3Modal({
    //     cacheProvider: false,
    //     providerOptions,
    //   });
    //   const web3ModalInstance = await web3modal.connect();
    //   const account: string[] = (await web3ModalInstance.request({
    //     method: "eth_requestAccounts",
    //   })) as string[];
    //   setAccount(account[0]);
    //   web3ModalInstance.on("accountsChanged", () => {
    //     window.location.reload();
    //   });
    //   const provider = new ethers.BrowserProvider(web3ModalInstance);
    //   // console.log("provider is :", provider);
    //   // const accounts: any = await provider.provider.listAccounts();
    //   // setAccount(accounts[0].address);
    //   // console.log("accounts is :", accounts);
    //   setProvider(provider);
    //   const signer = await provider.getSigner(); //write the blockchain
    //   // const contract = new ethers.Contract(contractAddres, contractABI, signer);
    //   // console.log(contract);
    //   // setState({ provider, signer, contract });
    // } catch (error) {
    //   console.log("error in connection :", error);
    // }
  }

  return {
    account,
    provider,
    setProvider,
    NftSpace,
    NftMarketPlace,
    setAccount,
    authUser,
    setAuthUser,
    // requestGetAccount,
    // pinata,
  };
};
