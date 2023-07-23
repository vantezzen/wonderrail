import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import Planner from "@/lib/Journey/Planner";
import { JourneyStay } from "@/lib/types";
import { GripVertical } from "lucide-react";
import React from "react";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";

function ReorderableJourneyStep({
  step,
  planner,
  dragHandleProps,
}: {
  step: JourneyStay;
  planner: Planner;
  dragHandleProps: DraggableProvidedDragHandleProps;
}) {
  return (
    <Card>
      <div className="flex gap-3">
        <div className="flex flex-col items-center justify-center pl-6">
          <div {...dragHandleProps}>
            <GripVertical className="cursor-grab" size={16} />
          </div>
        </div>

        <CardHeader className="p-3 px-5">
          <CardTitle className="text-lg">
            {step.locationName ?? step.location.name}
          </CardTitle>
        </CardHeader>
      </div>
    </Card>
  );
}

export default ReorderableJourneyStep;
