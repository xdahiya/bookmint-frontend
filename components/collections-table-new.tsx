import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import Loading from "@/components/Loading";

function isIterable(obj: any) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj[Symbol.iterator] === "function"
  );
}

function CollectionTableNew({ data, isLoading, isError }: any) {
  if (isError) {
    return <h1 className="text-red-800 p-10">{isError}</h1>;
  }
  if ((!data || !isIterable(data)) && !isLoading && !isError) {
    return <h1 className="text-red-800 p-10">INCORRECT DATA</h1>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">
            Image
            <span className="sr-only">Image</span>
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>

          {/* <TableHead>
            <span className="sr-only">Actions</span>
          </TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {!isLoading && data && data.length == 0 && (
          <TableRow className="h-24 w-full flex justify-center items-center">
            <TableCell
              colSpan={3}
              className="h-24 w-full flex justify-center items-center"
            >
              NO COLLECTION FOUND
            </TableCell>
          </TableRow>
        )}
        {isLoading ? (
          <TableRow>
            <TableCell
            // colSpan={1}
            // className="h-12 flex justify-center items-center"
            >
              <Loading />
            </TableCell>
          </TableRow>
        ) : (
          data.map((data: any, index: any) => {
            return (
              <TableRow key={index}>
                <TableCell className="table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={
                      "https://catalog-service-mernspace.s3.ap-south-1.amazonaws.com/0ace4462-79e3-4680-98b6-50e1de54d6bf"
                    }
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Link
                    href={`/collections/${data.token_address}/${data.token_id}`}
                  >
                    {data.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{data.symbol}</Badge>
                </TableCell>
                {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
}

export default CollectionTableNew;
