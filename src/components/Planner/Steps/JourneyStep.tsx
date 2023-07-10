import Planner from "@/lib/Journey/Planner";
import { JourneyStep } from "@/lib/types";
import React from "react";
import JourneyRide from "../Ride/JourneyRide";
import JourneyStayDisplay from "../Stay/JourneyStayDisplay";
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import InvalidJourneyStep from "../InvalidJourneyStep";
import usePlannerStore from "../plannerStore";
import StepProgressIndicator from "./StepProgressIndicator";

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

  let item = null;

  if (step.type === "ride") {
    if (isDragging) return null;
    item = (
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
    item = (
      <JourneyStayDisplay
        key={step.id}
        stay={step}
        planner={planner}
        dragHandleProps={dragHandleProps}
      />
    );
  } else if (step.type === "invalid") {
    if (isDragging) return null;
    item = <InvalidJourneyStep />;
  }

  if (isDragging) return item;

  return (
    <div className="relative">
      <StepProgressIndicator step={step} />

      <div className="ml-6">{item}</div>
    </div>
  );
}

export default JourneyStep;
