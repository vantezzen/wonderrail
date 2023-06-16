import { JourneyRide } from "@/lib/types";
import { durationBetween, formatDateTime, formatTime } from "@/lib/utils/date";
import { Info, Receipt, ReplaceAll, Train } from "lucide-react";
import React from "react";
import JourneyRideBadge from "./JourneyRideBadge";
import JourneyRideDetailsModal from "./JourneyRideDetailsModal";

function JourneyRide({ ride }: { ride: JourneyRide }) {
  const duration = durationBetween(ride.timerange.start, ride.timerange.end);

  const isStartEndDateEqual =
    ride.timerange.start.toLocaleDateString() ===
    ride.timerange.end.toLocaleDateString();

  return (
    <div className="flex items-center gap-4 text-slate-600">
      <Train className="" size={16} />

      <div>
        <div className=" font-medium text-slate-200">{ride.name}</div>
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

      <JourneyRideDetailsModal ride={ride} />
    </div>
  );
}

export default JourneyRide;
