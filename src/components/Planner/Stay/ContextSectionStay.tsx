import React, { useEffect } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { getTimerangeLengthToDaysInMs } from "@/lib/utils/date";
import { Calendar, MapPin, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { JourneyStay } from "@/lib/types";
import { Input } from "../../ui/input";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HostelInformation from "./HostelInformation";
import WeatherInformation from "./WeatherInformation";
import PassInvalidInfos from "./PassInvalidInfos";
import LanguageAssistance from "./LanguageAssistance";
import CurrencyInformation from "./CurrencyInformation";
import StayNotes from "./StayNotest";
import usePlannerStore from "../plannerStore";

function ContextSectionStay({ stayId }: { stayId: string }) {
  const planner = usePlannerStore((state) => state.planner);
  const stay = planner.journey.steps.find(
    (step) => step.id === stayId
  ) as JourneyStay;

  const days =
    getTimerangeLengthToDaysInMs(stay.timerange) / 1000 / 60 / 60 / 24;
  const [changedDays, setChangedDays] = React.useState(days);
  useEffect(() => {
    setChangedDays(days);
  }, [days]);

  const isStartEndDateEqual =
    stay.timerange.start.toLocaleDateString() ===
    stay.timerange.end.toLocaleDateString();

  const isReadOnly = useIsReadOnly();

  return (
    <div className="relative">
      <div className="absolute inset-0 w-full h-full z-0 opacity-20 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter" />

      <Card className="relative z-10 p-1">
        <div className="flex items-center text-zinc-600 w-full">
          <CardHeader className="w-full">
            <div className="flex lg:justify-between gap-2 xl:items-center ">
              <CardTitle className="dark:text-zinc-200 text-zinc-700 flex items-center font-bold text-lg">
                <MapPin className="mr-2 " size={16} />
                {stay.locationName ?? stay.location.name}
              </CardTitle>

              <div className="flex gap-2 ml-auto">
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      onClick={() => planner.removeStep(stay)}
                      variant="secondary"
                      size="sm"
                      disabled={isReadOnly}
                    >
                      <Trash className="" size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Remove</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <CardDescription className="flex xl:flex-row justify-between dark:text-zinc-300 text-zinc-600 items-center gap-2 pt-1">
              <span className="flex items-center gap-2">
                <Input
                  className="w-14 h-8"
                  type="number"
                  value={changedDays}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (isNaN(value)) return;
                    setChangedDays(value);
                  }}
                  disabled={isReadOnly}
                />{" "}
                {changedDays !== 1 ? "days" : "day"}
              </span>

              <span
                className="font-medium text-zinc-400 text-right"
                suppressHydrationWarning
              >
                {isStartEndDateEqual
                  ? stay.timerange.start.toLocaleDateString()
                  : stay.timerange.start.toLocaleDateString() +
                    " - " +
                    stay.timerange.end.toLocaleDateString()}
              </span>
            </CardDescription>

            {changedDays !== days && (
              <Button
                onClick={() => {
                  planner.changeStayDuration(stay, changedDays);
                }}
                variant="secondary"
                size="sm"
                disabled={isReadOnly}
              >
                <Calendar className="inline-block mr-2" size={14} />
                Update
              </Button>
            )}

            <PassInvalidInfos stay={stay} />
            <HostelInformation stay={stay} />
            <WeatherInformation stay={stay} />
            <LanguageAssistance stay={stay} />
            <CurrencyInformation stay={stay} />
            <StayNotes stay={stay} />
          </CardHeader>
        </div>
      </Card>
    </div>
  );
}

export default ContextSectionStay;
