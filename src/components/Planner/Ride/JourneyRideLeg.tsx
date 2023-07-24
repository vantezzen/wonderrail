import { LayoverType, LayoversAlert } from "@/lib/Journey/LayoverChecker";
import { InterrailTimetableLeg } from "@/lib/types";
import { lookup } from "@/lib/utils/number";
import {
  ArrowRight,
  Bus,
  Clock1,
  Clock8,
  Dot,
  MoonStar,
  ReplaceAll,
  School2,
  Train,
} from "lucide-react";
import React from "react";

const statusTexts = {
  REQUIRED: "Reservation required",
  NOT_REQUIRED: "Reservation not required",
  OPTIONAL: "Reservation optional",
  NO_RESERVATION: "No reservation possible",
  UNKNOWN: "Unknown status",
  OUTDATED: "Train already left",
};

function JourneyRideLeg({
  leg,
  alerts,
}: {
  leg: InterrailTimetableLeg;
  alerts: LayoversAlert[];
}) {
  const legType = leg.type;
  const legAlerts = (
    <>
      {alerts
        .filter((alert) => alert.leg.id === leg.id)
        .map((alert) => (
          <div
            className="flex gap-2 items-center text-red-500"
            key={alert.leg.id}
          >
            {alert.type === LayoverType.OvernightLayover && (
              <>
                <MoonStar size={16} />
                You have an overnight layover here.
              </>
            )}
            {alert.type === LayoverType.LongLayovers && (
              <>
                <Clock8 size={16} />
                You have a long layover here.
              </>
            )}
            {alert.type === LayoverType.ShortLayovers && (
              <>
                <Clock1 size={16} />
                You have a short layover here.
              </>
            )}
          </div>
        ))}
    </>
  );

  if (legType === "PLATFORM_CHANGE") {
    return (
      <div key={leg.id} className="flex gap-4 text-zinc-500 items-center">
        <ReplaceAll className="" size={16} />
        <div>
          <div className="dark:text-zinc-200 text-zinc-600 font-medium flex gap-2 items-center">
            Change platform ({leg.duration.hours}h {leg.duration.minutes}m)
          </div>
        </div>
        {legAlerts}
      </div>
    );
  }
  if (legType === "STATION_CHANGE_WALK") {
    return (
      <div key={leg.id} className="flex gap-4 text-zinc-500 items-center">
        <School2 className="" size={16} />
        <div>
          <div className="dark:text-zinc-200 text-zinc-600 font-medium flex gap-2 items-center">
            Change station ({leg.duration.hours}h {leg.duration.minutes}m)
          </div>
        </div>
        {legAlerts}
      </div>
    );
  }
  if (legType === "STATION_CHANGE_PUBLIC_TRANSPORT") {
    return (
      <div key={leg.id} className="flex gap-4 text-zinc-500 items-center">
        <Bus className="" size={16} />
        <div>
          <div className="dark:text-zinc-200 text-zinc-600 font-medium flex gap-2 items-center">
            Station change by public transport ({leg.duration.hours}h{" "}
            {leg.duration.minutes}m)
          </div>
        </div>
        {legAlerts}
      </div>
    );
  }

  const price = leg.prices?.find(
    (price) => price.type === "SECOND_CLASS"
  )?.amount;
  const status =
    leg.status && leg.status in statusTexts
      ? statusTexts[leg.status as keyof typeof statusTexts]
      : leg.status;

  return (
    <div key={leg.id} className="flex gap-4 text-zinc-500 items-center">
      <Train className="" size={16} />
      <div>
        <div className="dark:text-zinc-200 text-zinc-600 font-medium flex gap-2 items-center">
          {leg.start.station} <ArrowRight size={14} /> {leg.end.station}
        </div>

        <div className="flex gap-1 items-center text-zinc-400">
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

              <div
                className={lookup(price, {
                  0: "text-green-500",
                  20: "text-amber-500",
                  40: "text-red-500",
                })}
              >
                {price}€
              </div>
            </>
          )}

          <Dot className="" size={16} />

          <div>{status}</div>
        </div>
      </div>
    </div>
  );
}

export default JourneyRideLeg;
