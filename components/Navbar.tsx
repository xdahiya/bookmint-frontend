"use client";
import Link from "next/link";
import Image from "next/image";
import { Home, PlusCircle, Text } from "lucide-react";
import { config } from "@/config/web3";
import { docsConfig } from "@/config/docs";
import { Button } from "@/components/ui/button";
import { signMessage } from "@wagmi/core";
import { ModeToggle } from "@/components/mode-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import * as React from "react";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";

import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

import { cn } from "@/lib/utils";
import { BackgroundGradient } from "./ui/background-gradient";
import { useAccount } from "wagmi";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addUser,
  findUser,
  loginUser,
  logoutUser,
  selfUser,
} from "@/http/client";
import { toast } from "./ui/use-toast";
import { useEffect } from "react";
import { useWeb3Account } from "@/hooks/useAccount";
import { debounce } from "lodash";
import { Badge } from "./ui/badge";
import localFont from "next/font/local";
import LogoComponent from "@/app/logo";
type Checked = DropdownMenuCheckboxItemProps["checked"];
const furoreFont = localFont({
  src: "../public/FuroreFont.otf",
  variable: "--font-furore",
});

export function Navbar() {
  const segment = useSelectedLayoutSegment();
  const { isConnected, address } = useAccount();
  const router = useRouter();
  const { authUser, setAuthUser } = useWeb3Account();

  const { mutate: signinUser, isPending: signinUserPending } = useMutation({
    mutationKey: ["loginuser"],
    mutationFn: async (data: any) => {
      return loginUser(data).then((res) => res.data);
    },
    onError: async (err) => {
      console.log("axio ", err);
      toast({
        title: "Error",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">error </code>
          </pre>
        ),
      });
    },
    onSuccess: async (data) => {
      toast({
        title: "Successfully logged In",
        // description: (
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //   </pre>
        // ),
      });
      setAuthUser(data[0]);
    },
  });

  const {
    data: accountData,
    isPending: isAccount,
    isError,
    error,
  } = useQuery({
    queryKey: ["accountaccc", address],
    queryFn: async () => {
      return findUser(address as string).then((res) => res.data);
    },
  });

  useEffect(() => {
    if (!isAccount && accountData) {
      // mutate({
      // })
    }
    if (isError) {
      console.log("xx", error);
    }
  }, [isAccount, accountData, isError, error]);

  const { mutate: logoutMutate } = useMutation({
    mutationFn: logoutUser,
    onSuccess: (data) => {
      setAuthUser(null);
    },
  });

  useEffect(() => {
    async function checkUser() {
      try {
        const data = await selfUser();

        if (data && data.data && data.data[0]) {
          if (data.data[0].publicAddress == address) {
            setAuthUser(data.data[0]);
          } else if (address && data.data[0].publicAddress != address) {
            // logoutMutate();
            if (accountData.nonce) {
              startLogin();
            }
          }
        } else {
          // logoutMutate();
          if (accountData.nonce) {
            startLogin();
          }
        }
      } catch (error) {
        console.log("user login error", error);
        startLogin();
      }
    }
    checkUser();
  }, [address, accountData]);

  const startLogin = debounce(async () => {
    try {
      const signature = await signMessage(config as any, {
        message: `Happy to see you on NFTSpace!\n\nClick "Sign" to sign in with your wallet. This process will not trigger a blockchain transaction or cost any gas fees.\n\nNotice that auth process will be made by your address. If you have an account on NFTSpace , but your address is not linked to it,this operation will authentication status will be reset in hours of inactivity\nnonce: ${accountData.nonce}`,
        // message: `nonce: ${accountData.nonce}`,
      });
      console.log("Signature is : ", signature);
      signinUser({
        publicAddress: address,
        signature: signature,
      });
    } catch (err) {
      console.log("error is :", err);
    }
  }, 4000);

  return (
    <header className="sticky z-50 top-0 w-full border-b backdrop-blur-sm bg-white/[0.6] dark:bg-black/[0.6] border-neutral-200 dark:border-white/[0.1]">
      {/* <TopBanner /> */}
      <div className="lg:container flex h-20 items-center space-x-4 sm:justify-between sm:space-x-0 ml-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon" variant="outline" className="lg:hidden">
              <Text className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="sm:max-w-xs">
            <nav className="grid gap-6 text-lg font-medium">
              <SheetClose asChild>
                <Link href="/" className=" items-center space-x-2 md:flex">
                  <LogoComponent />
                </Link>
              </SheetClose>

              {docsConfig.mainNav.map((item: any, index: number) => {
                return (
                  <SheetClose asChild key={index}>
                    <Link
                      href={item.href}
                      className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-5 w-5" />
                      {item.title}
                    </Link>
                  </SheetClose>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex gap-6 md:gap-10">
          <Link href="/" className="hidden items-center space-x-2 md:flex">
            <LogoComponent />
          </Link>
          {docsConfig.mainNav?.length ? (
            <nav className="hidden gap-6 lg:flex">
              {docsConfig.mainNav?.map((item, index) => (
                <Link
                  key={index}
                  href={item.disabled ? "#" : item.href}
                  className={cn(
                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                    item.href.startsWith(`/${segment}`)
                      ? "text-foreground"
                      : "text-foreground/60",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          ) : null}

          <div className="flex justify-center">
            <Link href="/" className=" items-center md:hidden space-x-2">
              <LogoComponent />
            </Link>
          </div>
        </div>

        <div className="flex flex-1 items-center space-x-4 justify-end">
          <div className="flex space-x-4 items-center">
            <div className="hidden md:block">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant={"ghost"}>
                    <Badge className="hidden lg:block bg-[#18977F]">
                      ARBITRIUM SEPOLIA
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Manual</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem>
                    <Link
                      target="_blank"
                      href={"https://blog.chain.link/polygon-amoy-matic/"}
                    >
                      How to add amoy testnet to metamask
                    </Link>
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>
                    <Link
                      target="_blank"
                      href={"https://www.alchemy.com/faucets/polygon-amoy"}
                    >
                      Amoy matic Faucet
                    </Link>
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="items-center justify-center h-full">
              <ModeToggle />
            </div>

            {address == "0xb95EE029c08225EE5527bab5FAbde756d335FCbf" && (
              <BackgroundGradient className="rounded-[22px]  bg-white dark:bg-zinc-900 text-black">
                <Button
                  onClick={() => {
                    router.push("/create");
                  }}
                  size="sm"
                  className="h-8 gap-1"
                >
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Create
                  </span>
                </Button>
              </BackgroundGradient>
            )}

            {isConnected ? (
              <>
                <div>
                  <w3m-button size="sm" label="Connect" />
                </div>
              </>
            ) : (
              <>
                <div className="pr-4 hidden lg:flex">
                  <BackgroundGradient className="rounded-[22px]  bg-white dark:bg-zinc-900 text-black">
                    <w3m-button size="sm" label="Connect Wallet" />
                  </BackgroundGradient>
                </div>
                <div className="pr-4 flex lg:hidden">
                  <BackgroundGradient className="rounded-[22px]  bg-white dark:bg-zinc-900 text-black">
                    <w3m-button size="sm" label="Connect" />
                  </BackgroundGradient>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
