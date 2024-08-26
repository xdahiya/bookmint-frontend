import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { ArrowBigRight, ImageDown, LayoutDashboard } from "lucide-react";

export default function CreateNftForm() {
  return (
    <div className="w-full h-screen  mt-[-100px] items-center flex justify-around  bg-[url('/bg-pattern.png')] bg-contain bg-fixed ">
      <div className="flex gap-4 flex-col p-4 lg:w-1/3 ">
        <Card className="mt-20">
          <CardHeader>
            <CardTitle>
              <span className="flex gap-4">
                <LayoutDashboard /> Create Collection
              </span>
            </CardTitle>
            <CardDescription>
              Launch your NFT collection for others to purchase. yours items not
              displayed until they have been minted
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={"/create/collection"}>
              <div className="m-4 flex justify-center text-center">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  {/* <AceternityLogo /> */}
                  <span>Create Collection</span>
                  <ArrowBigRight />
                </HoverBorderGradient>
              </div>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>
              {" "}
              <span className="flex gap-4">
                <ImageDown /> Mint NFT
              </span>
            </CardTitle>
            <CardDescription>
              Create a public collection and immediately mint NFTs directly to
              your wallet to own or list for sale.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href={"/create/nft"}>
              <div className="m-4 flex justify-center text-center ">
                <HoverBorderGradient
                  containerClassName="rounded-full"
                  as="button"
                  className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
                >
                  {/* <AceternityLogo /> */}
                  <span>Mint Nft</span>
                  <ArrowBigRight />
                </HoverBorderGradient>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="hidden lg:block w-1/3 animate-spin-slow ">
        <Image
          src="/green_logo.png"
          alt="Image"
          width={400}
          height={200}
          className="h-full w-full object-cover "
        />
      </div>
    </div>
  );
}
