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
import StatusBar from "./StatusBar";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import AiPopup from "./Ai";
import WelcomePopup from "./WelcomePopup";
import usePlannerStore from "./plannerStore";
import LoadingScreen from "../Various/LoadingScreen";
import MenuBar from "./MenuBar";

function PlannerComponent({ journey }: { journey: Journey }) {
  const plannerStore = usePlannerStore();
  const planner = plannerStore.planner;
  useEffect(() => {
    plannerStore.setPlanner(new Planner(journey));
  }, [journey]);

  const [, forceUpdate] = React.useState({});
  const isReadOnly = useIsReadOnly();

  useEffect(() => {
    if (!planner) return;
    if (planner.journey.steps.length === 0) {
      plannerStore.setPopupState("welcome", true);
    }

    const update = () => forceUpdate({});
    planner.on("change", update);
    return () => {
      planner.off("change", update);
    };
  }, [planner]);

  if (!planner) return <LoadingScreen text="Loading planner..." />;

  return (
    <>
      {planner.isLoading && <JourneyLoading />}
      <WelcomePopup />
      <AiPopup />

      <MenuBar />

      <div
        className="grid lg:grid-cols-2 xl:grid-cols-3 w-screen"
        style={{
          height: "calc(100vh - 4rem)",
        }}
      >
        <div className="xl:col-span-2 relative">
          <PlannerMap />
          <StatusBar />
        </div>
        <div
          className="p-12 bg-black h-full lg:overflow-y-auto"
          suppressHydrationWarning
        >
          <GeneralJourneySettings />

          <Heading className="mt-6">Itinerary</Heading>
          <JourneySteps />

          {planner.journey.steps.length === 0 && (
            <div className="mt-6 text-center">
              <h3 className="font-medium text-zinc-400">No stops yet</h3>
              <p className="text-zinc-500 font-medium text-sm">
                Add your first stop by clicking the button below or choosing a
                city on the map.
              </p>
            </div>
          )}

          {!isReadOnly && <AddLocationModal />}
        </div>
      </div>
    </>
  );
}

export default PlannerComponent;
