import React from "react";
import useContextSectionStore from "./contextState";
import ContextSectionStay from "../Contexts/ContextSectionStay";
import GeneralJourneySettings from "../Contexts/GeneralSettings/GeneralJourneySettings";
import PassEditor from "../Contexts/Pass/PassEditor";
import JourneyRideDetails from "../Contexts/JourneyRideDetails";
import MenuBar from "../MenuBar";
import Itiniary from "../Contexts/Itiniary/Itiniary";
import CalendarView from "../Contexts/CalendarView";
import TodoList from "../Contexts/TodoList";

function ContextSection() {
  const context = useContextSectionStore((state) => state.context);
  if (!context) return null;
  return (
    <div className="w-full">
      <MenuBar />

      {context.type === "itinerary" && <Itiniary />}
      {context.type === "stay" && (
        <ContextSectionStay stayId={context.stayId} />
      )}
      {context.type === "generalSettings" && <GeneralJourneySettings />}
      {context.type === "passEditor" && <PassEditor />}
      {context.type === "rideDetails" && (
        <JourneyRideDetails rideId={context.rideId} />
      )}
      {context.type === "calendar" && <CalendarView />}
      {context.type === "todo" && <TodoList />}
    </div>
  );
}

export default ContextSection;
