import Planner from "@/lib/Journey/Planner";
import { JourneyStep } from "@/lib/types";
import React from "react";
import JourneyRide from "./Ride/JourneyRide";
import JourneyStayDisplay from "./Stay/JourneyStayDisplay";
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
  } else if (step.type === "stay") {
    return (
      <JourneyStayDisplay
        key={step.id}
        stay={step}
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
