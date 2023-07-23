import Planner from "@/lib/Journey/Planner";
import { JourneyStep } from "@/lib/types";
import React from "react";
import JourneyRide from "../Ride/JourneyRide";
import JourneyStayDisplay from "../Stay/JourneyStayDisplay";
import InvalidJourneyStep from "../InvalidJourneyStep";
import usePlannerStore from "../plannerStore";
import StepProgressIndicator from "./StepProgressIndicator";

function JourneyStep({
  step,
  planner,
}: {
  step: JourneyStep;
  planner: Planner;
}) {
  const setAddLocationBefore = usePlannerStore(
    (state) => state.setAddLocationBefore
  );
  const setPopupState = usePlannerStore((state) => state.setPopupState);

  let item = null;

  if (step.type === "ride") {
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
    item = <JourneyStayDisplay key={step.id} stay={step} planner={planner} />;
  } else if (step.type === "invalid") {
    item = <InvalidJourneyStep />;
  }

  return (
    <div className="relative">
      <StepProgressIndicator step={step} />

      <div className="ml-6">{item}</div>
    </div>
  );
}

export default JourneyStep;
