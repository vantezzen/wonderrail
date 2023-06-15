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
import { Calendar, ChevronsUpDown, MoreVertical, Trash } from "lucide-react";
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

  return (
    <Card>
      <div className="flex items-center text-slate-600">
        <CardHeader className="w-full">
          <CardTitle className="text-slate-400">{stay.location.name}</CardTitle>
          <CardDescription className="flex justify-between text-slate-600">
            <span className="flex items-center gap-2">
              <Input
                className="w-14"
                type="number"
                value={changedDays}
                onChange={(e) => {
                  const value = parseInt(e.target.value);
                  if (isNaN(value)) return;
                  setChangedDays(value);
                }}
              />{" "}
              {changedDays > 1 ? "days" : "day"}
            </span>

            <span className="font-medium" suppressHydrationWarning>
              {stay.timerange.start.toLocaleDateString()} -{" "}
              {stay.timerange.end.toLocaleDateString()}
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
        <div className="mr-2 flex flex-col gap-2 mt-2">
          <div {...dragHandleProps}>
            <Button variant="secondary" size="sm" className="cursor-grab">
              <ChevronsUpDown className="" size={16} />
            </Button>
          </div>
          <Button
            onClick={() => planner.removeStep(stay)}
            variant="secondary"
            size="sm"
          >
            <Trash className="" size={16} />
          </Button>
        </div>
      </div>

      <CardFooter></CardFooter>
    </Card>
  );
}

export default JourneyStayDisplay;
