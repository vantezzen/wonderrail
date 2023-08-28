import React from "react";
import useContextSectionStore from "./contextState";
import ContextSectionStay from "../Stay/ContextSectionStay";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import GeneralJourneySettings from "../GeneralSettings/GeneralJourneySettings";
import PassEditor from "../Pass/PassEditor";
import JourneyRideDetails from "../Ride/JourneyRideDetails";
import MenuBar from "../MenuBar";
import Itiniary from "../Itiniary";

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
    </div>
  );
}

export default ContextSection;
