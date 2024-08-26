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

export function NftCardAch({
  token_uri,
  contract_address,
  token_id,
  nft,
}: {
  token_uri: string;
  contract_address: string;
  token_id: number;
  nft: any;
}) {
  // const { id } = useParams();
  const { NftMarketPlace } = useWeb3Account();
  const [nftData, setNftData] = useState<any>(null);

  const aspectRatio = "portrait";

  return (
    <div className="space-y-3 border-2 rounded-xl relative">
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
            src={nft.image.thumbnailUrl || "/loading.gif"}
            className={cn(
              "h-auto w-auto object-contain transition-all hover:scale-105",
              aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
            )}
          />
        </div>
      </Link>

      <div className="space-y-1 text-sm p-4 pb-8 w-[250px]">
        <h3 className="font-medium leading-none">{nft?.name}</h3>
        <p className=" line-clamp-2 text-xs text-muted-foreground">
          {nft?.description}
        </p>
      </div>
    </div>
  );
}
