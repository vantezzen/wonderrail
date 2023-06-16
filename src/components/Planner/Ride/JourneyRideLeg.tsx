import { InterrailTimetableLeg } from "@/lib/types";
import { ArrowRight, Clock, Dot, ReplaceAll, Train } from "lucide-react";
import React from "react";

const statusTexts = {
  REQUIRED: "Reservation required",
  NOT_REQUIRED: "Reservation not required",
  OPTIONAL: "Reservation optional",
  NO_RESERVATION: "No reservation possible",
  UNKNOWN: "Unknown status",
  OUTDATED: "Train already left",
};

function JourneyRideLeg({ leg }: { leg: InterrailTimetableLeg }) {
  const isStartEndSame = leg.start.id === leg.end.id;

  if (isStartEndSame) {
    return (
      <div key={leg.id} className="flex gap-4 text-zinc-500 items-center">
        <ReplaceAll className="" size={16} />
        <div>
          <div className="text-zinc-200 font-medium flex gap-2 items-center">
            Change ({leg.duration.hours}h {leg.duration.minutes}m)
          </div>
        </div>
      </div>
    );
  }

  const price = leg.prices?.find(
    (price) => price.type === "SECOND_CLASS"
  )?.amount;
  const status =
    leg.status in statusTexts
      ? statusTexts[leg.status as keyof typeof statusTexts]
      : leg.status;

  return (
    <div key={leg.id} className="flex gap-4 text-zinc-500 items-center">
      <Train className="" size={16} />
      <div>
        <div className="text-zinc-200 font-medium flex gap-2 items-center">
          {leg.start.station} <ArrowRight size={14} /> {leg.end.station}
        </div>

        <div className="flex gap-1 items-center text-slate-400">
          <div className="">
            {leg.duration.hours}h {leg.duration.minutes}m
          </div>

          <Dot className="" size={16} />

          <div className="">
            {leg.transport?.code} ({leg.trainType})
          </div>

          {price && (
            <>
              <Dot className="" size={16} />

              <div className="">{price}€</div>
            </>
          )}

          <Dot className="" size={16} />

          <div className="">{status}</div>
        </div>
      </div>
    </div>
  );
}

export default JourneyRideLeg;
