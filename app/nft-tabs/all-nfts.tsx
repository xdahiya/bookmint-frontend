"use client";
import { debounce } from "lodash";
import { useReadContract } from "wagmi";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { GLOABAL_CONSTANTS } from "@/constants";
import { useWeb3Account } from "@/hooks/useAccount";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import Loading from "@/components/Loading";
import { NftCard } from "@/app/nft-tabs/nftCard";

import { cn } from "@/lib/utils";
import { playlists } from "./data/playlists";
import { Button } from "@/components/ui/button";

import { Bold, Filter, Italic, Underline } from "lucide-react";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getContractNFTs } from "@/http/client";
import { NftCardAch } from "./nftCardAch";

//all nfts in a collection/contract
export default function AllNftsTab({
  searchQuery,
  contractId,
  address,
}: {
  searchQuery: string;
  contractId?: string;
  address?: string;
}) {
  const { NftSpace } = useWeb3Account();
  const [filteredColls, setFilteredColls] = useState<any>([]);

  //collection nfts
  const {
    data: collectionNFTs,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["collectionnfts", contractId],
    gcTime: 1000,
    queryFn: async () => {
      return getContractNFTs(contractId as string);
    },
    placeholderData: keepPreviousData,
  });

  console.log("collectionNFTs :", collectionNFTs?.nfts);

  // owned nfts
  const {
    data: ownedNfts,
    error: ownedNftsError,
    isPending: ownedNftsPending,
  } = useReadContract({
    abi: NftSpace.abi,
    address: contractId as `0x${string}`,
    functionName: "getOwnedNFTs",
    args: [address],
  }) as any;

  //listed nfts
  const {
    data: listedNfts,
    error: listedNftsError,
    isPending: listedNftsPending,
  } = useReadContract({
    abi: NftSpace.abi,
    address: contractId as `0x${string}`,
    functionName: "getOwnedNFTs",
    args: [GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS],
  }) as any;

  useEffect(() => {
    if (collectionNFTs?.result) {
      if (searchQuery && searchQuery != "") {
        const newResult = collectionNFTs?.result.filter((item: any) =>
          item.normalized_metadata?.name
            ?.toLowerCase()
            ?.includes(searchQuery.toLowerCase() as string)
        );
        // console.log("new Result ", newResult);
        setFilteredColls(newResult);
      } else {
        setFilteredColls(collectionNFTs?.result);
      }
    }
  }, [collectionNFTs, searchQuery]);

  const debouncedPriceRangeUpdate = useMemo(() => {
    return debounce((value: any) => {
      if (value) {
        console.log("princerafe ", value);
      } else {
        console.log("nonn prc ", value);
      }
    }, 500);
  }, []);

  const onFilterChange = (changedFields: any) => {
    if (changedFields["name"] == "priceRange") {
      debouncedPriceRangeUpdate(changedFields);
    }

    if (changedFields["name"] == "owner") {
      if (changedFields["value"] == "you") {
        // const newResult = data?.result.filter(
        //   (item) => item.minter_address == address?.toLocaleLowerCase()
        // );
        // setFilteredCollectionsData(newResult);
        setFilteredColls(ownedNfts);
      } else {
        setFilteredColls(collectionNFTs?.result);
      }
    }

    if (changedFields["name"] == "listedOnly") {
      if (changedFields["value"] == true) {
        // const newResult = data?.result.filter(
        //   (item) => item.minter_address == address?.toLocaleLowerCase()
        // );
        // setFilteredCollectionsData(newResult);
        setFilteredColls(listedNfts);
      } else {
        setFilteredColls(collectionNFTs?.result);
      }
    }

    if (changedFields["name"] == "currency") {
      if (changedFields["value"] == "nfs") {
        setFilteredColls([]);
      } else {
        setFilteredColls(collectionNFTs?.result);
      }
    }
  };

  return (
    <div>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardContent>
          <div className="border-t">
            <div className="bg-background">
              <div className="grid lg:grid-cols-5">
                <div className="lg:hidden mt-4">
                  <FilterDrawer onFilterChange={onFilterChange} />
                </div>

                <Sidebar
                  onFilterChange={onFilterChange}
                  className="hidden lg:block "
                />
                <div className="lg:border-l w-[80vw] lg:w-[75vw]">
                  <div className="h-full px-4 py-6 lg:px-8">
                    <div className="relative">
                      <ScrollArea className="h-[80vh]">
                        <div className="flex flex-wrap justify-center gap-4 pb-4">
                          {isLoading && <Loading />}
                          {isError && (
                            <h1 className="text-red-800 p-10">
                              ERROR! {(isError as any).message}
                            </h1>
                          )}

                          {collectionNFTs &&
                            collectionNFTs?.result &&
                            filteredColls &&
                            filteredColls.length == 0 && (
                              <h5>NO NFTS FOUND IN THIS COLLECTION</h5>
                            )}

                          {collectionNFTs &&
                            collectionNFTs?.nfts.map((nft: any, index: any) => {
                              return (
                                <NftCardAch
                                  key={nft.token_id || nft.tokenId}
                                  contract_address={contractId as string}
                                  token_id={nft.token_id || nft.tokenId}
                                  token_uri={nft.token_uri || nft.tokenURI}
                                  nft={nft}
                                />
                              );
                            })}
                        </div>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </div>
                    {/* {false && (
                        <>
                          <div className="mt-6 space-y-1">
                            <h2 className="text-2xl font-semibold tracking-tight">
                              Made for You
                            </h2>
                            <p className="text-sm text-muted-foreground">
                              Your personal playlists. Updated daily.
                            </p>
                          </div>
                          <Separator className="my-4" />
                          <div className="relative">
                            <ScrollArea>
                              <div className="flex space-x-4 pb-4">
                                {madeForYouAlbums.map((album) => (
                                  <AlbumArtwork
                                    key={album.name}
                                    album={album}
                                    className="w-[150px]"
                                    aspectRatio="square"
                                    width={150}
                                    height={150}
                                  />
                                ))}
                              </div>
                              <ScrollBar orientation="horizontal" />
                            </ScrollArea>
                          </div>
                        </>
                      )} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function Sidebar({ className, onFilterChange }: any) {
  const [value, setValue] = useState([0]);

  return (
    <div className={cn("", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Filter NFTs
          </h2>
          <div className="space-y-8">
            <Select
              onValueChange={(value: string) => {
                onFilterChange({ name: "owner", value: value });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Owner" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Owned By</SelectLabel>
                  <SelectItem value="you">You</SelectItem>
                  <SelectItem value="anyone">All</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value: string) => {
                onFilterChange({ name: "currency", value: value });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Owned By</SelectLabel>
                  <SelectItem value="matic">Matic</SelectItem>
                  {/* <SelectItem value="nfs">NFS</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* <div className="grid gap-2 pt-2">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <div className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="top-p">NFT Price</Label>
                      <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground hover:border-border">
                        {value}
                      </span>
                    </div>
                    <Slider
                      id="top-p"
                      max={10}
                      defaultValue={value}
                      step={0.1}
                      onValueChange={(val) => {
                        setValue(val);
                        onFilterChange({ name: "priceRange", value: val });
                      }}
                      className="[&_[role=slider]]:h-4 [&_[role=slider]]:w-4"
                      aria-label="Top P"
                    />
                  </div>
                </HoverCardTrigger>
                {false && (
                  <HoverCardContent
                    align="start"
                    className="w-[260px] text-sm"
                    side="left"
                  >
                    filter nft price.
                  </HoverCardContent>
                )}
              </HoverCard>
            </div> */}

            <div className="flex items-center space-x-2">
              <Switch
                id="airplane-mode"
                onCheckedChange={(value: boolean) => {
                  onFilterChange({ name: "listedOnly", value: value });
                }}
              />
              <Label htmlFor="airplane-mode">Listed Only</Label>
            </div>

            {false && (
              <ToggleGroup type="single">
                <ToggleGroupItem value="bold" aria-label="Toggle bold">
                  <Bold className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem value="italic" aria-label="Toggle italic">
                  <Italic className="h-4 w-4" />
                </ToggleGroupItem>
                <ToggleGroupItem
                  value="underline"
                  aria-label="Toggle underline"
                >
                  <Underline className="h-4 w-4" />
                </ToggleGroupItem>
              </ToggleGroup>
            )}

            {false && (
              <div>
                <Button variant="secondary" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polygon points="10 8 16 12 10 16 10 8" />
                  </svg>
                  Listen Now
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <rect width="7" height="7" x="3" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="3" rx="1" />
                    <rect width="7" height="7" x="14" y="14" rx="1" />
                    <rect width="7" height="7" x="3" y="14" rx="1" />
                  </svg>
                  Browse
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4"
                  >
                    <path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9" />
                    <path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5" />
                    <path d="M19.1 4.9C23 8.8 23 15.1 19.1 19" />
                  </svg>
                  Radio
                </Button>
              </div>
            )}
          </div>
        </div>

        {false && (
          <div className="px-3 py-2">
            <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
              Library
            </h2>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M21 15V6" />
                  <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  <path d="M12 12H3" />
                  <path d="M16 6H3" />
                  <path d="M12 18H3" />
                </svg>
                Playlists
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <circle cx="8" cy="18" r="4" />
                  <path d="M12 18V2l7 4" />
                </svg>
                Songs
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Made for You
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="m12 8-9.04 9.06a2.82 2.82 0 1 0 3.98 3.98L16 12" />
                  <circle cx="17" cy="7" r="5" />
                </svg>
                Artists
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="m16 6 4 14" />
                  <path d="M12 6v14" />
                  <path d="M8 8v12" />
                  <path d="M4 4v16" />
                </svg>
                Albums
              </Button>
            </div>
          </div>
        )}

        {/* ANOTHER SCROLL AREA */}
        {false && (
          <div className="py-2">
            <h2 className="relative px-7 text-lg font-semibold tracking-tight">
              Playlists
            </h2>
            <ScrollArea className="h-[300px] px-1">
              <div className="space-y-1 p-2">
                {playlists?.map((playlist, i) => (
                  <Button
                    key={`${playlist}-${i}`}
                    variant="ghost"
                    className="w-full justify-start font-normal"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2 h-4 w-4"
                    >
                      <path d="M21 15V6" />
                      <path d="M18.5 18a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      <path d="M12 12H3" />
                      <path d="M16 6H3" />
                      <path d="M12 18H3" />
                    </svg>
                    {playlist}
                  </Button>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}

export function FilterDrawer({ onFilterChange }: any) {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <div className="flex gap-x-2 lg:hidden">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Filter className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Filter
            </span>
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="mx-auto lg:w-[50vw]">
        <div className="h-[50vh] overflow-scroll">
          <DrawerHeader>
            <DrawerTitle>Filter NFTs?</DrawerTitle>
            <DrawerDescription>
              nfts filter according to your intrests.
            </DrawerDescription>
          </DrawerHeader>
          <Sidebar onFilterChange={onFilterChange} />
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose asChild>
              <Button>
                <div>Apply</div>
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
