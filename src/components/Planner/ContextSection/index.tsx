import React from "react";
import useContextSectionStore from "./contextState";
import ContextSectionStay from "../Stay/ContextSectionStay";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import GeneralJourneySettings from "../GeneralSettings/GeneralJourneySettings";
import PassEditor from "../Pass/PassEditor";

function ContextSection() {
  const context = useContextSectionStore((state) => state.context);
  const setContext = useContextSectionStore((state) => state.setContext);

  if (!context) return null;

  let title = "";
  if (context.type === "stay") title = "Stay";
  if (context.type === "generalSettings") title = "General Settings";
  if (context.type === "passEditor") title = "My Interrail Pass";

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">{title}</h2>

        <Button variant="secondary" onClick={() => setContext(null)}>
          <X size={24} />
        </Button>
      </div>
      {context.type === "stay" && (
        <ContextSectionStay stayId={context.stayId} />
      )}
      {context.type === "generalSettings" && <GeneralJourneySettings />}
      {context.type === "passEditor" && <PassEditor />}
    </div>
  );
}

export default ContextSection;
