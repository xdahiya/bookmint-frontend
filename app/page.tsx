import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import Loading from "@/components/Loading";
import TopCollections from "./top-collections";
import { Categories } from "@/components/Categories";
import { buttonVariants } from "@/components/ui/button";

import { DarkGridHero } from "./hero";
import { DarkGradientPricing } from "./pricing";

const FAQ = [
  {
    title: "What is an NFT marketplace?",
    desc: "An NFT marketplace is a digital platform at which users can purchase, sell, and trade non-fungible tokens (NFTs). These NFTs represent ownership of unique digital assets like art, music, and virtual items. ",
  },
  {
    title: "Is NFT still profitable?",
    desc: "Yes, NFTs are still profitable, especially for unique digital assets and popular creators. However, its success and value are changed with the variation of market trends.",
  },
  {
    title: "How do I sell my NFT?",
    desc: "To sell your NFT, choose a marketplace. Then, list your NFT with details and a price, connect your crypto wallet, and promote your listing to attract buyers.",
  },
  {
    title: "How much should an NFT sell for?",
    desc: "The selling price for NFT is often less than $200. However, this price varies according to its uniqueness, demand, popularity of the creator, and market trends.",
  },
  {
    title: "Is NFT trading legal?",
    desc: "Yes, NFT trading is legal in most countries, but the regulations are not the same for all countries. Before buying or selling NFTs, it's important to obey the local laws and understand the legal implications.",
  },
];

export default async function Home() {
  return (
    <>
      <div>
        <DarkGridHero />
        <DarkGradientPricing />

        {/* <div className="bg-[url('/bg-pattern.png')] bg-no-repeat bg-bottom bg-contain lg:bg-cover bg-fixed">
          <div className="mt-10 mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center ">
            <h2 className="font-heading text-xl leading-[1.1]  md:text-3xl">
              Top NFT Collections On Our Marketplace
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Our top NFT collections feature unique digital assets and
              exclusive items crafted by talented creators. At our NFT
              marketplace, we offer diverse NFTs and support the growing
              community with NFT-based solutions.
            </p>
          </div>
        </div> */}

        {/* <div className="mx-2 mt-8 border-2 rounded-lg ">
          <Suspense fallback={<Loading />}>
            <TopCollections />
          </Suspense>
        </div> */}

        {/* <div className="flex justify-center mt-10">
          <Link href={"/marketplace"}>
            <button className={cn(buttonVariants({ size: "lg" }))}>
              All Collections
            </button>
          </Link>
        </div> */}

        <div className="mt-10 mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading leading-[1.1] text-xl md:text-3xl">
            Our NFT Categories
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 pb-10">
            Our marketplace provides an advanced NFT trading platform for art
            enthusiasts, gamers, musicians, avatar creators, photographers and
            sports fans to tokenize, trade, and monetize their digital assets in
            a user-friendly environment.
          </p>
        </div>
        <Categories />

        {/* END LAUNCH NFT SECTION */}

        {/* new section */}
        {/* <Accotent /> */}
        {/* end new section */}

        {/* <GlobeDemo /> */}
        {/* <Sponsors /> */}

        {/* <div className=" rounded-2xl py-8 bg-no-repeat bg-[url('/pattern1.png')] ">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mx-auto max-w-4xl text-center text-3xl font-bold tracking-tight sm:text-3xl">
              Building NFT Success Together with Our Partners
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8 ">
              We collaborate with leading industry partners to enhance the
              capabilities of our NFT marketplace and ensure innovative NFT
              marketplace solutions for our global community.
            </p>
            <div className="mt-4 w-full flex items-center justify-center flex-wrap gap-20">
              <Image
                alt={"fer"}
                width={158}
                height={48}
                src={"/partner/metamask.png"}
                className=" col-span-2 max-h-12  object-contain lg:col-span-1 bg-white p-1 rounded-xl hover:scale-110"
              />
              <Image
                alt={"fer"}
                width={158}
                height={48}
                src={"/partner/polygon.png"}
                className="col-span-2 max-h-12  object-contain lg:col-span-1 bg-white p-1 rounded-xl hover:scale-110"
              />
              <Image
                alt={"fer"}
                width={158}
                height={48}
                src={"/partner/quill.png"}
                className="col-span-2 max-h-12  object-contain lg:col-span-1 bg-white p-1 rounded-xl hover:scale-110"
              />
            </div>
          </div>
        </div> */}

        {/* faq section */}
        <div className="m-4 -z-10 bg-muted/5 bg-[url('/pattern1.png')] ">
          <div className="z-10 relative w-full px-6 pt-10 pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5  bg-muted/50 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10 ">
            <div className="mx-auto px-5">
              <div className="flex flex-col items-center">
                <h2 className="mt-5 text-center text-3xl font-bold tracking-tight ">
                  Frequenty asked questions
                </h2>
              </div>
              <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
                {FAQ.map((item, index) => {
                  return (
                    <div key={index} className="py-5 bg-muted/95 p-10">
                      <details className="group">
                        <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                          <h3> {item.title}</h3>
                          <span className="transition group-open:rotate-180">
                            <svg
                              fill="none"
                              height={24}
                              shapeRendering="geometricPrecision"
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="1.5"
                              viewBox="0 0 24 24"
                              width={24}
                            >
                              <path d="M6 9l6 6 6-6" />
                            </svg>
                          </span>
                        </summary>
                        <p className="group-open:animate-fadeIn mt-3 ">
                          {item.desc}
                        </p>
                      </details>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        {/* end faq section */}

        {/* <div className=" mx-auto px-5 mt-4  p-4 m-4">
        <div className="flex flex-col justify-center bg-muted/55 rounded-2xl py-14 bg-no-repeat bg-[url('/pattern1.png')]">
          <div className="text-center">
            <h2 className="font-semibold text-3xl mb-10">Our Partners</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 mt-2 md:justify-around">
            <div className="text-gray-400 border-2 border-zinc-400 shadow-zinc-600  shadow-md   rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white/75 dark:bg-black/50">
              <Image
                alt={"fer"}
                width={100}
                height={60}
                src={"/partner/metamask.png"}
                className="h-20 w-60 object-contain rounded-t-xl p-2"
              />
            </div>
            <div className="text-gray-400 border-2 border-zinc-400 shadow-zinc-600  shadow-md   rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white/75 dark:bg-black/50">
              <Image
                alt={"fer"}
                width={100}
                height={60}
                src={"/partner/quill.png"}
                className="h-20 w-60 object-contain rounded-t-xl p-2"
              />
            </div>
            <div className="text-gray-400 border-2 border-zinc-400 shadow-zinc-600  shadow-md   rounded-xl duration-500 hover:scale-105 hover:shadow-xl bg-white/75 dark:bg-black/50">
              <Image
                alt={"fer"}
                width={100}
                height={60}
                src={"/partner/polygon.png"}
                className="h-20 w-60 object-contain rounded-t-xl p-2"
              />
            </div>
          </div>
        </div>
      </div> */}
      </div>
    </>
  );
}
