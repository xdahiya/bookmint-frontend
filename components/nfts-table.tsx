"use client";

import Image from "next/image";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import Link from "next/link";

import Loading from "@/components/Loading";

function isIterable(obj: any) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj[Symbol.iterator] === "function"
  );
}

function NftsTable({ data, isLoading, isError }: any) {
  if (isError) {
    return <h1 className="text-red-800 p-10">{isError}</h1>;
  }
  if ((!data || !isIterable(data)) && !isLoading && !isError) {
    return <h1 className="text-red-800 p-10">INCORRECT DATA</h1>;
  }

  return (
    <>
      {/* <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8"> */}

      {isLoading && <Loading />}

      {isError && (
        <h1 className="text-red-800 p-10">ERROR! {isError.message}</h1>
      )}

      {data && (
        <CardContent>
          <section
            id="Projects"
            className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5   rounded-xl p-10"
          >
            {data.length == 0 && <h5>NO NFTS FOUND IN THIS COLLECTION</h5>}
            {data.map((nft: any, index: any) => {
              return <NftPreview key={index} nft={nft} />;
            })}
          </section>
        </CardContent>
      )}

      {/* </main> */}
    </>
  );
}

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);

export default NftsTable;

function NftPreview({ nft }: any) {
  // console.log("NFT DATA IS : ", nft.normalized_metadata);
  return (
    <div className="border-2 border-zinc-400 shadow-zinc-600  shadow-md w-72  rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white/75 dark:bg-black/50">
      <Link href={`/nft/${nft?.token_address}/${nft.token_id}`}>
        <Image
          alt={"nft-image"}
          width={100}
          height={100}
          src={nft?.normalized_metadata?.image || "/nologo.png"}
          className="h-80 w-72 object-contain rounded-t-xl p-2"
        />
        <div className="px-4 py-3 w-72 bg-muted/30">
          <span className=" mr-3 uppercase text-xs">
            {nft?.normalized_metadata?.description}
          </span>
          <p className="text-lg font-bold truncate block capitalize">
            {nft?.normalized_metadata?.name}
          </p>
          <div className="flex items-center">
            {/* <p className="text-lg font-semibold  cursor-auto my-3">$149</p> */}
            <del>{/* <p className="text-sm  cursor-auto ml-2">$199</p> */}</del>
            <div className="ml-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={20}
                height={20}
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
