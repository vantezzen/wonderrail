import { JourneyRide } from "@/lib/types";
import { durationBetween } from "@/lib/utils/date";
import { MoreVertical, Train } from "lucide-react";
import React from "react";

function JourneyRide({ ride }: { ride: JourneyRide }) {
  const duration = durationBetween(ride.timerange.start, ride.timerange.end);

  return (
    <div className="flex items-center gap-4 text-slate-600">
      <Train className="" size={16} />

      <div>
        <div className=" font-medium">{ride.name}</div>
        <div className=" text-sm">{duration}h</div>
      </div>
    </div>
  );
}

export default JourneyRide;
