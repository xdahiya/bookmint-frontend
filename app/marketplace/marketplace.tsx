"use client";

import Link from "next/link";
import { debounce } from "lodash";
import { useRouter, useSearchParams } from "next/navigation";
import { PlusCircle, Search } from "lucide-react";
import { ChangeEvent, useMemo, useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import { allCategories } from "@/config/docs";
import { getCollections } from "@/http/client";

import CollectionTable from "@/components/collections-table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useCheckSubscription from "../useCheckSubscription";

export default function AllCollections() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { balance1, balance2, balance3 } = useCheckSubscription();

  if (balance1 < 1 && balance2 < 1 && balance3 < 1) {
    router.push(`/`);
  }

  const [queryParams, setQueryParams] = useState<any>({
    limit: 8,
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
    gcTime: 1000,
    queryFn: async () => {
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

  const debouncedQUpdate = useMemo(() => {
    return debounce((value: string | undefined) => {
      setQueryParams((prev: any) => ({ ...prev, q: value, page: 1 }));
    }, 500);
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 bg-[url('/bg-pattern.png')] bg-contain bg-fixed">
      <div className="flex flex-col sm:gap-4 sm:py-4  ">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  <Link href="#">Collections</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex justify-center items-center gap-2 relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                // console.log("data:", event.target.value);
                debouncedQUpdate(event.target.value);
              }}
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
            <Link href={"/create/collection"}>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Collection
                </span>
              </Button>
            </Link>
          </div>
        </header>
        <main className=" gap-4 p-2 sm:px-6 sm:py-0 md:gap-8 ">
          <Tabs
            defaultValue={searchParams.get("category") || "all"}
            onValueChange={(category) => {
              if (category == "all") {
                setQueryParams((params: any) => {
                  return { ...params, page: 1, category: "" };
                });
                const params = new URLSearchParams(searchParams.toString());
                params.set("category", category);
                window.history.pushState(null, "", `?`);
              } else {
                setQueryParams((params: any) => {
                  return { ...params, page: 1, category: category };
                });
                const params = new URLSearchParams(searchParams.toString());
                params.set("category", category);
                window.history.pushState(null, "", `?${params.toString()}`);
              }
            }}
          >
            {/*TAB LIST*/}
            <div className=" overflow-scroll mb-2">
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                {allCategories.map((item: any, index: any) => {
                  return (
                    <TabsTrigger key={index} value={item.value}>
                      {item.name}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
            </div>
            {/*END TAB LIST*/}

            {/*Main*/}
            <Card className="border-b backdrop-blur-sm bg-white/[0.5] dark:bg-black/[0.5] border-neutral-200 dark:border-white/[0.1] ">
              <CardHeader>
                <CardTitle>Collections</CardTitle>
                <CardDescription>all collections data</CardDescription>
              </CardHeader>

              <CardContent className="h-[50vh] overflow-scroll">
                <CollectionTable
                  data={collections?.data}
                  isLoading={isLoading || isFetching}
                  isError={isError && error.message}
                />
              </CardContent>

              <CardFooter>
                <div className="flex items-center justify-between w-full">
                  {collections && (
                    <div className="text-xs text-muted-foreground">
                      Showing
                      <strong>
                        {collections.pageSize * (collections.currentPage - 1)}-
                        {collections.pageSize * collections.currentPage}
                      </strong>
                      of <strong>{collections.total}</strong> collections
                    </div>
                  )}

                  <div className="flex items-center justify-end space-x-2 py-4">
                    {collections && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setQueryParams((prev: any) => {
                              return {
                                ...prev,
                                page: prev.page - 1,
                              };
                            });
                          }}
                          disabled={collections.currentPage <= 1}
                        >
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setQueryParams((prev: any) => {
                              return {
                                ...prev,
                                page: prev.page + 1,
                              };
                            });
                          }}
                          disabled={
                            collections.total <=
                            collections.pageSize * collections.currentPage
                          }
                        >
                          Next
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </CardFooter>
            </Card>
            {/*End Main */}
          </Tabs>
        </main>
      </div>
    </div>
  );
}
