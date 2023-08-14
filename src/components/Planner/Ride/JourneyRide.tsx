import { JourneyRide } from "@/lib/types";
import { durationBetween, formatDateTime, formatTime } from "@/lib/utils/date";
import { ExternalLink, Info, Plus, ShoppingCart, Train } from "lucide-react";
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
import AlternativeRideSelector from "../AlternativeRideSelector";
import { trackEvent } from "@/lib/analytics";
import useContextSectionStore from "../ContextSection/contextState";

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
    <div className="flex xl:items-center gap-4 text-zinc-600 w-full flex-col xl:flex-row">
      <Train className="hidden xl:block" size={16} />

      <div className="mr-auto">
        <div className=" font-bold text-sm dark:text-zinc-200 text-zinc-800">
          {ride.name}
        </div>
        <div className=" text-sm">
          {duration}h (
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
          )
        </div>

        <div className="flex gap-1 mt-2" onClick={() => setIsDetailsOpen(true)}>
          <JourneyRideBadges ride={ride} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
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
              <Info size={16} className="w-5 h-5" />
              <div className="md:hidden ml-2">Ride details</div>
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ride details</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="secondary"
              size="sm"
              className="w-fit"
              disabled={isReadonly}
              onClick={() => {
                addLocationBeforeThisRide?.();
                trackEvent("planner_add_location_between");
              }}
            >
              <Plus size={16} />

              <div className="md:hidden ml-2">Add another location</div>
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            Add another location between these locations
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <Button variant="secondary" size="sm" asChild className="w-fit">
              <a
                href={planner.interrail.getBookingUrl(ride)}
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  trackEvent("planner_book_reservation");
                }}
              >
                <ShoppingCart size={16} />
                <div className="md:hidden ml-2">Book reservations</div>
              </a>
            </Button>
          </TooltipTrigger>

          <TooltipContent className="flex gap-2 items-center">
            Book reservations
            <ExternalLink size={16} />
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger>
            <AlternativeRideSelector ride={ride} />
          </TooltipTrigger>

          <TooltipContent>
            Choose an alternative ride for this leg
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export default JourneyRide;
