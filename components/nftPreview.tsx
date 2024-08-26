"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { BentoGridItem } from "@/components/ui/bento-grid";
import Loading from "@/components/Loading";

function NftPreview({ nft }: any) {
  const { id } = useParams();
  const [nftData, setNftData] = useState<any>(null);

  const getNftMetaData = async (url: string) => {
    try {
      const data = await axios.get(url);
      setNftData(data.data);
    } catch (error) {
      console.log("error in getting metadata : ", error);
    }
  };

  useEffect(() => {
    getNftMetaData(nft.tokenURI);
  }, [nft]);

  if (!nftData) {
    return <Loading />;
  }

  return (
    // <div key={nft.tokenId}>
    //   <Link href={`/collections/${id}/${nft.tokenId}`}>
    //     <BentoGridItem
    //       key={nft[0]}
    //       title={nftData?.name}
    //       description={nftData?.description}
    //       header={
    //         <div className="w-[150px]">
    //           <Image
    //             alt={"nft-image"}
    //             width={100}
    //             height={100}
    //             src={nftData?.image}
    //             className="h-full w-full object-cover object-center lg:h-full lg:w-full"
    //           />
    //         </div>
    //       }
    //       // icon={item.icon}
    //       // className={i === 3 || i === 6 ? "md:col-span-2" : ""}
    //     />
    //   </Link>
    // </div>

    <div className="border-2 border-zinc-400 shadow-zinc-600  shadow-md w-72  rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white/75 dark:bg-black/50">
      <Link href={`/marketplace/${id}/${nft.tokenId}`}>
        <Image
          alt={"nft-image"}
          width={100}
          height={100}
          src={nftData?.image}
          className="h-80 w-72 object-contain rounded-t-xl p-2"
        />
        {/* <img
          src="https://images.unsplash.com/photo-1646753522408-077ef9839300?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NjZ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          alt="Product"
          className="h-80 w-72 object-cover rounded-t-xl"
        /> */}
        <div className="px-4 py-3 w-72 bg-muted/30">
          <span className=" mr-3 uppercase text-xs">
            {nftData?.description}
          </span>
          <p className="text-lg font-bold truncate block capitalize">
            {nftData?.name}
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

export default NftPreview;
