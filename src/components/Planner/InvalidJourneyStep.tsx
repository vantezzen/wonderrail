import { AlertTriangle } from "lucide-react";
import React from "react";

function InvalidJourneyStep() {
  return (
    <div className="flex items-center gap-4 text-zinc-600">
      <AlertTriangle className="" size={16} />

      <div>
        <div className="text-zinc-400 font-medium">Unknown connection</div>
      </div>
    </div>
  );
}

export default InvalidJourneyStep;
