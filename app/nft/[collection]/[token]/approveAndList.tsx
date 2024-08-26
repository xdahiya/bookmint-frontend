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
import Image from "next/image";

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
import { CalendarIcon, ListChecks } from "lucide-react";
import { addDays, format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function ApproveAndListComponent({ image }: any) {
  const [nftListingPrice, setNftListingPrice] = useState<string>("");
  const { setIsOpen, setSteps, setCurrentRunning } = useLoadingModal();
  const router = useRouter();
  const { address } = useAccount();
  const { collection: contractId, token } = useParams();
  const { NftSpace, NftMarketPlace } = useWeb3Account();
  //===================  APPROVE AND LIST  =========================
  const approveAndList = async () => {
    try {
      if (
        parseFloat(nftListingPrice) <= 0 ||
        isNaN(parseFloat(nftListingPrice))
      ) {
        toast({
          title: "Put correct nft list price in matic ",
          description: "greater than 0",
        });
        return;
      }
    } catch (error) {
      toast({
        title: "error in parsing",
        description: "not pass any string",
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
        title: "Approve ",
        desc: "waiting for approve to list in marketplace",
      },
      {
        id: 3,
        title: "Listing",
        desc: "listing the nft to marketplace",
      },
      {
        id: 4,
        title: "Done",
        desc: "success",
      },
    ]);
    setIsOpen(true);
    setCurrentRunning(1);
    setCurrentRunning(2);

    approveWriteContract({
      address: contractId as `0x${string}`,
      abi: NftSpace.abi,
      functionName: "approve",
      args: [GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS, token],
    });
  };

  //approve write contract
  const {
    data: approveHash,
    error: approveError,
    isPending: approvePending,
    writeContract: approveWriteContract,
  } = useWriteContract();

  //list write contraxt
  const {
    data: listHash,
    error: listError,
    isPending: listPending,
    writeContract: listWriteContract,
  } = useWriteContract();

  const { isLoading: isApproveConfirming, isSuccess: isApproveConfirmed } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  useEffect(() => {
    if (approveError) {
      toast({
        title: "Failded:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {(approveError as BaseError).message}{" "}
            </code>
          </pre>
        ),
      });
      setIsOpen(false);
    }
    if (isApproveConfirmed) {
      setCurrentRunning(3);
      const ammInEthers = ethers.parseUnits(
        nftListingPrice.toString(),
        "ether"
      );
      console.log("nftsls ", ammInEthers);

      listWriteContract({
        address:
          GLOABAL_CONSTANTS.NFTMARKETPLACE_CONTRACT_ADDRESS as `0x${string}`,
        abi: NftMarketPlace.abi,
        functionName: "createSale",
        args: [contractId, token, ammInEthers, ammInEthers],
      });
    }
  }, [
    approveError,
    isApproveConfirmed,
    contractId,
    token,
    NftMarketPlace.abi,
    listWriteContract,
    nftListingPrice,
    setCurrentRunning,
    setIsOpen,
  ]);

  const { isLoading: isListConfirming, isSuccess: isListConfirmed } =
    useWaitForTransactionReceipt({
      hash: listHash,
    });

  useEffect(() => {
    if (listError) {
      toast({
        title: "Failded:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {(listError as BaseError).message}{" "}
            </code>
          </pre>
        ),
      });
      setIsOpen(false);
    }
    if (isListConfirmed) {
      setCurrentRunning(5);
      toast({
        title: "Success:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">LISTING DONE </code>
          </pre>
        ),
      });
      router.push(`/profile/${address}/`);

      setIsOpen(false);
    }
  }, [
    isListConfirmed,
    address,
    listError,
    router,
    setCurrentRunning,
    setIsOpen,
  ]);
  //=================== END APPROVE AND LIST  =========================
  const [date, setDate] = useState<Date>();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#18977F] w-full py-2" variant="outline">
          <span className="mx-4">
            <ListChecks />
          </span>
          Create Sale
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Listing</DialogTitle>
          <DialogDescription>
            You will not be able to change the price after listing. If you like
            to change the price, you will need to create a new listing.
          </DialogDescription>
        </DialogHeader>

        <div className="flex">
          <h1 className="text-3xl font-bold">#{token}</h1>
          <Image
            width="100"
            height="100"
            src={image}
            alt={"product.images[1].alt"}
            className="h-[20vh] object-contain object-center"
          />
        </div>

        <div className="flex flex-col w-full  items-center space-x-2 ">
          <div className="flex gap-x-2">
            <Input
              className="h-14"
              value={nftListingPrice}
              type="string"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                setNftListingPrice(event.target.value);
              }}
              placeholder="Listing Price (in matic)"
            />

            <Select defaultValue="matic">
              <SelectTrigger className="w-[180px] h-14">
                <SelectValue placeholder="Token" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Curreny</SelectLabel>
                  <SelectItem value="matic">Matic</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="mt-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Select Duration</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                <Select
                  onValueChange={(value) =>
                    setDate(addDays(new Date(), parseInt(value)))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="0">Today</SelectItem>
                    <SelectItem value="1">Tomorrow</SelectItem>
                    <SelectItem value="3">In 3 days</SelectItem>
                    <SelectItem value="7">In a week</SelectItem>
                  </SelectContent>
                </Select>
                <div className="rounded-md border">
                  <Calendar mode="single" selected={date} onSelect={setDate} />
                </div>
              </PopoverContent>
            </Popover>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
            <table className="w-full text-sm text-left rtl:text-right">
              <tbody>
                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    NFTSpace fee
                  </th>
                  <td className="px-6 py-4">0.0 %</td>
                </tr>
                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    Creator earning
                  </th>
                  <td className="px-6 py-4">0.0 %</td>
                </tr>
                <tr className=" border-b">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium whitespace-nowrap"
                  >
                    Listing price
                  </th>
                  <td className="px-6 py-4">{nftListingPrice || "-- Matic"}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <DialogTrigger asChild>
            <button
              onClick={approveAndList}
              className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-[#18977F] px-8 py-3 text-base font-medium  hover:bg-[#189597] focus:outline-none focus:ring-2 focus:ring-[#18977F] focus:ring-offset-2"
            >
              Submit
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
