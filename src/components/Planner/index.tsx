"use client";
import React, { useEffect } from "react";
import PlannerMap from "./PlannerMap";
import Heading from "../Various/Heading";
import JourneySteps from "./JourneySteps";
import { EXAMPLE_JOURNEY } from "@/lib/types";
import Planner from "@/lib/Journey/Planner";
import AddLocationModal from "./AddLocationModal";
import JourneyLoading from "./JourneyLoading";

function PlannerComponent() {
  const [planner] = React.useState(() => new Planner(EXAMPLE_JOURNEY));
  const [, forceUpdate] = React.useState({});
  useEffect(() => {
    const update = () => forceUpdate({});
    planner.on("change", update);
    return () => {
      planner.off("change", update);
    };
  }, [planner]);

  return (
    <>
      {planner.isLoading && <JourneyLoading />}

      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <PlannerMap planner={planner} />
        </div>
        <div className="p-6 overflow-y-auto h-screen" suppressHydrationWarning>
          <Heading>Your trip</Heading>
          <JourneySteps planner={planner} />
          <AddLocationModal planner={planner} />
        </div>
      </div>
    </>
  );
}

export default PlannerComponent;
