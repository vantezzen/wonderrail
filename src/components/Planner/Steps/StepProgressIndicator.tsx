import { JourneyStep } from "@/lib/types";
import React from "react";
import { cn } from "@/lib/utils";
import { Train } from "lucide-react";

enum CurrentStepStatus {
  upcoming,
  current,
  past,
}

function StepProgressIndicator({ step }: { step: JourneyStep }) {
  const currentStepStatus = React.useMemo(() => {
    if (!("timerange" in step)) return CurrentStepStatus.upcoming;
    const now = new Date();
    if (step.timerange.start > now) return CurrentStepStatus.upcoming;
    if (step.timerange.end < now) return CurrentStepStatus.past;
    return CurrentStepStatus.current;
  }, [step]);

  return (
    <div
      className={cn(
        "w-4 h-12 rounded-lg",
        currentStepStatus === CurrentStepStatus.current && "bg-zinc-700",
        currentStepStatus === CurrentStepStatus.past && "bg-brand-400",
        currentStepStatus === CurrentStepStatus.upcoming && "bg-zinc-700"
      )}
    >
      {currentStepStatus === CurrentStepStatus.current && (
        <>
          <div
            className="absolute top-1/2 left-1/2 w-7 h-7 bg-brand-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center z-10
          "
          >
            <Train className="text-zinc-100" size={14} />
          </div>

          <div className="absolute top-0 left-0 h-1/2 bg-brand-400 w-3 rounded-lg" />
        </>
      )}
    </div>
  );
}

export default StepProgressIndicator;
