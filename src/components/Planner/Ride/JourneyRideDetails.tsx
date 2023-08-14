

import { Button } from "@/components/ui/button";
import { JourneyRide } from "@/lib/types";
import { ExternalLink } from "lucide-react";
import React from "react";
import JourneyRideLeg from "./JourneyRideLeg";


import usePlannerStore from "../plannerStore";
import { trackEvent } from "@/lib/analytics";
import LayoverChecker from "@/lib/Journey/LayoverChecker";

function JourneyRideDetails({ rideId }: { rideId: string }) {
  const planner = usePlannerStore((state) => state.planner);
  const ride = planner.journey.steps.find(
    (step) => step.id === rideId
  ) as JourneyRide;

  const [layoverChecker] = React.useState(() => new LayoverChecker());
  const alerts = layoverChecker.checkRide(ride);
  let currentTime = new Date(ride.timerange.start);

  return (
    <div>
      {ride.details?.legs.map((leg) => (
        <div className="py-2" key={leg.id}>
          <hr className="pb-4" />
          <JourneyRideLeg leg={leg} alerts={alerts} currentTime={currentTime} />
        </div>
      ))}
      <Button className="mt-4 flex items-center gap-2" asChild>
        <a
          href={planner.interrail.getBookingUrl(ride)}
          target="_blank"
          rel="noreferrer"
          onClick={() => {
            trackEvent("journey_details_book_ride_click");
          }}
        >
          <ExternalLink size={16} />
          Book this ride
        </a>
      </Button>
    </div>
  );
}

export default JourneyRideDetails;
