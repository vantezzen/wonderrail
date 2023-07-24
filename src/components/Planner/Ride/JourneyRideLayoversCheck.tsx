import LayoverChecker, { LayoverType } from "@/lib/Journey/LayoverChecker";
import { JourneyRide } from "@/lib/types";
import { Clock8, MoonStar } from "lucide-react";
import React, { useState } from "react";
import JourneyRideBadge from "./JourneyRideBadge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Clock1 } from "lucide-react";

function JourneyRideLayoversCheck({ ride }: { ride: JourneyRide }) {
  const [layoverChecker] = useState(() => new LayoverChecker());
  const alerts = layoverChecker.checkRide(ride);

  const overnightLayovers = alerts.filter(
    (alert) => alert.type === LayoverType.OvernightLayover
  );
  const longLayovers = alerts.filter(
    (alert) => alert.type === LayoverType.LongLayovers
  );
  const shortLayovers = alerts.filter(
    (alert) => alert.type === LayoverType.ShortLayovers
  );

  return (
    <>
      {overnightLayovers.length > 0 && (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge
              icon={<MoonStar className="" size={16} />}
              className="bg-pink-700 hover:bg-pink-700"
            />
          </TooltipTrigger>

          <TooltipContent>
            This ride has an overnight layover in{" "}
            {overnightLayovers
              .map((alert) => alert.leg.start.station)
              .join(" and ")}
            .
          </TooltipContent>
        </Tooltip>
      )}
      {longLayovers.length > 0 && (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge
              icon={<Clock8 className="" size={16} />}
              className="bg-pink-700 hover:bg-pink-700"
            />
          </TooltipTrigger>

          <TooltipContent>
            This ride has a long layover in{" "}
            {longLayovers.map((alert) => alert.leg.start.station).join(" and ")}
            .
          </TooltipContent>
        </Tooltip>
      )}
      {shortLayovers.length > 0 && (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge
              icon={<Clock1 className="" size={16} />}
              className="bg-pink-700 hover:bg-pink-700"
            />
          </TooltipTrigger>

          <TooltipContent>
            This ride has a short layover in{" "}
            {shortLayovers
              .map((alert) => alert.leg.start.station)
              .join(" and ")}
            .
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}

export default JourneyRideLayoversCheck;
