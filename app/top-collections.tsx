"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import CollectionTable from "@/components/collections-table";

import { getCollections } from "@/http/client";
import { useSearchParams } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export default function TopCollections() {
  const searchParams = useSearchParams();
  const [queryParams, setQueryParams] = useState<any>({
    limit: 10,
    page: 1,
    category: searchParams.get("category") || "",
  });

  const {
    data: collections,
    isFetching,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["collections", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(
        filteredParams as unknown as Record<string, string>
      ).toString();

      return getCollections(queryString).then((res) => res.data);
    },
    placeholderData: keepPreviousData,
  });

  return (
    <div className="flex  w-full flex-col bg-muted/40  ">
      <div className="flex flex-col sm:gap-4 sm:py-4  ">
        <main className="grid flex-1 items-start gap-4 p-4  sm:py-0 md:gap-8 overflow-scroll">
          <Tabs
            defaultValue={searchParams.get("category") || "all"}
            onValueChange={(category) => {
              if (category == "all") {
                setQueryParams((params: any) => {
                  return { ...params, page: 1, category: "" };
                });
              } else {
                setQueryParams((params: any) => {
                  return { ...params, page: 1, category: category };
                });
              }
            }}
          >
            <Card
              x-chunk="dashboard-06-chunk-0"
              className="border-b backdrop-blur-sm bg-white/[0.5] dark:bg-black/[0.5] border-neutral-200 dark:border-white/[0.1]"
            >
              <CardHeader>
                <CardTitle>Top Collections</CardTitle>
                <CardDescription>
                  top rated collections on NFTSpace Marketplace.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CollectionTable
                  serialNo={true}
                  data={collections?.data}
                  isLoading={isLoading || isFetching}
                  isError={isError && error.message}
                />
              </CardContent>
            </Card>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
