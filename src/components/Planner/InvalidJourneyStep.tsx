import { AlertTriangle, Train } from "lucide-react";
import React from "react";

function InvalidJourneyStep() {
  return (
    <div className="flex items-center gap-4 text-slate-600">
      <AlertTriangle className="" size={16} />

      <div>
        <div className=" font-medium">Unknown connection</div>
      </div>
    </div>
  );
}

export default InvalidJourneyStep;
