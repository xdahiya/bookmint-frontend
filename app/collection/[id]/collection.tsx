"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Link from "next/link";
import {
  CalendarCheck,
  CalendarDays,
  ChevronLeft,
  Crown,
  Earth,
  EllipsisVertical,
  FileDown,
  LayoutList,
  ListFilter,
  ListOrdered,
  PlusCircle,
  Scan,
  Search,
  Share,
  Twitter,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useMemo, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useAccount, useReadContract } from "wagmi";
import { useParams, useSearchParams } from "next/navigation";
import { getCollection, getUser } from "@/http/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useWeb3Account } from "@/hooks/useAccount";
import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "lodash";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useUrl } from "nextjs-current-url";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog } from "@/components/ui/dialog";
import { compareAddress } from "@/lib/utils";
import OwnedNftsTab from "@/app/nft-tabs/col-owned-nfts";
import AllNftsTab from "@/app/nft-tabs/all-nfts";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Collection() {
  const searchParams = useSearchParams();
  const { NftSpace } = useWeb3Account();
  const { id } = useParams();
  const { address } = useAccount();
  const { href } = useUrl() ?? {};

  const [searchQuery, setSearchQuery] = useState("");

  const {
    data: collectionData,
    isFetching: collectionDataFetching,
    isLoading: collectionDataLoading,
    isError: collectionDataIsError,
    error: collectionDataError,
  } = useQuery({
    queryKey: ["collection", id],
    gcTime: 1000,
    queryFn: async () => {
      return getCollection(id as string).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  //collectionOwner
  const {
    data: collectionOwner,
    error: collectionOwnerError,
    isPending: collectionOwnerPending,
  } = useReadContract({
    abi: NftSpace.abi,
    address: id as `0x${string}`,
    functionName: "owner",
  }) as any;

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      if (value) {
        setSearchQuery(value);
      } else {
        setSearchQuery("");
      }
    }, 500);
  }, []);

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex flex-col sm:gap-2 sm:py-2">
          <header className="z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Link href={`/marketplace`}>
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                </Link>

                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Collections
                </h1>

                <Badge variant="outline" className="ml-auto sm:ml-0">
                  nfts
                </Badge>

                <div className="hidden items-center gap-2 md:ml-auto md:flex">
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
          </header>

          <main className="flex flex-col justify-center gap-4 p-4 sm:px-2 sm:py-0 md:gap-2">
            {/* collection info topbar */}
            <div className=" border-2 rounded-lg border-b backdrop-blur-sm bg-white/[0.5] dark:bg-black/[0.5] border-neutral-200 dark:border-white/[0.1]">
              {/* banner image */}
              <div className="rounded-t-lg h-32 md:h-96 overflow-hidden">
                <Image
                  width={1000}
                  height={400}
                  className="object-cover rounded-xl h-full w-full"
                  src={
                    (collectionData && collectionData?.banner) ||
                    "/loading-horizonal.gif"
                  }
                  alt="Banner Image"
                />
              </div>

              {/* logo image */}
              <div className="flex justify-center items-center mx-auto w-32 h-32  relative -mt-16 border-4 border-white rounded-full overflow-hidden">
                <Image
                  width={200}
                  height={200}
                  className="object-cover bg-[#18977F] object-center w-32 h-32"
                  src={
                    (collectionData && collectionData?.logo) || "/loading.gif"
                  }
                  alt="Logo Image"
                />
              </div>

              {/* collection info section */}
              <section id="collection-info">
                <div className="p-2 lg:p-8 flex items-center lg:justify-between gap-x-2">
                  <div className="min-w-0 flex-1">
                    {/* first row */}
                    <div className="flex justify-between">
                      <h2 className="text-2xl font-bold leading-7  sm:truncate sm:text-3xl sm:tracking-tight">
                        {(collectionData && collectionData?.name) || ""}
                      </h2>

                      <div className="flex gap-x-4">
                        {/* {compareAddress(collectionOwner, address) && (
                          <EditCollection collection={collectionData} />
                        )} */}

                        <div className="flex">
                          {collectionData?.url && (
                            <Link target="_blank" href={collectionData?.url}>
                              <Button variant="outline" size="icon">
                                <Earth className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                        <div className="flex">
                          {collectionData?.twitterUrl && (
                            <Link
                              target="_blank"
                              href={collectionData?.twitterUrl}
                            >
                              <Button variant="outline" size="icon">
                                <Twitter className="h-4 w-4" />
                              </Button>
                            </Link>
                          )}
                        </div>
                        <div className=" flex">
                          <Dialog>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant={`outline`} size={"sm"}>
                                  <EllipsisVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent>
                                <DropdownMenuLabel>
                                  Collection
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                {compareAddress(collectionOwner, address) && (
                                  <DropdownMenuItem>
                                    <Link
                                      href={`/collection/${id}/updateform`}
                                      className="p-2"
                                    >
                                      {/* <Button variant="outline"> */}
                                      Edit Collection
                                      {/* </Button> */}
                                    </Link>
                                  </DropdownMenuItem>
                                )}

                                <DropdownMenuItem>
                                  <Link
                                    target="_blank"
                                    href={`https://www.oklink.com/amoy/token/${id}`}
                                    className="p-2"
                                  >
                                    {/* <Button variant="outline"> */}
                                    Polygon Scan
                                    {/* </Button> */}
                                  </Link>
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </Dialog>
                        </div>
                      </div>
                    </div>

                    <Accordion
                      type="single"
                      collapsible
                      className="w-full lg:hidden"
                    >
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Read More ...</AccordionTrigger>
                        <AccordionContent>
                          <CollectionInfo collectionData={collectionData} />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    <div className="hidden lg:block">
                      <CollectionInfo collectionData={collectionData} />
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* tabs */}
            <Tabs
              defaultValue={searchParams.get("tab") || "all"}
              onValueChange={(category) => {
                if (category == "all") {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("tab", category);
                  window.history.pushState(null, "", `?`);
                } else {
                  const params = new URLSearchParams(searchParams.toString());
                  params.set("tab", category);
                  window.history.pushState(null, "", `?${params.toString()}`);
                }
              }}
            >
              <header>
                <div className="flex flex-col lg:flex-row items-center  ">
                  <div className="w-full overflow-scroll">
                    <TabsList>
                      <TabsTrigger value="all">All</TabsTrigger>
                      {/* <TabsTrigger value="listed">Listed</TabsTrigger> */}
                      {/* <TabsTrigger value="owned">Owned</TabsTrigger> */}
                      <TabsTrigger value="offers">Offers</TabsTrigger>
                      <TabsTrigger value="analytics">Analytics</TabsTrigger>
                      <TabsTrigger value="activity">Activity</TabsTrigger>
                    </TabsList>
                  </div>

                  <div className="mt-2 lg:mt-0 flex items-center gap-2 justify-between px-4 w-full">
                    <div className="relative  flex xl:-ml-[18%]">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        onChange={(event: ChangeEvent<HTMLInputElement>) => {
                          debouncedQUpdate(event.target.value);
                        }}
                        type="search"
                        placeholder="Search..."
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                      />
                    </div>

                    <div className="flex gap-x-2">
                      {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 gap-1"
                          >
                            <ListFilter className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Sort
                            </span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuCheckboxItem checked>
                            Price
                          </DropdownMenuCheckboxItem>
                          <DropdownMenuCheckboxItem>
                            Popular
                          </DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                      </DropdownMenu> */}

                      {/* <FilterDrawer onFilterChange={onFilterChange} /> */}

                      {/* <div className="mx-1">
                        <Button size="sm" className="h-8 gap-1">
                          <FileDown className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Export
                          </span>
                        </Button>
                      </div> */}

                      <div>
                        <Link href={"/create"}>
                          <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                              Create
                            </span>
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </header>

              <TabsContent value="all">
                <AllNftsTab
                  contractId={id as string}
                  address={address}
                  searchQuery={searchQuery}
                />
              </TabsContent>

              <TabsContent value="owned">
                <OwnedNftsTab
                  contractId={id as string}
                  address={address}
                  searchQuery={searchQuery}
                />
              </TabsContent>

              <TabsContent value="offers">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="border-b backdrop-blur-sm bg-white/[0.5] dark:bg-black/[0.5] border-neutral-200 dark:border-white/[0.1] "
                >
                  <div className="min-h-[60vh] w-full p-8 rounded-sm flex justify-center items-center flex-col ">
                    <h1 className="pb-10">Offers Coming Soon</h1>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="analytics">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="border-b backdrop-blur-sm bg-white/[0.5] dark:bg-black/[0.5] border-neutral-200 dark:border-white/[0.1] "
                >
                  <div className="min-h-[60vh] w-full p-8 rounded-sm flex justify-center items-center flex-col ">
                    <h1 className="pb-10">Analytics Coming Soon</h1>
                  </div>
                </Card>
              </TabsContent>

              <TabsContent value="activity">
                <Card
                  x-chunk="dashboard-06-chunk-0"
                  className="border-b backdrop-blur-sm bg-white/[0.5] dark:bg-black/[0.5] border-neutral-200 dark:border-white/[0.1] "
                >
                  <div className="min-h-[60vh] w-full p-8 rounded-sm flex justify-center items-center flex-col ">
                    <h1 className="pb-10">View Activity In Polygon Scan</h1>
                    <Link
                      target="_blank"
                      href={`https://www.oklink.com/amoy/token/${id}`}
                    >
                      <Button size="sm" className="h-8 gap-1">
                        <Scan />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap mb-10">
                          Polygon Scan
                        </span>
                      </Button>
                    </Link>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  );
}

function CollectionInfo({ collectionData }: any) {
  const { id } = useParams();
  const { account, NftSpace } = useWeb3Account();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  //totalsupply
  const {
    data: totalSupply,
    error: totalSupplyError,
    isPending: totalSupplyPending,
  } = useReadContract({
    abi: NftSpace.abi,
    address: id as `0x${string}`,
    functionName: "totalSupply",
  }) as any;

  //collectionOwner
  const {
    data: collectionOwner,
    error: collectionOwnerError,
    isPending: collectionOwnerPending,
  } = useReadContract({
    abi: NftSpace.abi,
    address: id as `0x${string}`,
    functionName: "owner",
  }) as any;

  // //balance
  // const {
  //   data: balance,
  //   error: balanceError,
  //   isPending: balancePending,
  // } = useReadContract({
  //   abi: NftSpace.abi,
  //   address: id as `0x${string}`,
  //   functionName: "balanceOf",
  //   args: [account],
  // }) as any;

  const date = new Date(collectionData?.createdAt);
  // console.log("DATE IS : ", date);
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const [showTruncate, setShowTruncate] = useState(false);

  const {
    data: userDetails,
    isFetching: userDetailsisFetching,
    isLoading: userDetailsisLoading,
    isPending: userDetailsisPending,
    isError: userDetailsisError,
    error: userDetailserror,
  } = useQuery({
    queryKey: ["getuser", collectionOwner],
    gcTime: 1000,
    queryFn: () => {
      return getUser(collectionOwner as string).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
    enabled: !!collectionOwner,
  });

  return (
    <div className="flex-col">
      <div
        className={`text-md max-w-md ${showTruncate ? "" : "truncate"}`}
        onClick={() => {
          setShowTruncate((state) => !state);
        }}
      >
        {collectionData && collectionData.description}
      </div>
      <div className=" md:flex mt-1  flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
        <div className="mt-2 flex items-center text-sm gap-x-2">
          <LayoutList />

          {(collectionData && collectionData?.category) || ""}
        </div>
        <div className="mt-2 flex items-center text-sm gap-x-2">
          <ListOrdered />
          {totalSupply && (
            <p className="text-xs">Total NFTs {` ${totalSupply}`}</p>
          )}
        </div>

        <div className="mt-2 flex items-center text-sm gap-x-2">
          <Image
            className="w-[28px] h-[28px]"
            alt="arbitrum"
            src={"/arbitrum-arb-logo.png"}
            width={64}
            height={64}
          />
          <p className="text-xs">{`Arbitrum`}</p>
        </div>

        {/* <div className="mt-2 flex items-center text-sm gap-x-2">
        <CircleDollarSign />
        {balance && <p className="text-xs "> Balance {`  ${balance}`}</p>}
      </div> */}

        <div className="mt-2 flex items-center text-sm gap-x-2">
          <Crown />
          {collectionOwner && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <Link href={`/profile/${collectionOwner}`}>
                  <p className="text-xs">
                    Owned By
                    {account == collectionOwner
                      ? ` You`
                      : ` ${collectionOwner?.substring(
                          0,
                          4
                        )}***${collectionOwner?.substring(
                          collectionOwner.length - 5,
                          collectionOwner.length
                        )}`}
                  </p>
                </Link>
              </HoverCardTrigger>
              <HoverCardContent className="w-80 z-10">
                <div className="flex space-x-4">
                  <Avatar>
                    <AvatarImage src={userDetails?.avatar} />
                    <AvatarFallback>VC</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">
                      @{`${userDetails?.username}`}
                    </h4>
                    <p className="text-sm flex items-center">
                      {userDetails?.description
                        ? userDetails?.description
                        : "NFT enthusiast trading unique digital assets on NFTSpace"}
                    </p>
                    {/* <div className="flex items-center pt-2">
                      <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                      <span className="text-xs text-muted-foreground">
                        Joined December 2021
                      </span>
                    </div> */}
                  </div>
                </div>
              </HoverCardContent>
            </HoverCard>
          )}
        </div>

        <div className="mt-2 flex items-center text-sm gap-x-2">
          <CalendarCheck />
          {collectionData?.createdAt && (
            <p className="text-xs">
              Created At
              {` ${month} ${year}`}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
