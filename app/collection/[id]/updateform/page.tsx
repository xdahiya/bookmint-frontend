"use client";

import React from "react";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { useParams, useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { getCollection, updateCollection, updateUser } from "@/http/client";
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { ChevronLeft, Loader2, Pen } from "lucide-react";
import { getImageData } from "@/lib/utils";
import { useEffect, useState } from "react";

const profileFormSchema = z.object({
  url: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  twitterUrl: z.string().optional(),
  otherUrl: z.string().optional(),
  description: z.string().optional(),

  logo: z
    .any()
    .optional()
    .refine(
      (file) => {
        // console.log("current file type is :", file.type);
        // Validate file type here, for example, only allow certain image types
        if (file === undefined) {
          return true; // If file is undefined (optional), it's valid
        }
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
  banner: z
    .any()
    .optional()
    .refine(
      (file) => {
        // Validate file type here, for example, only allow certain image types
        if (file === undefined) {
          return true; // If file is undefined (optional), it's valid
        }
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

function convertObjectToFormData(data: any) {
  const formData = new FormData();
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      if (data[key]) {
        formData.append(key, data[key]);
      }
    }
  }
  return formData;
}

function EditCollection() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { id } = useParams();
  const [previewLogo, setPreviewLogo] = useState("");
  const [previewBanner, setPreviewBanner] = useState("");
  // const [url, setUrl] = useState("");

  const {
    data: collection,
    isFetching: collectionDataFetching,
    isLoading: collectionDataLoading,
    isError: collectionDataIsError,
    error: collectionDataError,
  } = useQuery({
    queryKey: ["collection", id],
    gcTime: 1000,
    queryFn: async () => {
      return getCollection(id as string).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  const defaultValues: Partial<ProfileFormValues> = {
    url: (collection && collection?.url) || "No Url",
    twitterUrl: (collection && collection?.twitterUrl) || "",
    otherUrl: (collection && collection?.otherUrl) || "",
    description: (collection && collection?.description) || "",
  };

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (collection && collection?.logo) {
      setPreviewLogo(collection?.logo);
    }
    if (collection && collection?.banner) {
      setPreviewBanner(collection?.banner);
    }
    if (collection && collection?.url) {
      form.setValue("url", collection?.url);
    }
    if (collection && collection?.twitterUrl) {
      form.setValue("twitterUrl", collection?.twitterUrl);
    }
    if (collection && collection?.otherUrl) {
      form.setValue("otherUrl", collection?.otherUrl);
    }
    if (collection && collection?.description) {
      form.setValue("description", collection?.description);
    }
  }, [collection, form]);
  // console.log(previewLogo);

  const { mutate: updateUsers, isPending: isLoading } = useMutation({
    mutationKey: ["updatecollection", id],
    mutationFn: async (data: FormData) => {
      return updateCollection(id as string, data).then((res) => res.data);
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
      console.log("success data is :", data);
      toast({
        title: "Collection Updated Successfully",
      });
      // form.reset();
      // setIsOpen(false);
      // router.refresh();
      // router.push("/");

      queryClient.invalidateQueries({ queryKey: ["collection"] });
      // setName("");
      // setSymbol("");
      // setUrl("");

      // setLogo(null);
      // setBanner(null);
      return;
    },
  });

  async function onSubmit(data: ProfileFormValues) {
    let datas = convertObjectToFormData({ ...data });
    updateUsers(datas);
  }

  return (
    <>
      <div className="flex">
        <Form {...form}>
          <form
            id="collectionform"
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full"
          >
            <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardContent>
                  <div className="grid gap-3 mt-8">
                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>collection description</FormLabel>
                          <FormControl>
                            <Input placeholder="description" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display collection description.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3 mt-8">
                    <FormField
                      control={form.control}
                      name="url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>website link</FormLabel>
                          <FormControl>
                            <Input placeholder="url" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display website url.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="grid gap-3 mt-8">
                    <FormField
                      control={form.control}
                      name="twitterUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>twitter link</FormLabel>
                          <FormControl>
                            <Input placeholder="twitterUrl" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display twitte url.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  {/* <div className="grid gap-3 mt-8">
                    <FormField
                      control={form.control}
                      name="otherUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>other link</FormLabel>
                          <FormControl>
                            <Input placeholder="otherUrl" {...field} />
                          </FormControl>
                          <FormDescription>
                            This is your public display url.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div> */}
                  <div className="grid gap-2 mt-8">
                    {previewLogo && (
                      <Image
                        alt="logo image"
                        className="aspect-square w-40 rounded-md object-cover"
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
                            <FormLabel>Logo Image</FormLabel>
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
                                    event.target.files && event.target.files[0]
                                  );
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              this is your profile logo.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
                <CardHeader>
                  <CardTitle>Banner Image</CardTitle>
                  <CardDescription>set you profile banner</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {previewBanner && (
                      <Image
                        alt="Banner image"
                        className="aspect-square w-40 rounded-md object-cover"
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
                                    event.target.files && event.target.files[0]
                                  );
                                }}
                              />
                            </FormControl>
                            <FormDescription>
                              this is your profile banner.
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
          </form>
        </Form>
      </div>
      <div className="mt-4 flex w-full justify-center">
        {isLoading ? (
          <Button disabled size="sm">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Updating
          </Button>
        ) : (
          <Button type="submit" form="collectionform" size="sm">
            Submit
          </Button>
        )}
      </div>
    </>
  );
}

export default EditCollection;
