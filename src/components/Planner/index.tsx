"use client";
import React, { useEffect } from "react";
import PlannerMap from "./PlannerMap";
import Heading from "../Various/Heading";
import JourneySteps from "./Steps/JourneySteps";
import { Journey } from "@/lib/types";
import Planner from "@/lib/Journey/Planner";
import AddLocationModal from "./Modals/AddLocationModal";
import JourneyLoading from "./JourneyLoading";
import StatusBar from "./StatusBar";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import AiPopup from "./Ai";
import WelcomePopup from "./WelcomePopup";
import usePlannerStore from "./plannerStore";
import LoadingScreen from "../Various/LoadingScreen";
import MenuBar from "./MenuBar";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { CalendarRange, Loader2 } from "lucide-react";
import CalendarView from "./Modals/CalendarView";
import MobileMapModal from "./Modals/MobileMapModal";
import MobileStatusModal from "./Modals/MobileStatusModal";
import TodoList from "./Modals/TodoList";
import ReoderStaysModal from "./Modals/ReorderStaysModal";
import TourProvider from "./TourProvider";
import ContextSection from "./ContextSection";
import useContextSectionStore from "./ContextSection/contextState";
import { cn } from "@/lib/utils";
import GeneralSettingsOpener from "./GeneralSettings/GeneralSettingsOpener";
import PassEditorOpener from "./Pass/PassEditorOpener";
import ContextSidebar from "./ContextSidebar";

function PlannerComponent({ journey }: { journey: Journey }) {
  const plannerStore = usePlannerStore();
  const planner = plannerStore.planner;
  useEffect(() => {
    plannerStore.setPlanner(new Planner(journey));
  }, [journey]);

  const [hasShownWelcomePopup, setHasShownWelcomePopup] = React.useState(false);
  const [, forceUpdate] = React.useState({});
  const isReadOnly = useIsReadOnly();

  const context = useContextSectionStore((store) => store.context);
  const setContext = useContextSectionStore((store) => store.setContext);

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
    <TourProvider>
      <div className="bg-zinc-100">
        {planner.isLoading && <JourneyLoading />}
        <WelcomePopup />
        <AiPopup />

        <div className="flex w-screen h-screen">
          <div id="planner-context-selectors">
            <ContextSidebar />
          </div>

          <div
            suppressHydrationWarning
            id="planner-left-side"
            className="flex-1"
          >
            <ContextSection />
          </div>
        </div>
      </div>
    </TourProvider>
  );
}

export default PlannerComponent;
