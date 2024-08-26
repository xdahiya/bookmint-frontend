import React from "react";
import Link from "next/link";
import Image from "next/image";

import Loading from "@/components/Loading";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { getNFTCollectionStats } from "@/http/web3";

function isIterable(obj: any) {
  return (
    typeof obj === "object" &&
    obj !== null &&
    typeof obj[Symbol.iterator] === "function"
  );
}

function CollectionTable({ data, isLoading, isError, serialNo }: any) {
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
          {serialNo && <TableHead className="w-[100px]">No</TableHead>}
          <TableHead className="w-[100px]">
            Collection
            <span className="sr-only">Image</span>
          </TableHead>
          {/* <TableHead className="w-[100px]">
            Image
            <span className="sr-only">Image</span>
          </TableHead> */}
          <TableHead>Name</TableHead>
          <TableHead>Symbol</TableHead>
          <TableHead>Floor Price</TableHead>
          {/* <TableHead>Owners</TableHead> */}
          {/* <TableHead>Transfers</TableHead> */}
          {/* <TableHead>Volume</TableHead> */}
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
                {serialNo && (
                  <TableCell className="table-cell">
                    <Badge variant="outline">{index + 1}</Badge>
                  </TableCell>
                )}
                <TableCell className="table-cell">
                  <Image
                    alt="Product image"
                    className="aspect-square rounded-md object-cover"
                    height="64"
                    src={data.logo || "/nologo.png"}
                    width="64"
                  />
                </TableCell>
                <TableCell className="font-medium">
                  <Link href={`/collection/${data.contract}`}>{data.name}</Link>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{data.symbol}</Badge>
                </TableCell>
                <TableCell>
                  <p>0.00 Matic</p>
                </TableCell>
                {/* <TableCell>
                  <h1>
                    <OwnerDetails address={data.contract} />
                  </h1>
                </TableCell> */}
                {/* <TableCell>
                  <h1>{data.contract}</h1>
                </TableCell> */}
                {/* <TableCell>
                  <h1>0.00 ETH</h1>
                </TableCell> */}
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

import { useEvmContractNFTs } from "@moralisweb3/next";

// async function OwnerDetails({ address }: { address: string }) {
//   console.log("address is :", address);
//   // const { data } = useEvmContractNFTs({
//   //   chain: "0x13882",
//   //   format: "decimal",
//   //   normalizeMetadata: true,
//   //   address: address as `0x${string}`,
//   // });
//   // console.log("Data is : ", data);

//   const data = await getNFTCollectionStats(address);
//   console.log("Data is :", data);
//   return <h1>Raman {JSON.stringify(data)}</h1>;
// }

export default CollectionTable;
