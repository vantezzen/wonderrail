"use client";
import React, { useEffect } from "react";
import PlannerMap from "./PlannerMap";
import Heading from "../Various/Heading";
import JourneySteps from "./JourneySteps";
import { Journey } from "@/lib/types";
import Planner from "@/lib/Journey/Planner";
import AddLocationModal from "./AddLocationModal";
import JourneyLoading from "./JourneyLoading";
import GeneralJourneySettings from "./GeneralJourneySettings";
import SaveAction from "./SaveAction";
import LogoBar from "./LogoBar";
import StatusBar from "./StatusBar";

function PlannerComponent({ journey }: { journey: Journey }) {
  const [planner] = React.useState(() => new Planner(journey));
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

      <div className="grid lg:grid-cols-3 w-screen">
        <div className="lg:col-span-2 relative">
          <PlannerMap planner={planner} />
          <StatusBar planner={planner} />
        </div>
        <div
          className="p-12 lg:overflow-y-auto h-screen bg-black"
          suppressHydrationWarning
        >
          <LogoBar />
          <SaveAction planner={planner} />
          <GeneralJourneySettings planner={planner} />

          <Heading className="mt-6">Itinerary</Heading>
          <JourneySteps planner={planner} />

          {planner.journey.steps.length === 0 && (
            <div className="mt-6 text-center">
              <h3 className="font-medium text-zinc-400">No stops yet</h3>
              <p className="text-zinc-500 font-medium text-sm">
                Add your first stop by clicking the button below or choosing a
                city on the map.
              </p>
            </div>
          )}

          <AddLocationModal planner={planner} />
        </div>
      </div>
    </>
  );
}

export default PlannerComponent;
