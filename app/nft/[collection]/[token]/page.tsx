"use client";
import Image from "next/image";
import { ethers } from "ethers";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  useAccount,
  type BaseError,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

// import { getNFTMetadata } from "@/http/web3";
import { GLOABAL_CONSTANTS } from "@/constants";
import { useWeb3Account } from "@/hooks/useAccount";

import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ChevronLeft, Share } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ApproveAndListComponent } from "./approveAndList";
import { TransferOwner } from "./transferOwner";
import { useUrl } from "nextjs-current-url";
import { compareAddress } from "@/lib/utils";
import { CancelListing } from "./cancelList";
import { getNFTMetadata } from "@/http/client";

export default function Nft() {
  const router = useRouter();
  const { address } = useAccount();
  const { collection: contractId, token } = useParams();
  const { NftSpace, NftMarketPlace } = useWeb3Account();
  const { setIsOpen, setSteps, setCurrentRunning } = useLoadingModal();
  const { pathname, href } = useUrl() ?? {};

  const [nftListingPrice, setNftListingPrice] = useState<number>(10000);
  const [nftBidPrice, setNftBidPrice] = useState<number>(10000);

  const { data, isFetching, isLoading, isError, error } = useQuery({
    queryKey: ["nftdetails", contractId, token],
    gcTime: 1000,
    queryFn: async () => {
      return await getNFTMetadata(contractId as string, token as string);
    },
    // placeholderData: keepPreviousData,
  });

  console.log("DATA OS : ", data);
  //======GETTING OWNER DETAILS AND AUCTIONS=============

  const {
    data: nftListedOwner,
    error: nftListedOwnerError,
    isPending: nftListedOwnerPending,
  } = useReadContract({
    abi: NftSpace.abi,
    address: contractId as `0x${string}`,
    functionName: "ownerOf",
    args: [token],
  }) as any;

  const {
    data: ownerOfNFT,
    error: ownerOfNFTError,
    isPending: ownerOfNFTPending,
  } = useReadContract({
    abi: NftMarketPlace.abi,
    address: GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "ownerOfNft",
    args: [contractId, token],
  }) as any;

  // console.log("nftOwner  : ", ownerOfNFT);

  const { data: nftContractAuctions } = useReadContract({
    abi: NftMarketPlace.abi,
    address: GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
    functionName: "nftContractAuctions",
    args: [contractId, token],
  });
  // console.log("nftContractAuctions :", nftContractAuctions);
  //====== END GETTING OWNER DETAILS AND AUCTIONS=============

  // PLACE BID
  const placeBid = async () => {
    if (nftBidPrice < 1000) {
      toast({
        title: "Put correct nft bid price in gwei ",
      });
      return;
    }

    setSteps([
      {
        id: 1,
        title: "Basic Setup",
        desc: "basic setup for listing nft",
      },
      {
        id: 2,
        title: "Place Bid ",
        desc: "setting the bid in the marketplace",
      },
      {
        id: 3,
        title: "Confiming",
        desc: "waiting for transcaiton to confirm",
      },
    ]);
    setIsOpen(true);
    setCurrentRunning(1);
    setCurrentRunning(2);
    const ammInEthers = ethers.parseUnits(nftBidPrice.toString(), "gwei");
    placeBidWriteContract({
      address:
        GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
      abi: NftMarketPlace.abi,
      functionName: "makeBid",
      value: ammInEthers as bigint,
      args: [contractId, token],
    });
  };

  const {
    data: placeBidHash,
    error: placeBidError,
    isPending: placeBidPending,
    writeContract: placeBidWriteContract,
  } = useWriteContract();

  const { isLoading: isPlaceBidConfirming, isSuccess: isPlaceBidConfirmed } =
    useWaitForTransactionReceipt({
      hash: placeBidHash,
    });

  useEffect(() => {
    if (placeBidError) {
      toast({
        title: "Failded:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {(placeBidError as BaseError).message}{" "}
            </code>
          </pre>
        ),
      });
      setIsOpen(false);
    }
    if (isPlaceBidConfirmed) {
      setCurrentRunning(5);
      toast({
        title: "Success:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">BID DONE</code>
          </pre>
        ),
      });

      router.push(`/profile/${address}/`);

      setIsOpen(false);
    }
  }, [
    isPlaceBidConfirmed,
    placeBidError,
    address,
    router,
    setCurrentRunning,
    setIsOpen,
  ]);

  // END PLACE BID

  //===================BUY NFT=========================
  //buy write contraxt
  const buyNft = async () => {
    setSteps([
      {
        id: 1,
        title: "Basic Setup",
        desc: "basic setup for creating collection",
      },
      {
        id: 2,
        title: "Buying",
        desc: "transfering nft to your account",
      },
      {
        id: 3,
        title: "Done",
        desc: "success",
      },
    ]);
    setIsOpen(true);
    setCurrentRunning(1);
    setCurrentRunning(2);
    if (nftContractAuctions) {
      buyWriteContract({
        address:
          GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
        abi: NftMarketPlace.abi,
        functionName: "buyNow",
        value: (nftContractAuctions as any)[3] as bigint,
        args: [contractId, token],
      });
    }
  };
  const {
    data: buyHash,
    error: buyError,
    isPending: buyPending,
    writeContract: buyWriteContract,
  } = useWriteContract();

  const { isLoading: isBuyConfirming, isSuccess: isBuyConfirmed } =
    useWaitForTransactionReceipt({
      hash: buyHash,
    });

  useEffect(() => {
    if (buyError) {
      toast({
        title: "Failded:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {(buyError as BaseError).message}
            </code>
          </pre>
        ),
      });
      setIsOpen(false);
    }
    if (isBuyConfirmed) {
      setCurrentRunning(3);
      // console.log("buy success");
      toast({
        title: "Success:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">BUY DONE </code>
          </pre>
        ),
      });
      router.push(`/profile/${address}/`);
      setIsOpen(false);
    }
  }, [isBuyConfirmed, address, buyError, router, setCurrentRunning, setIsOpen]);
  //===================END BUY NFT=========================

  if (isFetching || isLoading) {
    return (
      <div className="text-red-800 h-[80vh] w-full flex justify-center items-center">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <h1 className="text-red-800">
        <Loading />
      </h1>
    );
  }

  return (
    <div className="bg-[url('/bg-pattern.png')] bg-contain bg-fixed">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4 p-4">
          <Link href={`/collection/${contractId}`}>
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>

          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            NFT Details
          </h1>

          <Badge variant="outline" className="ml-auto sm:ml-0">
            details
          </Badge>

          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            {/* <Button
              variant="outline"
              size="sm"
              onClick={() => {
                // form.reset();
              }}
            >
              Reset
            </Button> */}

            <Button
              type="submit"
              form="collectionform"
              onClick={() => {
                navigator.clipboard.writeText(href as string);
                toast({ title: "Share Link Copied" });
              }}
              size="sm"
            >
              <Share />
              <span className="ml-2">Share</span>
            </Button>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-2xl px-4 pb-16  sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24">
        <div className="lg:col-span-2 lg:border-r lg:pr-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <Card>
              <CardHeader>
                {/* <CardTitle>
                  <div>
                    <span className="mx-4 text-md">Owner </span>
                    <span className="text-xs">
                      {nftOwner?.substring(0, 4)}***
                      {nftOwner?.substring(
                        nftOwner.length - 5,
                        nftOwner.length
                      )}
                    </span>
                  </div>
                </CardTitle> */}
                {/* <CardDescription>
                  <span className="mx-4 text-md">Collection </span>
                  <span className="text-xs">{data?.name}</span>
                </CardDescription> */}
              </CardHeader>
              <CardContent>
                <div className="p-2 lg:p-4 border-2 rounded-xl">
                  <Image
                    width="100"
                    height="100"
                    src={data?.image.cachedUrl || "/nologo.png"}
                    alt={"product.images[1].alt"}
                    className="h-[50vh] w-full object-contain object-center"
                  />
                </div>
                <div className="mt-10">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>Description</AccordionTrigger>
                      <AccordionContent>{data?.description}</AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Options */}
        <div className="mt-4 lg:row-span-3 lg:mt-0">
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="text-xs">
                  <span>Collection</span>
                  <Link href={`/collection/${contractId}`}>
                    <h1 className="text-xl text-[#18977F] ">{data?.name}</h1>
                  </Link>
                </div>
              </CardTitle>
              <CardDescription>
                {/* {data?.normalized_metadata?.description} */}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <h2 className="sr-only">Product information</h2>
              <div>
                <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                  {data?.normalized_metadata?.name} #{token}
                </h1>

                {ownerOfNFT ? (
                  <p className="text-base">
                    owner {ownerOfNFT?.substring(0, 4)}***
                    {ownerOfNFT?.substring(
                      ownerOfNFT.length - 5,
                      ownerOfNFT.length
                    )}
                  </p>
                ) : (
                  <p className="text-base">
                    owner {nftListedOwner?.substring(0, 4)}***
                    {nftListedOwner?.substring(
                      nftListedOwner.length - 5,
                      nftListedOwner.length
                    )}
                  </p>
                )}

                {compareAddress(
                  nftListedOwner,
                  GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS
                ) && (
                  <div className=" mt-4">
                    <p className="text-base">current price</p>

                    <div className="text-3xl font-bold">
                      {ethers.formatEther(
                        (nftContractAuctions as any) &&
                          (nftContractAuctions as any)[3]
                      )}{" "}
                      Matic
                    </div>
                  </div>
                )}
              </div>

              {/* <p className="text-3xl tracking-tight">100</p> */}

              {compareAddress(
                nftListedOwner,
                GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS
              ) &&
                !compareAddress(ownerOfNFT, address) && (
                  <button
                    onClick={buyNft}
                    className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#FF9601] px-8 py-3 text-base font-medium  hover:bg-[ffb701] focus:outline-none focus:ring-2 focus:ring-[#FF9601] focus:ring-offset-2"
                  >
                    Buy nft
                  </button>
                )}

              {compareAddress(ownerOfNFT, address) && (
                <div className="my-10 w-full">
                  <CancelListing />
                </div>
              )}

              {compareAddress(nftListedOwner, address as string) && (
                <>
                  <div className="my-10 w-full">
                    <ApproveAndListComponent
                      image={data?.normalized_metadata?.image || "/nologo.png"}
                    />
                  </div>
                  <TransferOwner
                    image={data?.normalized_metadata?.image || "/nologo.png"}
                  />
                </>
              )}

              {compareAddress(nftListedOwner, address as string) &&
                !compareAddress(ownerOfNFT, address as string) &&
                false && (
                  <>
                    <div className="flex flex-col w-full  items-center space-x-2 mt-10">
                      <Input
                        className="h-14"
                        value={nftBidPrice}
                        type="number"
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          setNftBidPrice(parseInt(event.target.value));
                        }}
                        placeholder="Listing Price (in gwei)"
                      />

                      <button
                        onClick={placeBid}
                        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#18977F] px-8 py-3 text-base font-medium  hover:bg-[#189597] focus:outline-none focus:ring-2 focus:ring-[#18977F] focus:ring-offset-2"
                      >
                        Place Bid
                      </button>
                    </div>
                  </>
                )}

              {/* {data?.minter_address?.toLocaleLowerCase() ==
                address?.toLocaleLowerCase() && (
                <div>BIDS ON THIS NFT LIST IS FOLLOWING</div>
              )} */}

              <div className="mt-10">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Details</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex gap-4">
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                          <table className="w-full text-sm text-left rtl:text-right ">
                            {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                              <tr>
                                <th scope="col" className="px-6 py-3">
                                  Product name
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Color
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Category
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  Price
                                </th>
                                <th scope="col" className="px-6 py-3">
                                  <span className="sr-only">Edit</span>
                                </th>
                              </tr>
                            </thead> */}
                            <tbody>
                              {[
                                {
                                  name: "Contract Address",
                                  value: contractId,
                                },
                                {
                                  name: "Token Id",
                                  value: token,
                                },
                                {
                                  name: "Chain",
                                  value: "Polygon Amoy",
                                },
                                {
                                  name: "Token Standard",
                                  value: "ERC721",
                                },
                                {
                                  name: "Block Number",
                                  value: data?.block_number,
                                },
                              ].map((item: any, index: number) => {
                                return (
                                  <tr key={index} className=" border-b">
                                    <th
                                      scope="row"
                                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                      {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                      {item.value || "Not Found"}
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="offers">
                    <AccordionTrigger>Offers</AccordionTrigger>
                    <AccordionContent>
                      <div>Coming Soon</div>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Activity</AccordionTrigger>
                    <AccordionContent>
                      <span className="mx-4">View On Polygon Scan</span>
                      <Link
                        target="_blank"
                        href={`https://www.oklink.com/amoy/assets/${contractId}/${token}`}
                      >
                        <Button variant="outline">Polygon Scan</Button>
                      </Link>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* <div className="mt-10">
                <h3 className="text-sm font-medium ">Details</h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    <li className="">
                      <span className="">
                        {data?.normalized_metadata?.description}
                      </span>
                    </li>
                  </ul>
                </div>
              </div> */}

              {/* <div className="mt-10">
                <h2 className="text-sm font-medium overflow-scroll">
                  x
                </h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm ">{}</p>
                </div>
              </div> */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
