"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { config } from "@/config/web3";
import { waitForTransactionReceipt } from "@wagmi/core";
import { useRouter } from "next/navigation";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import NSTSpace from "@/contracts/Nft.sol/NFTSpace.json";

import { getImageData } from "@/lib/utils";
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
import { toast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft } from "lucide-react";
import { createCollection } from "@/http/client";
import { GlobalContext, ContextType } from "@/app/providers";
import { useAccount, useWalletClient } from "wagmi";

const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  symbol: z
    .string()
    .min(2, {
      message: "symbol must be at least 2 characters.",
    })
    .max(10, {
      message: "symbol must not be longer than 30 characters.",
    }),
  url: z
    .string()
    .min(2, {
      message: "url must be at least 2 characters.",
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

  chain: z
    .string({
      required_error: "Please select an chain .",
    })
    .min(2, {
      message: "Please select an chain.",
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
  banner: z.any().refine(
    (file) => {
      // Validate file type here, for example, only allow certain image types
      if (!(file instanceof File)) {
        return false; // Not a file
      }
      const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
      return allowedTypes.includes(file.type);
    },
    {
      message: "Banner must be a valid image file (JPEG, PNG, GIF).",
    }
  ),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  name: "",
  symbol: "",
  url: "",
  category: "",
  chain: "",
};

function convertObjectToFormData(data: any) {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      formData.append(key, data[key]);
    }
  }
  return formData;
}

import { useLoadingModal } from "@/hooks/useLoadingModal";
import { allCategories } from "@/config/docs";
import { useWeb3Account } from "@/hooks/useAccount";
import { useWeb3Modal } from "@web3modal/wagmi/react";

export default function CreateCollectionForm() {
  const router = useRouter();
  const { open } = useWeb3Modal();
  const { data: walletClient } = useWalletClient();
  const { setIsOpen, setSteps, setCurrentRunning } = useLoadingModal();

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      setSteps([
        {
          id: 1,
          title: "Basic Setup",
          desc: "basic setup for creating collection",
        },
        {
          id: 2,
          title: "Creating Collection",
          desc: "deploying the contract to blockchain",
        },
        {
          id: 3,
          title: "Uploading Images",
          desc: "uploading the logo and banner image",
        },
      ]);
      setIsOpen(true);
      setCurrentRunning(1);
      setCurrentRunning(2);

      const hash = await walletClient?.deployContract({
        abi: NSTSpace.abi,
        bytecode: NSTSpace.bytecode as `0x${string}`,
        args: [data.name, data.symbol],
      });

      if (!hash) {
        throw new Error("TRANSCATION NOT STARTED YET");
      }

      const receipt = await waitForTransactionReceipt(config as any, {
        hash,
      });
      setCurrentRunning(3);

      if (receipt?.logs && receipt?.logs.length > 0) {
        const firstLogAddress = receipt?.logs[0].address;
        let datas = convertObjectToFormData({
          ...data,
          contract: firstLogAddress,
          user: account,
        });

        console.log("formDaya is :", datas);
        mutateCollection(datas);
      }

      console.log("contract created is :", hash);
    } catch (error) {
      console.log("error in deploying contract is :", error);
      toast({
        title: "CONTRACT NOT DEPLOYED ",
        // description: (
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">error </code>
        //   </pre>
        // ),
      });
      setIsOpen(false);
    }
  }

  const [previewLogo, setPreviewLogo] = useState("");
  const [previewBanner, setPreviewBanner] = useState("");

  const { mutate: mutateCollection, isPending: isLoading } = useMutation({
    mutationKey: ["collections"],
    mutationFn: async (data: FormData) => {
      return createCollection(data).then((res) => res.data);
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
      setIsOpen(false);
    },
    onSuccess: async (data) => {
      console.log("success data is :", data);
      toast({
        title: "Collection Created Successfully",
        // description: (
        //   <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //     <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //   </pre>
        // ),
      });
      form.reset();
      setIsOpen(false);
      router.push(`/profile/${address}/`);

      // queryClient.invalidateQueries({ queryKey: ["products"] });
      // setName("");
      // setSymbol("");
      // setUrl("");

      // setLogo(null);
      // setBanner(null);
      return;
    },
  });

  const { account } = useContext(GlobalContext) as ContextType;
  const { address } = useAccount();
  const { authUser } = useWeb3Account();

  useEffect(() => {
    if (!address || !authUser) {
      open();

      // toast({
      //   title: "Login first",
      // });
      router.push("/create");
    }
  }, [address, authUser, router]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4  bg-[url('/bg-pattern.png')] bg-fixed bg-cover">
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
                  Create Collection
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  deploy contract
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
                      <CardTitle>Collection Details</CardTitle>
                      <CardDescription>
                        fill details regarding your collection
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
                                <FormLabel>collection name</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="collection name"
                                    {...field}
                                  />
                                </FormControl>
                                <FormDescription>
                                  This is your public display collection name.
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="symbol"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>symbol</FormLabel>
                                <FormControl>
                                  <Input placeholder="symbol " {...field} />
                                </FormControl>
                                <FormDescription>
                                  This is your public display symbol name
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
                                  <Input placeholder="Url " {...field} />
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
                      <CardTitle>Category</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 ">
                        <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel> Category</FormLabel>
                                <Select
                                  // required
                                  onValueChange={field.onChange}
                                  // defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {allCategories.map(
                                      (item: any, index: any) => {
                                        return (
                                          <SelectItem
                                            key={index}
                                            value={item.value}
                                          >
                                            {item.name}
                                          </SelectItem>
                                        );
                                      }
                                    )}
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  select category
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card x-chunk="dashboard-07-chunk-2">
                    <CardHeader>
                      <CardTitle> Chain </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6 ">
                        {/* <div className="grid gap-6 sm:grid-cols-3"> */}
                        <div className="grid gap-3">
                          <FormField
                            control={form.control}
                            name="chain"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel> Chain</FormLabel>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select a chain" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="polygon">
                                      polygon
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormDescription>
                                  select your chain
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
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
                      <CardTitle>Logo Image</CardTitle>
                      <CardDescription>set you collection logo</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        {previewLogo && (
                          <Image
                            alt="logo image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="100"
                            src={previewLogo}
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
                                <FormLabel>logo</FormLabel>
                                <FormControl>
                                  <Input
                                    {...fieldProps}
                                    placeholder="Picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const { files, displayUrl } =
                                        getImageData(event);
                                      setPreviewLogo(displayUrl);
                                      onChange(
                                        event.target.files &&
                                          event.target.files[0]
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormDescription>
                                  logo size must be 350 x 350 and file type of
                                  png,jpg,jpeg,svg or gif
                                </FormDescription>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card
                    className="overflow-hidden"
                    x-chunk="dashboard-07-chunk-4"
                  >
                    <CardHeader>
                      <CardTitle>Banner Image</CardTitle>
                      <CardDescription>
                        set you collection banner
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-2">
                        {previewBanner && (
                          <Image
                            alt="Banner image"
                            className="aspect-square w-full rounded-md object-cover"
                            height="100"
                            src={previewBanner}
                            width="100"
                          />
                        )}

                        <div className="w-full">
                          <FormField
                            control={form.control}
                            name="banner"
                            render={({
                              field: { value, onChange, ...fieldProps },
                            }) => (
                              <FormItem>
                                <FormLabel>banner</FormLabel>
                                <FormControl>
                                  <Input
                                    {...fieldProps}
                                    placeholder="Picture"
                                    type="file"
                                    accept="image/*"
                                    onChange={(event) => {
                                      const { files, displayUrl } =
                                        getImageData(event);
                                      setPreviewBanner(displayUrl);
                                      onChange(
                                        event.target.files &&
                                          event.target.files[0]
                                      );
                                    }}
                                  />
                                </FormControl>
                                <FormDescription>
                                  banner size must be 600 x 400 and file type of
                                  png,jpg,jpeg,svg or gif
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
                {/* <Button
                  onClick={() => {
                    // onSubmit();
                  }}
                  size="sm"
                >
                  Save Product
                </Button> */}
              </div>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}
