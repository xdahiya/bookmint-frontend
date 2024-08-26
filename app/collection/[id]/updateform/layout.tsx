"use client";
import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./components/sidebar-nav";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Share } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import { useParams } from "next/navigation";

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  const { id } = useParams();

  const sidebarNavItems = [
    {
      title: "Collection",
      href: `/collection/${id}/updateform`,
    },
    // {
    //   title: "Profile",
    //   href: `/collection/${id}/updateform/profile`,
    // },
    // {
    //   title: "Account",
    //   href: `/collection/${id}/updateform/account`,
    // },
    // {
    //   title: "Appearance",
    //   href: "/forms/appearance",
    // },
    // {
    //   title: "Notifications",
    //   href: "/forms/notifications",
    // },
    // {
    //   title: "Display",
    //   href: "/forms/display",
    // },
  ];

  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div> */}
      <header className="mt-4 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
        <div className=" mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Link href={`/collection/${id}/`}>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>

            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Collection
            </h1>

            <Badge variant="outline" className="ml-auto sm:ml-0">
              edit collection
            </Badge>

            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              {/* <Button
                type="submit"
                form="collectionform"
                onClick={() => {
                  navigator.clipboard.writeText(href as string);
                  toast({ title: "Share Link Copied" });
                }}
                size="sm"
              >
                <Share />
                <span className="ml-2">Share</span>
              </Button> */}
            </div>
          </div>
        </div>
      </header>
      <div className="space-y-6 p-10 pb-16 block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Edit Collection</h2>
          <p className="text-muted-foreground">
            update your collection details
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 ">{children}</div>
        </div>
      </div>
    </>
  );
}
