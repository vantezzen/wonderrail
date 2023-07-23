import React from "react";
import JourneyStep from "./JourneyStep";
import usePlannerStore from "../plannerStore";

function JourneySteps() {
  const planner = usePlannerStore((state) => state.planner);

  return (
    <div className="mt-6">
      {planner.journey.steps.map((step, index) => (
        <div className="mt-6" key={step.id}>
          <JourneyStep step={step} planner={planner} />
        </div>
      ))}
    </div>
  );
}

export default JourneySteps;
