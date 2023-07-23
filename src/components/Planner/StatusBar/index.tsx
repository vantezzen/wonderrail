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
      className="w-full py-3 px-12 dark:bg-zinc-900 bg-zinc-100 lg:absolute bottom-0 left-0 flex flex-col lg:flex-row gap-3 lg:gap-6 xl:gap-12 overflow-x-hidden"
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
