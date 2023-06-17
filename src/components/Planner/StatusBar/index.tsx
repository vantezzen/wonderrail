import Planner from "@/lib/Journey/Planner";
import React from "react";
import StatusBarElement from "./StatusBarElement";
import StatusBarDivider from "./StatusBarDivider";
import AutoCount from "@/components/Various/AutoCount";
import PriceDetailsPopover from "./PriceDetailsPopover";
import { humanReadableDurationFromMinutes } from "@/lib/utils/date";
import { padLeft } from "@/lib/utils/number";

function StatusBar({ planner }: { planner: Planner }) {
  const stats = planner.stats.get();
  const totalDurationOnTrains = humanReadableDurationFromMinutes(
    stats.totalTimeOnTrains
  );

  return (
    <div className="w-full py-6 px-12 bg-black lg:absolute bottom-0 left-0 flex flex-col lg:flex-row lg:gap-12">
      <StatusBarElement title="Date">
        {stats.timerange.start?.toLocaleDateString()} -{" "}
        {stats.timerange.end?.toLocaleDateString()}
      </StatusBarElement>

      <StatusBarDivider />

      <PriceDetailsPopover planner={planner} />

      <StatusBarDivider />

      <StatusBarElement title="Distance">
        <AutoCount value={Math.round(stats.distance)} />
        km
      </StatusBarElement>

      <StatusBarDivider />

      <StatusBarElement title="Reservations">
        <AutoCount value={stats.totalReservationAmount} />
      </StatusBarElement>

      <StatusBarDivider />

      <StatusBarElement title="Time on trains">
        <AutoCount value={totalDurationOnTrains.hours} />:
        {padLeft(totalDurationOnTrains.minutes, 2)}h
      </StatusBarElement>
    </div>
  );
}

export default StatusBar;
