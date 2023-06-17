import { Loader2 } from "lucide-react";
import React from "react";

function AiApplying() {
  return (
    <div className="mt-6 text-center">
      <Loader2 className="animate-spin text-zinc-400 mx-auto mb-6" size={48} />
      <h3 className="font-medium text-zinc-400">Applying your itinerary</h3>
      <p className="text-zinc-500 font-medium text-sm">
        We are now applying your itinerary to the map. This can take a few
        seconds, please don't close this page.
      </p>
    </div>
  );
}

export default AiApplying;
