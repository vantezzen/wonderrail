import { JourneyLocation as JourneyLocationType } from "@/lib/types";
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
import { MoreVertical, Trash } from "lucide-react";
import { Button } from "../ui/button";

function JourneyLocation({
  step,
  planner,
  dragHandleProps,
}: {
  step: JourneyLocationType;
  planner: Planner;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}) {
  const days = daysBetween(step.timerange.start, step.timerange.end);
  return (
    <Card>
      <div className="flex items-center text-slate-600 pr-6">
        <CardHeader className="w-full">
          <CardTitle className="text-slate-400">{step.name}</CardTitle>
          <CardDescription className="flex justify-between text-slate-600">
            <span>
              {days} {days > 1 ? "days" : "day"}
            </span>
            <span className="">
              {step.timerange.start.toLocaleDateString()} -{" "}
              {step.timerange.end.toLocaleDateString()}
            </span>
          </CardDescription>
        </CardHeader>
        <div {...dragHandleProps}>
          <MoreVertical className="" size={16} />
        </div>
      </div>

      <CardFooter>
        <Button onClick={() => planner.removeStep(step)} variant="ghost">
          <Trash className="" size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
}

export default JourneyLocation;
