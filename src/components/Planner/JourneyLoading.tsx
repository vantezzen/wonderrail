import { Loader2, Train } from "lucide-react";
import React from "react";

function JourneyLoading() {
  return (
    <div className="fixed z-20 top-0 left-0 w-screen h-screen bg-zinc-900 bg-opacity-60 flex items-center justify-center flex-col gap-3">
      <Train className="text-white" size={40} />

      <div className="text-white font-medium">Planning your journey...</div>
    </div>
  );
}

export default JourneyLoading;
