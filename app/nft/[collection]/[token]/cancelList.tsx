import { Button } from "@/components/ui/button";
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
import { useLoadingModal } from "@/hooks/useLoadingModal";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import {
  BaseError,
  useAccount,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useWeb3Account } from "@/hooks/useAccount";
import { toast } from "@/components/ui/use-toast";
import { GLOABAL_CONSTANTS } from "@/constants";
import { ethers } from "ethers";
import { CircleAlert, ListChecks } from "lucide-react";

export function CancelListing() {
  const [nftListingPrice, setNftListingPrice] = useState<string>("1");
  const { setIsOpen, setSteps, setCurrentRunning } = useLoadingModal();
  const router = useRouter();
  const { address } = useAccount();
  const { collection: contractId, token } = useParams();
  const { NftSpace, NftMarketPlace } = useWeb3Account();
  //===================  APPROVE AND LIST  =========================
  const cancelList = async () => {
    setSteps([
      {
        id: 1,
        title: "Basic Setup",
        desc: "basic setup for cancel nft listing ",
      },

      {
        id: 2,
        title: "Cancel Listing",
        desc: "cancel listing the nft to marketplace",
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

    cancellistWriteContract({
      address:
        GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
      abi: NftMarketPlace.abi,
      functionName: "withdrawAuction",
      args: [contractId, token],
    });
  };

  //list write contraxt
  const {
    data: cancellistHash,
    error: cancellistError,
    isPending: cancellistPending,
    writeContract: cancellistWriteContract,
  } = useWriteContract();

  const {
    isLoading: isCancelListConfirming,
    isSuccess: isCancelListConfirmed,
  } = useWaitForTransactionReceipt({
    hash: cancellistHash,
  });

  useEffect(() => {
    if (cancellistError) {
      toast({
        title: "Failded:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {(cancellistError as BaseError).message}{" "}
            </code>
          </pre>
        ),
      });
      setIsOpen(false);
    }
    if (isCancelListConfirmed) {
      setCurrentRunning(3);
      toast({
        title: "Success:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">Cancel LISTING DONE </code>
          </pre>
        ),
      });

      router.push(`/profile/${address}/`);

      setIsOpen(false);
    }
  }, [
    isCancelListConfirmed,
    router,
    contractId,
    address,
    token,
    NftMarketPlace.abi,
    nftListingPrice,
    cancellistError,
    setCurrentRunning,
    setIsOpen,
  ]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#18977F] w-full py-2" variant="outline">
          <span className="mx-4">
            <CircleAlert />
          </span>
          Cancel Listing
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Listing</DialogTitle>
          <DialogDescription>
            approve collection and list your nft to marketplace
          </DialogDescription>
        </DialogHeader>
        <h1 className="text-3xl font-bold">#{token}</h1>

        <div className="flex flex-col w-full  items-center space-x-2 ">
          <DialogTrigger asChild>
            <button
              onClick={cancelList}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#18977F] px-8 py-3 text-base font-medium  hover:bg-[#189597] focus:outline-none focus:ring-2 focus:ring-[#18977F] focus:ring-offset-2"
            >
              Cancel Listing
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
