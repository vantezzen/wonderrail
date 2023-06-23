import Planner from "@/lib/Journey/Planner";
import { JourneyStay, JourneyStep } from "@/lib/types";
import React from "react";
import JourneyRide from "./Ride/JourneyRide";
import JourneyStayDisplay from "./Stay/JourneyStayDisplay";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import InvalidJourneyStep from "./InvalidJourneyStep";
import usePlannerStore from "./plannerStore";

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
  const setAddLocationBefore = usePlannerStore(
    (state) => state.setAddLocationBefore
  );
  const setPopupState = usePlannerStore((state) => state.setPopupState);

  if (step.type === "ride") {
    if (isDragging) return null;
    return (
      <JourneyRide
        key={step.id}
        ride={step}
        addLocationBeforeThisRide={() => {
          const nextStay = planner.getStayAfterRide(step);
          if (nextStay) {
            setAddLocationBefore(nextStay);
            setPopupState("addLocation", true);
          }
        }}
      />
    );
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
