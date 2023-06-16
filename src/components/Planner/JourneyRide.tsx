import { JourneyRide } from "@/lib/types";
import { durationBetween, formatDateTime } from "@/lib/utils/date";
import { Info, Receipt, ReplaceAll, Train } from "lucide-react";
import React from "react";
import JourneyRideBadge from "./JourneyRideBadge";

function JourneyRide({ ride }: { ride: JourneyRide }) {
  const duration = durationBetween(ride.timerange.start, ride.timerange.end);

  return (
    <div className="flex items-center gap-4 text-slate-600">
      <Train className="" size={16} />

      <div>
        <div className=" font-medium text-slate-200">{ride.name}</div>
        <div className=" text-sm">
          {duration}h (
          <span suppressHydrationWarning>
            {formatDateTime(ride.timerange.start)} -{" "}
            {formatDateTime(ride.timerange.end)}
          </span>
          )
        </div>

        <div className="flex gap-1 mt-2">
          {ride.needsReservation && (
            <JourneyRideBadge icon={<Info className="" size={16} />}>
              Needs reservation
            </JourneyRideBadge>
          )}
          {ride.price > 0 && (
            <JourneyRideBadge icon={<Receipt className="" size={16} />}>
              {ride.price}€
            </JourneyRideBadge>
          )}
          {ride.changes > 0 && (
            <JourneyRideBadge icon={<ReplaceAll className="" size={16} />}>
              {ride.changes} {ride.changes > 1 ? "changes" : "change"}
            </JourneyRideBadge>
          )}
        </div>
      </div>
    </div>
  );
}

export default JourneyRide;
