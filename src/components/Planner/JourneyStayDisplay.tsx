import React from "react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { daysBetween } from "@/lib/utils/date";
import Planner from "@/lib/Journey/Planner";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import {
  Calendar,
  ChevronsUpDown,
  Dot,
  GripVertical,
  Hotel,
  MapPin,
  Trash,
} from "lucide-react";
import { Button } from "../ui/button";
import { JourneyStay } from "@/lib/types";
import { Input } from "../ui/input";

function JourneyStayDisplay({
  stay,
  planner,
  dragHandleProps,
}: {
  stay: JourneyStay;
  planner: Planner;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}) {
  const days = daysBetween(stay.timerange.start, stay.timerange.end);
  const [changedDays, setChangedDays] = React.useState(days);

  const isStartEndDateEqual =
    stay.timerange.start.toLocaleDateString() ===
    stay.timerange.end.toLocaleDateString();

  return (
    <Card>
      <div className="flex">
        <div className="flex flex-col items-center justify-center pl-6">
          <div {...dragHandleProps}>
            <GripVertical className="cursor-grab" size={16} />
          </div>
        </div>

        <div className="flex items-center text-slate-600 w-full">
          <CardHeader className="w-full">
            <div className="flex justify-between items-center">
              <CardTitle className="text-slate-200 flex items-center">
                <MapPin className="mr-2 text-slate-400" size={16} />
                {stay.location.name}
              </CardTitle>

              <Button
                onClick={() => planner.removeStep(stay)}
                variant="secondary"
                size="sm"
              >
                <Trash className="" size={16} />
              </Button>
            </div>

            <CardDescription className="flex flex-col xl:flex-row justify-between text-slate-400 xl:items-center gap-2 pt-1">
              <span className="flex items-center gap-2">
                stay here for
                <Input
                  className="w-14 h-8"
                  type="number"
                  value={changedDays}
                  onChange={(e) => {
                    const value = parseInt(e.target.value);
                    if (isNaN(value)) return;
                    setChangedDays(value);
                  }}
                />{" "}
                {changedDays !== 1 ? "days" : "day"}
              </span>

              <span
                className="font-medium text-zinc-600"
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
              >
                <Calendar className="inline-block mr-2" size={14} />
                Update
              </Button>
            )}
          </CardHeader>
          <div className="mr-2 flex flex-col gap-2 mt-2"></div>
        </div>
      </div>
    </Card>
  );
}

export default JourneyStayDisplay;
