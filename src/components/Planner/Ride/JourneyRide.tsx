import { JourneyRide } from "@/lib/types";
import { durationBetween, formatDateTime, formatTime } from "@/lib/utils/date";
import { ExternalLink, Plus, ShoppingCart, Train } from "lucide-react";
import React, { useState } from "react";
import JourneyRideDetailsModal from "./JourneyRideDetailsModal";
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

  return (
    <div className="flex xl:items-center gap-4 text-zinc-600 w-full flex-col xl:flex-row">
      <Train className="hidden xl:block" size={16} />

      <div className="mr-auto">
        <div className=" font-bold text-sm text-zinc-200">{ride.name}</div>
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
        <JourneyRideDetailsModal
          ride={ride}
          open={isDetailsOpen}
          setIsOpen={setIsDetailsOpen}
        />

        <Tooltip>
          <TooltipTrigger>
            <Button
              variant="secondary"
              size="sm"
              className="w-full md:w-auto"
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
            <Button
              variant="secondary"
              size="sm"
              asChild
              className="w-full md:w-auto"
            >
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
