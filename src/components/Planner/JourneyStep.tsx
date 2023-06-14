import Planner from "@/lib/Journey/Planner";
import { JourneyStep } from "@/lib/types";
import React, { forwardRef } from "react";
import JourneyRide from "./JourneyRide";
import JourneyLocation from "./JourneyLocation";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import InvalidJourneyStep from "./InvalidJourneyStep";

function JourneyStep({
  step,
  planner,
  dragHandleProps,
  isDragging,
}: {
  step: JourneyStep;
  planner: Planner;
  dragHandleProps?: DraggableProvidedDragHandleProps;
  isDragging?: boolean;
}) {
  if (step.type === "ride") {
    if (isDragging) return null;
    return <JourneyRide key={step.id} ride={step} />;
  } else if (step.type === "location") {
    return (
      <JourneyLocation
        key={step.id}
        step={step}
        planner={planner}
        dragHandleProps={dragHandleProps}
      />
    );
  } else if (step.type === "invalid") {
    if (isDragging) return null;
    return <InvalidJourneyStep />;
  }
  return null;
}

export default JourneyStep;
