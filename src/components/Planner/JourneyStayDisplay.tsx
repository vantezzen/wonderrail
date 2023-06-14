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
import { ChevronsUpDown, MoreVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";
import { JourneyStay } from "@/lib/types";

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
  return (
    <Card>
      <div className="flex items-center text-slate-600">
        <CardHeader className="w-full">
          <CardTitle className="text-slate-400">{stay.location.name}</CardTitle>
          <CardDescription className="flex justify-between text-slate-600">
            <span>
              {days} {days > 1 ? "days" : "day"}
            </span>
            <span className="font-medium" suppressHydrationWarning>
              {stay.timerange.start.toLocaleDateString()} -{" "}
              {stay.timerange.end.toLocaleDateString()}
            </span>
          </CardDescription>
        </CardHeader>
        <div className="mr-2">
          <div {...dragHandleProps}>
            <Button variant="ghost" size="sm" className="cursor-grab">
              <ChevronsUpDown className="" size={16} />
            </Button>
          </div>
          <Button
            onClick={() => planner.removeStep(stay)}
            variant="ghost"
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
