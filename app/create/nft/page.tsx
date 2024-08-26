"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import { ethers } from "ethers";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ChangeEvent, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { getCollections } from "@/http/client";

import {
  MultiStepLoader,
  ProgressWrapper,
} from "@/components/ui/multi-step-loader";
import axios from "axios";
import { useWeb3Account } from "@/hooks/useAccount";
import { getImageData } from "@/lib/utils";
import { useLoadingModal } from "@/hooks/useLoadingModal";
import { useAccount, useTransaction, useWalletClient } from "wagmi";
import { useReadContract } from "wagmi";
import {
  type BaseError,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
// import { AnimatedBeamDemo } from "@/app/test/page";
import { useWeb3Modal } from "@web3modal/wagmi/react";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  description: z
    .string()
    .min(5, {
      message: "description must be at least 5 characters.",
    })
    .max(300, {
      message: "symbol must not be longer than 30 characters.",
    }),
  url: z
    .string()
    .min(6, {
      message: "url must be at least 6 characters.",
    })
    .max(100, {
      message: "url must not be longer than 30 characters.",
    }),

  category: z
    .string({
      required_error: "Please select an category .",
    })
    .min(2, {
      message: "Please select an category.",
    }),

  logo: z.any().refine(
    (file) => {
      // console.log("current file type is :", file.type);
      // Validate file type here, for example, only allow certain image types
      if (!(file instanceof File)) {
        return false; // Not a file
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(file.type);
    },
    {
      message: "Logo must be a valid image file (JPEG, PNG, GIF).",
    }
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  description: "",
  url: "",
  category: "",
};

export default function Dashboard() {
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { data: walletClient } = useWalletClient();
  // const [hash, setHash] = useState<undefined | `0x${string}`>();
  const { setIsOpen, setSteps, setCurrentRunning } = useLoadingModal();
  const { account, provider, NftSpace } = useWeb3Account();
  const [queryParams, setQueryParams] = useState<any>({
    limit: 10,
    page: 1,
    user: null,
  });

  const {
    data: mintHash,
    isPending,
    error: writeError,
    writeContract,
  } = useWriteContract();

  useEffect(() => {
    setQueryParams((prev: any) => ({
      ...prev,
      user: account,
    }));
  }, [account]);

  const queryClient = useQueryClient();

  const {
    data: collections,
    isFetching,
    isError,
    error,
  } = useQuery({
    queryKey: ["mycollections", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      if (account) {
        return getCollections(queryString).then((res) => res.data);
      } else {
        return { data: [] };
      }
    },
    placeholderData: keepPreviousData,
  });

  const [preview, setPreview] = useState("");

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(mintdata: ProfileFormValues) {
    try {
      setSteps([
        {
          id: 1,
          title: "Basic Setup",
          desc: "basic setup for creating collection",
        },
        {
          id: 2,
          title: "Uploading Images",
          desc: "deploying the image to ipfs",
        },
        {
          id: 3,
          title: "Uploading MetaData",
          desc: "deploying the metadata to ipfs",
        },
        {
          id: 4,
          title: "Creating Nft",
          desc: "minting the nft ",
        },
        {
          id: 5,
          title: "Done",
          desc: "success",
        },
      ]);
      setIsOpen(true);
      setCurrentRunning(1);
      setCurrentRunning(2);

      const formData = new FormData();
      formData.append("file", mintdata.logo);

      const pinataMetadata = JSON.stringify({
        name: "File name",
      });
      formData.append("pinataMetadata", pinataMetadata);

      try {
        const res = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": `multipart/form-data`,
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZjMyNDNhZC00ZTNjLTRjMjktYmM3OS1iYThiNGQ2Y2U0MmMiLCJlbWFpbCI6Im5mdHNwYWNlLmdhbGxlcnlvZmZpY2lhbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOTY2Njk2NmI5NDU4YjkwMjhlZGIiLCJzY29wZWRLZXlTZWNyZXQiOiJlMDE3MDUwODdjNWQxNmE2ODg4OTY4MzcyMzU0MDJhNmUwZjAzODI2MDU1ZmQ2OGVkOGJlOTgwNjY4MmU2YWIxIiwiaWF0IjoxNzE3OTM0MDAyfQ.Ien2-KjUbwZPmmbLUFu7nh35Kr8R4iMD-6wGpvaQb5Q",
            },
          }
        );
        setCurrentRunning(3);

        const datax = JSON.stringify({
          pinataContent: {
            name: mintdata.name,
            description: mintdata.description,
            external_url: mintdata.url,
            image: `https://ipfs.io/ipfs/${res.data?.IpfsHash}`,
          },
          pinataMetadata: {
            name: "metadata.json",
          },
        });

        try {
          const res2 = await axios.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            datax,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization:
                  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI0ZjMyNDNhZC00ZTNjLTRjMjktYmM3OS1iYThiNGQ2Y2U0MmMiLCJlbWFpbCI6Im5mdHNwYWNlLmdhbGxlcnlvZmZpY2lhbEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiOTY2Njk2NmI5NDU4YjkwMjhlZGIiLCJzY29wZWRLZXlTZWNyZXQiOiJlMDE3MDUwODdjNWQxNmE2ODg4OTY4MzcyMzU0MDJhNmUwZjAzODI2MDU1ZmQ2OGVkOGJlOTgwNjY4MmU2YWIxIiwiaWF0IjoxNzE3OTM0MDAyfQ.Ien2-KjUbwZPmmbLUFu7nh35Kr8R4iMD-6wGpvaQb5Q",
              },
            }
          );

          setCurrentRunning(4);

          // setMetaDataImageCid(res.data?.IpfsHash);
          // LoaderHelper.loaderStatus(false);

          // const nft = new web3.eth.Contract(nftAbi, nftAdd);

          // const signer = await provider.getSigner(); //write the blockchain

          const metadata = `https://ipfs.io/ipfs/${res2.data?.IpfsHash}`;

          const result = writeContract({
            address: mintdata.category as `0x${string}`,
            abi: NftSpace.abi,
            functionName: "mint",
            args: [
              metadata,
              account,
              "0x0000000000000000000000000000000000000000",
              0,
            ],
          });
          console.log("result is :", result);

          // const nft = new ethers.Contract(
          //   mintdata.category,
          //   NftSpace.abi,
          //   signer
          // );

          // const accounts = await web3.eth.getAccounts();
          // console.log(accounts, "accounts");
          // const user = accounts[0];

          try {
            // const tx = await nft.mint(
            //   metadata,
            //   // "0xb95EE029c08225EE5527bab5FAbde756d335FCbf",
            //   // account[0],
            //   account,
            //   "0x0000000000000000000000000000000000000000",
            //   0
            // );
            // .send({ from: user, gasLimit: 500000 });
            // const tx = await nft.methods
            //   .mint(metadata, user, "0x0000000000000000000000000000000000000000", 0)
            //   .send({ from: user, gasLimit: 500000 });
            // console.log(tx, "nft created");
            // setIsCollectionLoading(false);
          } catch (error) {
            // setIsCollectionLoading(false);
            setIsOpen(false);
            console.log(error, "error");
          }
        } catch (error) {
          setIsOpen(false);
          // setIsCollectionLoading(false);
          console.log(error);
        }
      } catch (error) {
        setIsOpen(false);
        // setIsCollectionLoading(false);
        console.log("error is : ", error);
      }
    } catch (error) {
      setIsOpen(false);

      console.log("error in minitng nft is : ", error);
    }
    // setLoadingStateNumber(0);
    // setIsCollectionLoading(true);

    // const signer = await provider.getSigner();
    // setLoadingStateNumber(1);
  }

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: mintHash,
    });

  const { address } = useAccount();

  useEffect(() => {
    if (isConfirmed) {
      setCurrentRunning(5);
      setIsOpen(false);
      console.log("nft created");
      toast({
        title: "NFT CREATED SUCCESSFULLY",
      });
      router.push(`/profile/${address}/`);
    }
  }, [isConfirmed, address, router, setCurrentRunning, setIsOpen]);

  useEffect(() => {
    if (writeError) {
      console.log("error in deploying contract is :", writeError);
      toast({
        title: "Not Completed",
        // description: (
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">error </code>
        //   </pre>
        // ),
      });
      setIsOpen(false);
    }
  }, [writeError, setIsOpen]);

  const { authUser } = useWeb3Account();
  useEffect(() => {
    if (!address || !authUser) {
      open();
      // toast({
      //   title: "Login first",
      // });

      router.push("/create");
    }
  }, [address, authUser, router, open]);

  const [logo, setLogo] = useState<File | null>(null);
  const [logopreview, setLogoPreview] = useState("");
  const [banner, setBanner] = useState<File | null>(null);
  const [bannerpreview, setBannerPreview] = useState("");

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-[url('/bg-pattern.png')] bg-fixed bg-cover">
      {/* <ProgressWrapper>
        <AnimatedBeamDemo />
      </ProgressWrapper> */}
      {/* <MultiStepLoader
        loadingStates={loadingStates}
        loading={isCollectionloading}
        duration={2000}
        loop={false}
        value={loadingStateNumber}
      /> */}
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <Form {...form}>
              <div className="flex items-center gap-4">
                <Link href={"/create"}>
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                </Link>

                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Mint Nft
                </h1>

                <Badge variant="outline" className="ml-auto sm:ml-0">
                  minting
                  {/* {mintHash && <div>Transaction Hash: {mintHash}</div>}
                  {isConfirming && <div>Waiting for confirmation...</div>}
                  {isConfirmed && <div>Transaction confirmed.</div>}
                  {error && (
                    <div>
                      Error:{" "}
                      {(error as BaseError).shortMessage || error.message}
                    </div>
                  )} */}
                </Badge>

                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      form.reset();
                    }}
                  >
                    Reset
                  </Button>

                  <Button
                    type="submit"
                    form="collectionform"
                    // onClick={() => {
                    //   // onSubmit();
                    //   form.handleSubmit(onSubmit);
                    // }}
                    size="sm"
                  >
                    Submit
                  </Button>
                </div>
              </div>

              <form
                id="collectionform"
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"
              >
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>NFT Details</CardTitle>
                      <CardDescription>
                        fill details regarding your nft
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="nft name" {...field} />
                                </FormControl>
                                <FormDescription>
                                  This is your public display nft name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                  <Textarea
                                    {...field}
                                    id="description"
                                    placeholder="description"
                                    className="min-h-32"
                                  />
                                </FormControl>
                                <FormDescription>
                                  This is your public display nft description
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Url</FormLabel>
                                <FormControl>
                                  <Input placeholder="Url name" {...field} />
                                </FormControl>
                                <FormDescription>
                                  This is your public display url
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {/* <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="description"
                          className="min-h-32"
                        />
                      </div> */}
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle> Collection </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 ">
                        <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Select Collection</FormLabel>
                                <Select
                                  // required
                                  onValueChange={field.onChange}
                                  // defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a collection" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {collections?.data &&
                                      collections.data.map(
                                        (collectionItem: any) => {
                                          return (
                                            <SelectItem
                                              key={collectionItem._id}
                                              value={collectionItem.contract}
                                            >
                                              {collectionItem.name}
                                            </SelectItem>
                                          );
                                        }
                                      )}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  select collection
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        {/* <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="m@example.com">
                                      m@example.com
                                    </SelectItem>
                                    <SelectItem value="m@google.com">
                                      m@google.com
                                    </SelectItem>
                                    <SelectItem value="m@support.com">
                                      m@support.com
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  You can manage verified email addresses in
                                  your{" "}
                                  <Link href="/examples/forms">
                                    email settings
                                  </Link>
                                  .
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div> */}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>NFT Image</CardTitle>
                      <CardDescription>set image</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        {preview && (
                          <Image
                            alt="logo image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="100"
                            src={preview}
                            width="100"
                          />
                        )}

                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="logo"
                            render={({
                              field: { value, onChange, ...fieldProps },
                            }) => (
                              <FormItem>
                                <FormLabel>NFT</FormLabel>
                                <FormControl>
                                  <Input
                                    {...fieldProps}
                                    placeholder="Picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const { files, displayUrl } =
                                        getImageData(event);

                                      setPreview(displayUrl);

                                      onChange(
                                        event.target.files &&
                                          event.target.files[0]
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormDescription>
                                  {/* this is your collection logo. */}
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* <Card x-chunk="dashboard-07-chunk-3">
                  <CardHeader>
                    <CardTitle>Token</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="status">Status</Label>
                        <Select>
                          <SelectTrigger id="status" aria-label="Select status">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="published">Active</SelectItem>
                            <SelectItem value="archived">Archived</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card> */}
                  {/* <Card x-chunk="dashboard-07-chunk-5">
                  <CardHeader>
                    <CardTitle>Archive Product</CardTitle>
                    <CardDescription>
                      Lipsum dolor sit amet, consectetur adipiscing elit.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div></div>
                    <Button size="sm" variant="secondary">
                      Archive Product
                    </Button>
                  </CardContent>
                </Card> */}
                </div>
              </form>

              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    form.reset();
                  }}
                >
                  Reset
                </Button>
                <Button
                  type="submit"
                  form="collectionform"
                  // onClick={() => {
                  //   // onSubmit();
                  //   form.handleSubmit(onSubmit);
                  // }}
                  size="sm"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}
