"use client";
import React, { useEffect } from "react";
import PlannerMap from "./PlannerMap";
import Heading from "../Various/Heading";
import JourneySteps from "./Steps/JourneySteps";
import { Journey } from "@/lib/types";
import Planner from "@/lib/Journey/Planner";
import AddLocationModal from "./Modals/AddLocationModal";
import JourneyLoading from "./JourneyLoading";
import GeneralJourneySettings from "./GeneralJourneySettings";
import StatusBar from "./StatusBar";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import AiPopup from "./Ai";
import WelcomePopup from "./WelcomePopup";
import usePlannerStore from "./plannerStore";
import LoadingScreen from "../Various/LoadingScreen";
import MenuBar from "./MenuBar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { Loader2 } from "lucide-react";
import CalendarView from "./Modals/CalendarView";
import MobileMapModal from "./Modals/MobileMapModal";
import MobileStatusModal from "./Modals/MobileStatusModal";
import PassEditor from "./Pass/PassEditor";
import TodoList from "./Modals/TodoList";
import ReoderStaysModal from "./Modals/ReorderStaysModal";

function PlannerComponent({ journey }: { journey: Journey }) {
  const plannerStore = usePlannerStore();
  const planner = plannerStore.planner;
  useEffect(() => {
    plannerStore.setPlanner(new Planner(journey));
  }, [journey]);

  const [hasShownWelcomePopup, setHasShownWelcomePopup] = React.useState(false);
  const [, forceUpdate] = React.useState({});
  const isReadOnly = useIsReadOnly();

  useEffect(() => {
    if (!planner) return;
    if (
      planner.journey.steps.length === 0 &&
      !isReadOnly &&
      !hasShownWelcomePopup
    ) {
      plannerStore.setPopupState("welcome", true);
      setHasShownWelcomePopup(true);
    }

    const update = () => forceUpdate({});
    planner.on("change", update);
    return () => {
      planner.off("change", update);
    };
  }, [planner]);

  if (!planner) return <LoadingScreen text="Loading planner..." />;

  console.log(planner.journey);

  return (
    <div className="dark:bg-zinc-900 bg-zinc-100">
      {planner.isLoading && <JourneyLoading />}
      <WelcomePopup />
      <AiPopup />

      <CalendarView />
      <MobileMapModal />
      <MobileStatusModal />
      <TodoList />
      <ReoderStaysModal />

      <MenuBar />

      <div
        className="grid lg:grid-cols-2 xl:grid-cols-3 w-screen"
        style={{
          height: "calc(100vh - 4rem)",
        }}
      >
        <div className="xl:col-span-2 relative hidden md:block">
          <PlannerMap />
          <StatusBar />
        </div>
        <div
          className="p-6 pt-0 dark:bg-zinc-900 bg-zinc-100 h-full lg:overflow-y-auto"
          suppressHydrationWarning
        >
          <GeneralJourneySettings />
          <PassEditor />

          <Heading className="mt-6">Itinerary</Heading>
          <JourneySteps />

          {planner.isLoading && (
            <Alert className="mt-3">
              <Loader2 className="mr-2 animate-spin" size={16} />
              <AlertTitle>Your journey being planned</AlertTitle>
              <AlertDescription>
                We are currently planning your journey in the background. During
                this, information shown might be inaccurate. You can still
                continue editing your journey.
              </AlertDescription>
            </Alert>
          )}

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
    </div>
  );
}

export default PlannerComponent;
