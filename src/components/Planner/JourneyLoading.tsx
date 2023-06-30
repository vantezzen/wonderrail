import { Loader2 } from "lucide-react";
import React from "react";

function JourneyLoading() {
  return (
    <div className="fixed bottom-0 right-0 m-3 flex items-center gap-4 z-20 py-3 px-6 rounded-lg bg-zinc-800">
      <Loader2 className="text-white animate-spin" size={16} />

      <div className="text-white">Planning your journey</div>
    </div>
  );
}

export default JourneyLoading;
