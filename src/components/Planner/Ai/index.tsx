import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { AiRequest } from "@/lib/types";
import React from "react";
import AiInput from "./AiInput";
import Planner from "@/lib/Journey/Planner";
import AiLoading from "./AiLoading";
import AiOutput from "./AiOutput";
import AiApplying from "./AiApplying";
import usePlannerStore from "../plannerStore";

enum AiState {
  INPUT,
  LOADING,
  OUTPUT,
  APPLYING,
}

function AiPopup() {
  const open = usePlannerStore((state) => state.popups.ai);
  const updatePopupState = usePlannerStore((state) => state.setPopupState);
  const setOpen = (open: boolean) => updatePopupState("ai", open);
  const planner = usePlannerStore((state) => state.planner);

  const [aiState, setAiState] = React.useState(AiState.INPUT);
  const [input, setInput] = React.useState<AiRequest>({
    startDate: new Date(),
    endDate: new Date(),
    startCity: "",
    travelDays: 7,
    preferences: "",
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        {aiState === AiState.INPUT && (
          <AiInput
            input={input}
            setInput={setInput}
            onConfirm={async () => {
              setAiState(AiState.LOADING);
              console.log("Generating itinerary...");

              planner.journey.startDate = input.startDate;
              planner.emit("change");

              await planner.ai.generateItinerary(input);
              setAiState(AiState.OUTPUT);
            }}
          />
        )}
        {aiState === AiState.LOADING && <AiLoading />}
        {aiState === AiState.OUTPUT && (
          <AiOutput
            planner={planner}
            onApply={async () => {
              setAiState(AiState.APPLYING);
              await planner.ai.acceptItinerary();
              setOpen(false);
            }}
          />
        )}
        {aiState === AiState.APPLYING && <AiApplying />}
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AiPopup;
