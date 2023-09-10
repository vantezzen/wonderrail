import { JourneyRide } from "@/lib/types";
import { durationBetween, formatDateTime, formatTime } from "@/lib/utils/date";
import { ChevronRight, Plus, Train } from "lucide-react";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import usePlannerStore from "../plannerStore";
import JourneyRideBadges from "./JourneyRideBadges";
import { trackEvent } from "@/lib/analytics";
import useContextSectionStore from "../ContextSection/contextState";
import StepProgressIndicator from "../Steps/StepProgressIndicator";

function JourneyRide({
  ride,
  addLocationBeforeThisRide,
}: {
  ride: JourneyRide;
  addLocationBeforeThisRide?: () => void;
}) {
  const planner = usePlannerStore((state) => state.planner);
  const duration = durationBetween(ride.timerange.start, ride.timerange.end);

  const isStartEndDateEqual =
    ride.timerange.start.toLocaleDateString() ===
    ride.timerange.end.toLocaleDateString();

  const isReadonly = useIsReadOnly();

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const setContext = useContextSectionStore((state) => state.setContext);

  return (
    <div className="flex items-center gap-4 text-zinc-600 w-full border-2 border-zinc-400 rounded-lg">
      <div className="border-r-2 border-dashed border-zinc-400 p-4 pr-8 ml-2 flex items-center self-stretch relative">
        <Train size={16} />

        {/* Top Half circle */}
        <div
          className="
          absolute rounded-full top-0 right-0 
          translate-x-1/2 translate-y-[-50%] 
          w-5 h-5 
          bg-zinc-100 border-2 border-zinc-400
        "
          style={{
            clipPath: "polygon(0 40%, 100% 40%, 100% 100%, 0% 100%)",
          }}
        ></div>
        {/* Bottom Half circle */}
        <div
          className="
          absolute rounded-full bottom-0 right-0 
          translate-x-1/2 translate-y-1/2 
          w-5 h-5 
          bg-zinc-100 border-2 border-zinc-400
        "
          style={{
            clipPath: "polygon(0 0, 100% 0, 100% 60%, 0% 60%)",
          }}
        ></div>
      </div>

      <div className="mr-auto p-2 flex gap-3 items-center">
        <div className="font-bold text-xs">
          <span suppressHydrationWarning>
            {isStartEndDateEqual ? (
              <>
                {formatDateTime(ride.timerange.start)} -{" "}
                {formatTime(ride.timerange.end)}
              </>
            ) : (
              <>
                {formatDateTime(ride.timerange.start)} -{" "}
                {formatDateTime(ride.timerange.end)}
              </>
            )}
          </span>
        </div>

        <div
          className="flex gap-1 flex-wrap justify-end"
          onClick={() => setIsDetailsOpen(true)}
        >
          <JourneyRideBadges ride={ride} />
        </div>
      </div>

      <div className="flex gap-2">
        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="ghost"
              size="sm"
              className="w-fit bg-zinc-200 hover:bg-zinc-300 text-xs"
              disabled={isReadonly}
              onClick={() => {
                addLocationBeforeThisRide?.();
                trackEvent("planner_add_location_between");
              }}
            >
              <Plus size={16} />

              <div className="ml-2">Add city between</div>
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            Add another location between these locations
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="sm"
              className="w-fit"
              onClick={() => {
                setContext({
                  type: "rideDetails",
                  rideId: ride.id,
                });
                trackEvent("planner_set_context_ride_details");
              }}
            >
              <ChevronRight size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ride details</TooltipContent>
        </Tooltip>
      </div>

      <div className="relative mr-4">
        <StepProgressIndicator step={ride} />
      </div>
    </div>
  );
}

export default JourneyRide;
