import Planner from "@/lib/Journey/Planner";
import React from "react";
import StatusBarElement from "./StatusBarElement";
import StatusBarDivider from "./StatusBarDivider";
import AutoCount from "@/components/Various/AutoCount";

function StatusBar({ planner }: { planner: Planner }) {
  const stats = planner.getJourneyStats();

  return (
    <div className="w-full py-6 px-12 bg-black lg:absolute bottom-0 left-0 flex flex-col lg:flex-row lg:gap-12">
      <StatusBarElement title="Date">
        {stats.timerange.start?.toLocaleDateString()} -{" "}
        {stats.timerange.end?.toLocaleDateString()}
      </StatusBarElement>

      <StatusBarDivider />

      <StatusBarElement title="Price">
        <AutoCount value={stats.cost.totalReservationPrice} />€
      </StatusBarElement>

      <StatusBarDivider />

      <StatusBarElement title="Distance">
        <AutoCount value={Math.round(stats.distance)} />
        km
      </StatusBarElement>

      <StatusBarDivider />

      <StatusBarElement title="Reservations">
        <AutoCount value={stats.totalReservationAmount} />
      </StatusBarElement>
    </div>
  );
}

export default StatusBar;
