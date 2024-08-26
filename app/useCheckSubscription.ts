"use client";
import { useAccount, useReadContract } from "wagmi";
import BookCollection from "../config/BookCollectionAbi.json";

function useCheckSubscription() {
  const { address } = useAccount();

  const { data: data1 } = useReadContract({
    abi: BookCollection,
    address: "0x8be62c6d7e82319cfde9f92b35d8d6824bba726f",
    functionName: "balanceOf",
    args: [address, 0],
  });

  const { data: data2 } = useReadContract({
    abi: BookCollection,
    address: "0x8be62c6d7e82319cfde9f92b35d8d6824bba726f",
    functionName: "balanceOf",
    args: [address, 1],
  });

  const { data: data3 } = useReadContract({
    abi: BookCollection,
    address: "0x8be62c6d7e82319cfde9f92b35d8d6824bba726f",
    functionName: "balanceOf",
    args: [address, 2],
  });

  return {
    balance1: data1 ? Number(data1) : 0,
    balance2: data2 ? Number(data2) : 0,
    balance3: data3 ? Number(data3) : 0,
  };
}

export default useCheckSubscription;
