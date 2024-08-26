import { Suspense } from "react";
import Loading from "@/components/Loading";
import AllCollections from "@/app/marketplace/marketplace";

export default async function Dashboard() {
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
          <AllCollections />
        </Suspense>
      </div>
    </>
  );
}
