import { Button } from "@/components/ui/button";
import Image from "next/image";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import {
  BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useWeb3Account } from "@/hooks/useAccount";
import { Send } from "lucide-react";

export function TransferOwner({ image }: any) {
  const [nftTransferOwner, setNftTransferOwner] = useState<string>("");
  const { setIsOpen, setSteps, setCurrentRunning } = useLoadingModal();
  const router = useRouter();
  const { address } = useAccount();
  const { collection: contractId, token } = useParams();
  const { NftSpace, NftMarketPlace } = useWeb3Account();
  //===================TRANSFER OWNERSHIP=========================
  const transferOwnerShip = async () => {
    if (!nftTransferOwner || nftTransferOwner == "") {
      toast({
        title: "Put correct address",
      });
      return;
    }

    setSteps([
      {
        id: 1,
        title: "Basic Setup",
        desc: "basic setup for transfering nft",
      },
      {
        id: 2,
        title: "Transfering ownership ",
        desc: "transfering nft to address",
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

    transferWriteContract({
      address: contractId as `0x${string}`,
      abi: NftSpace.abi,
      functionName: "safeTransferFrom",
      args: [address, nftTransferOwner, token],
    });
  };
  //transfet write contract
  const {
    data: transferHash,
    error: transferError,
    isPending: transferPending,
    writeContract: transferWriteContract,
  } = useWriteContract();

  const { isLoading: isTransferConfirming, isSuccess: isTransferConfirmed } =
    useWaitForTransactionReceipt({
      hash: transferHash,
    });

  useEffect(() => {
    if (transferError) {
      toast({
        title: "Failded:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {(transferError as BaseError).message}
            </code>
          </pre>
        ),
      });
      setIsOpen(false);
    }
    if (isTransferConfirmed) {
      setCurrentRunning(3);
      console.log("listed created");
      toast({
        title: "Success:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">TRANSFER DONE </code>
          </pre>
        ),
      });
      router.push(`/profile/${address}/`);
      setIsOpen(false);
    }
  }, [
    isTransferConfirmed,
    address,
    transferError,
    router,
    setCurrentRunning,
    setIsOpen,
  ]);
  //===================END TRANSFER OWNERSHIP=========================

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#FF9601] w-full py-2" variant="default">
          <span className="mx-4">
            <Send />
          </span>
          Transfer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Trasnfering</DialogTitle>
          <DialogDescription>
            transfer the nft to any another owner
          </DialogDescription>
        </DialogHeader>

        <h1 className="text-3xl font-bold">#{token}</h1>
        <Image
          width="300"
          height="300"
          src={image}
          alt={"product.images[1].alt"}
          className="h-full w-full object-contain object-center"
        />

        <div className="flex flex-col w-full  items-center space-x-2 ">
          <Input
            className="h-14"
            value={nftTransferOwner}
            type="text"
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              setNftTransferOwner(event.target.value);
            }}
            placeholder="Transfer Owner (address)"
          />

          <DialogTrigger asChild>
            <button
              onClick={transferOwnerShip}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#18977F] px-8 py-3 text-base font-medium  hover:bg-[#189597] focus:outline-none focus:ring-2 focus:ring-[#18977F] focus:ring-offset-2"
            >
              Transfer Owner
            </button>
          </DialogTrigger>
        </div>
        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
