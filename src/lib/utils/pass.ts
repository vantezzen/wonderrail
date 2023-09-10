import Planner from "../Journey/Planner";
import { InterrailPass, JourneyStay, JourneyStep } from "../types";

export function isLocationCoveredInPass(
  stay: JourneyStay,
  pass: InterrailPass,
  stays: JourneyStep[]
) {
  if (pass.scope === "ONE_COUNTRY") {
    if (pass.country === stay.countryCode) {
      // Country is fully covered
      return true;
    }

    if (pass.originCountry === stay.countryCode) {
      // Origin country only allows entry and exit ride
      const isExitRide = stays.indexOf(stay) === 0;
      const isEntryRide = stays.indexOf(stay) === stays.length - 1;

      return isExitRide || isEntryRide;
    }

    return false;
  }
  return true;
}

export function getValidUntilDate(startDate: Date, pass: InterrailPass) {
  const validUntilDate = new Date(startDate);
  validUntilDate.setDate(validUntilDate.getDate() + (pass.totalValidity ?? 10));
  return validUntilDate;
}

export function startsOutsideTotalValidity(
  stay: JourneyStay,
  pass: InterrailPass,
  startDate: Date
) {
  const validUntilDate = getValidUntilDate(startDate, pass);
  return stay.timerange.start > validUntilDate;
}

export function getPassValidityStatus(stay: JourneyStay, planner: Planner) {
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

  return {
    locationIsCoveredByPass,
    locationStartsOutsidePassValidity,
    locationEndsOutsidePassValidity,
    validUntil,
  };
}
