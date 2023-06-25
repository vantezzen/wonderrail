import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { getTimerangeLengthToDaysInMs } from "@/lib/utils/date";
import Planner from "@/lib/Journey/Planner";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { Calendar, GripVertical, MapPin, Settings2, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { JourneyStay } from "@/lib/types";
import { Input } from "../../ui/input";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

function JourneyStayDisplay({
  stay,
  planner,
  dragHandleProps,
}: {
  stay: JourneyStay;
  planner: Planner;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}) {
  const days =
    getTimerangeLengthToDaysInMs(stay.timerange) / 1000 / 60 / 60 / 24;
  const [changedDays, setChangedDays] = React.useState(days);

  const isStartEndDateEqual =
    stay.timerange.start.toLocaleDateString() ===
    stay.timerange.end.toLocaleDateString();

  const isReadOnly = useIsReadOnly();

  return (
    <div className="relative">
      {/* <div className="absolute inset-0 w-full h-full z-0 opacity-20 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter" /> */}

      <Image
        src={`https://source.unsplash.com/featured/?${stay.location.name}`}
        fill
        className="absolute inset-0 z-0 rounded-lg opacity-30"
        alt={`Photo of ${stay.location.name}`}
        style={{
          objectFit: "cover",
          objectPosition: "center",
        }}
      />

      <Card
        className="relative z-10 bg-transparent"
        style={{
          backdropFilter: "blur(2px)",
          background:
            "linear-gradient(180deg, rgba(33,33,33,0) 0%, rgba(33,33,33,0.9) 100%)",
        }}
      >
        <div className="flex">
          <div className="flex flex-col items-center justify-center pl-6">
            <div {...dragHandleProps}>
              <GripVertical className="cursor-grab" size={16} />
            </div>
          </div>

          <div className="flex items-center text-zinc-600 w-full">
            <CardHeader className="w-full">
              <Collapsible>
                <div className="flex lg:justify-between gap-2 xl:items-center ">
                  <CardTitle className="text-zinc-200 flex items-center font-bold text-lg">
                    <MapPin className="mr-2 text-zinc-400" size={16} />
                    {stay.location.name}
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

                    <Tooltip>
                      <TooltipTrigger>
                        <CollapsibleTrigger asChild>
                          <Button variant="secondary" size="sm">
                            <Settings2 className="" size={16} />
                          </Button>
                        </CollapsibleTrigger>
                      </TooltipTrigger>
                      <TooltipContent>Settings</TooltipContent>
                    </Tooltip>
                  </div>
                </div>

                <CollapsibleContent>
                  <CardDescription className="flex flex-col xl:flex-row justify-between text-zinc-300 xl:items-center gap-2 pt-1">
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
                      className="font-medium text-zinc-400"
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
                </CollapsibleContent>
              </Collapsible>
            </CardHeader>
            <div className="mr-2 flex flex-col gap-2 mt-2"></div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default JourneyStayDisplay;
