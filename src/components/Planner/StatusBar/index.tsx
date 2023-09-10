import React from "react";
import StatusBarElement from "./StatusBarElement";
import StatusBarDivider from "./StatusBarDivider";
import AutoCount from "@/components/Various/AutoCount";
import PriceDetailsPopover from "./PriceDetailsPopover";
import { humanReadableDurationFromMinutes } from "@/lib/utils/date";
import { padLeft } from "@/lib/utils/number";
import usePlannerStore from "../plannerStore";
import { AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function StatusBar() {
  const planner = usePlannerStore((state) => state.planner);
  const stats = planner.stats.get();
  const totalDurationOnTrains = humanReadableDurationFromMinutes(
    stats.totalTimeOnTrains
  );

  const showStatusBar = usePlannerStore((state) => state.view.showStatusBar);
  if (!showStatusBar) return null;

  return (
    <div
      className="
        w-[calc(100%-4rem)] h-16 
        bg-zinc-100 rounded-lg p-3 shadow-lg
        relative bottom-12 left-[2rem] right-[2rem]
        flex gap-3 items-center justify-between
        px-6
      "
      id="planner-status-bar"
    >
      <PriceDetailsPopover planner={planner} />

      <StatusBarDivider />

      <StatusBarElement title="Travel days">
        <div className="flex items-center">
          <AutoCount value={stats.travelDays} />
          {planner.journey.pass.travelDays &&
            stats.travelDays > planner.journey.pass.travelDays && (
              <Tooltip>
                <TooltipTrigger>
                  <AlertTriangle className="text-red-500 ml-2" size={16} />
                </TooltipTrigger>

                <TooltipContent>
                  You have exceeded the number of travel days for your pass.
                </TooltipContent>
              </Tooltip>
            )}
        </div>
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

      <StatusBarDivider />

      <StatusBarElement title="Time on trains">
        <AutoCount value={totalDurationOnTrains.hours} />:
        {padLeft(totalDurationOnTrains.minutes, 2)}h
      </StatusBarElement>
    </div>
  );
}

export default StatusBar;
