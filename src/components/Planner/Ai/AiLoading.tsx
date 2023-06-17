import { Loader2 } from "lucide-react";
import React from "react";

function AiLoading() {
  return (
    <div className="mt-6 text-center">
      <Loader2 className="animate-spin text-zinc-400 mx-auto mb-6" size={48} />
      <h3 className="font-medium text-zinc-400">Creating your journey</h3>
      <p className="text-zinc-500 font-medium text-sm">
        Our AI is creating your journey. This can take up to a minute, please
        don't close this page.
      </p>
    </div>
  );
}

export default AiLoading;
