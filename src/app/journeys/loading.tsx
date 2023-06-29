import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

function LoadingJourneyPage() {
  return (
    <div className="bg-zinc-900">
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 w-screen h-screen">
        <div className="xl:col-span-2 relative">
          <div className="absolute top-0 left-0 w-full h-full bg-zinc-900 opacity-50"></div>

          <div className="absolute bottom-0 left-0 w-full">
            <Skeleton className="w-full h-[100px] mb-6" />
          </div>
        </div>

        <div className="p-6 bg-zinc-900 h-full lg:overflow-y-auto">
          <Skeleton className="w-full h-[500px] mb-6" />
          <Skeleton className="w-full h-[100px] mb-6" />
          <Skeleton className="w-full h-[100px] mb-6" />
        </div>
      </div>
    </div>
  );
}

export default LoadingJourneyPage;
