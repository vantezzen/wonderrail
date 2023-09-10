import { JourneyStay } from "@/lib/types";
import React from "react";
import usePlannerStore from "../plannerStore";
import { getPassValidityStatus } from "@/lib/utils/pass";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangle } from "lucide-react";

function PassInvalidWarning({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);
  const {
    locationIsCoveredByPass,
    locationStartsOutsidePassValidity,
    locationEndsOutsidePassValidity,
  } = getPassValidityStatus(stay, planner);

  const isValid =
    locationIsCoveredByPass &&
    !locationStartsOutsidePassValidity &&
    !locationEndsOutsidePassValidity;

  if (isValid) {
    return null;
  }

  return (
    <Tooltip>
      <TooltipContent className="font-medium">
        This location has warnings about your Interrail Pass validity.
        <br />
        Take a look at the location details for more information.
      </TooltipContent>

      <TooltipTrigger>
        <AlertTriangle size={16} className="text-red-500 ml-3" />
      </TooltipTrigger>
    </Tooltip>
  );
}

export default PassInvalidWarning;
