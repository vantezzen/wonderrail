import { JourneyStay } from "@/lib/types";
import React from "react";
import usePlannerStore from "../plannerStore";
import {
  getValidUntilDate,
  isLocationCoveredInPass,
} from "@/lib/utils/pass";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarOff, MapPin } from "lucide-react";

function PassInvalidInfos({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);
  const locationIsCoveredByPass = isLocationCoveredInPass(
    stay,
    planner.journey.pass,
    planner.journey.steps
  );
  const validUntil = getValidUntilDate(
    planner.journey.startDate,
    planner.journey.pass
  );
  const locationStartsOutsidePassValidity = validUntil < stay.timerange.start;

  const isLastLocation =
    planner.journey.steps[planner.journey.steps.length - 1] === stay;
  const locationEndsOutsidePassValidity =
    !isLastLocation &&
    !locationStartsOutsidePassValidity &&
    validUntil < stay.timerange.end;

  return (
    <div className="grid gap-3">
      {!locationIsCoveredByPass && (
        <Alert variant="destructive">
          <MapPin size={16} />
          <AlertTitle className="font-bold text-sm">
            This location is not covered by your Interrail Pass
          </AlertTitle>
          <AlertDescription className="text-xs">
            Your Interrail Pass is not valid in this country. You can still add
            this location to your trip, but you will have to pay for the train
            ticket separately.
          </AlertDescription>
        </Alert>
      )}
      {locationStartsOutsidePassValidity && (
        <Alert variant="destructive">
          <CalendarOff size={16} />
          <AlertTitle className="font-bold text-sm">
            Your arrival date is outside the validity of your Interrail Pass
          </AlertTitle>
          <AlertDescription className="text-xs">
            Your Interrail Pass is valid until {validUntil.toLocaleDateString()}
            . You can still add this location to your trip, but you will have to
            pay for the train ticket separately.
          </AlertDescription>
        </Alert>
      )}
      {locationEndsOutsidePassValidity && (
        <Alert variant="destructive">
          <CalendarOff size={16} />
          <AlertTitle className="font-bold text-sm">
            Your departure date is outside the validity of your Interrail Pass
          </AlertTitle>
          <AlertDescription className="text-xs">
            Your Interrail Pass is valid until {validUntil.toLocaleDateString()}
            . You can still add this location to your trip, but you will have to
            pay for the train ticket separately.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default PassInvalidInfos;
