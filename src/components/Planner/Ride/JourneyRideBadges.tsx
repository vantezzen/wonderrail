import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { JourneyRide } from "@/lib/types";
import JourneyRideBadge from "./JourneyRideBadge";
import { FileCheck, Receipt, ReplaceAll, Ticket } from "lucide-react";
import JourneyRideLayoversCheck from "./JourneyRideLayoversCheck";
import JourneyRideStationDistanceCheck from "./JourneyRideStationDistanceCheck";

function JourneyRideBadges({ ride }: { ride: JourneyRide }) {
  return (
    <>
      {ride.needsReservation ? (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge icon={<Ticket className="" size={16} />} />
          </TooltipTrigger>

          <TooltipContent>This ride requires a reservation</TooltipContent>
        </Tooltip>
      ) : (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge icon={<FileCheck className="" size={16} />} />
          </TooltipTrigger>

          <TooltipContent>This ride requires no reservation</TooltipContent>
        </Tooltip>
      )}
      {ride.price && ride.price > 0 && (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge icon={<Receipt className="" size={16} />}>
              {ride.price}€
            </JourneyRideBadge>
          </TooltipTrigger>
          <TooltipContent>
            Total price for <strong>mandatory</strong> reservations.
          </TooltipContent>
        </Tooltip>
      )}
      {ride.changes > 0 && (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge icon={<ReplaceAll className="" size={16} />}>
              {ride.changes}
            </JourneyRideBadge>
          </TooltipTrigger>

          <TooltipContent>
            This ride has {ride.changes}{" "}
            {ride.changes > 1 ? "changes" : "change"}
          </TooltipContent>
        </Tooltip>
      )}
      <JourneyRideLayoversCheck ride={ride} />
      <JourneyRideStationDistanceCheck ride={ride} />
    </>
  );
}

export default JourneyRideBadges;
