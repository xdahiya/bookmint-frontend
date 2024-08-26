"use client";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { ethers } from "ethers";
import { useAccount, useReadContract } from "wagmi";
import Loading from "@/components/Loading";
import { useParams } from "next/navigation";
import { GLOABAL_CONSTANTS } from "@/constants";
import React, { useEffect, useState } from "react";
import { useWeb3Account } from "@/hooks/useAccount";
import { cn, compareAddress } from "@/lib/utils";
import { Crown } from "lucide-react";

export function NftCard({
  token_uri,
  contract_address,
  token_id,
}: {
  token_uri: string;
  contract_address: string;
  token_id: number;
}) {
  // const { id } = useParams();
  const { NftMarketPlace } = useWeb3Account();
  const [nftData, setNftData] = useState<any>(null);

  const getNftMetaData = async (url: string) => {
    try {
      const data = await axios.get(url);
      setNftData(data.data);
    } catch (error) {
      console.log("error in getting metadata : ", error);
    }
  };

  const { address } = useAccount();

  const {
    data: ownerOfNFT,
    error: ownerOfNFTError,
    isPending: ownerOfNFTPending,
  } = useReadContract({
    abi: NftMarketPlace.abi,
    address: GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "ownerOfNft",
    args: [contract_address, token_id],
  }) as any;

  const {
    data: nftContractAuctions,
    isError,
    isPending,
  } = useReadContract({
    abi: NftMarketPlace.abi,
    address: GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "nftContractAuctions",
    args: [contract_address, token_id],
  });

  useEffect(() => {
    getNftMetaData(token_uri);
  }, [token_uri]);

  if (!nftData) {
    return <Loading />;
  }

  const aspectRatio = "portrait";

  return (
    <div className="space-y-3 border-2 rounded-xl relative">
      {compareAddress(ownerOfNFT, address as string) && (
        <div
          className="
      absolute top-0 right-0 pt-4 pr-2"
        >
          <Crown />
        </div>
      )}

      <div
        className="
      absolute top-0 left-0 pt-2 pl-2"
      >
        <Image
          className="w-[28px] h-[28px]"
          alt="polygon"
          src={"/icons8-polygon-64.png"}
          width={64}
          height={64}
        />
      </div>
      <Link href={`/nft/${contract_address}/${token_id}`}>
        <div className="overflow-hidden rounded-md flex flex-col w-[250px]">
          <Image
            alt={"nft-image"}
            width={250}
            height={330}
            src={nftData?.image || "/loading.gif"}
            className={cn(
              "h-auto w-auto object-contain transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </div>
      </Link>

      <div className="space-y-1 text-sm p-4 pb-8 w-[250px]">
        <h3 className="font-medium leading-none">
          {nftData?.name}

          <span className="px-4 font-bold float-right">
            {(nftContractAuctions as any) &&
              ethers.formatEther((nftContractAuctions as any)[3]) != "0.0" &&
              ethers.formatEther((nftContractAuctions as any)[3]) + " Matic"}
          </span>
        </h3>
        <p className=" line-clamp-2 text-xs text-muted-foreground">
          {nftData?.description}
        </p>
      </div>
    </div>
  );
}
