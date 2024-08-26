import { Suspense } from "react";
import Loading from "@/components/Loading";
import CollectionById from "@/app/collection/[id]/collection";

export default async function Collection() {
  return (
    <>
      <div className="bg-[url('/bg-pattern.png')] bg-contain bg-fixed">
        <Suspense
          fallback={
            <div className="text-red-800 h-[80vh] w-full flex justify-center items-center">
              <Loading />
            </div>
          }
        >
          <CollectionById />
        </Suspense>
      </div>
    </>
  );
}
