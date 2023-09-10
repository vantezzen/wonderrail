import { Button } from "@/components/ui/button";
import { JourneyRide } from "@/lib/types";
import { ChevronLeft, ExternalLink } from "lucide-react";
import React from "react";
import JourneyRideLeg from "./JourneyRideLeg";

import usePlannerStore from "../plannerStore";
import { trackEvent } from "@/lib/analytics";
import LayoverChecker from "@/lib/Journey/LayoverChecker";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useContextSectionStore from "../ContextSection/contextState";
import AlternativeRideSelector from "../AlternativeRideSelector";

function JourneyRideDetails({ rideId }: { rideId: string }) {
  const planner = usePlannerStore((state) => state.planner);
  const ride = planner.journey.steps.find(
    (step) => step.id === rideId
  ) as JourneyRide;

  const [layoverChecker] = React.useState(() => new LayoverChecker());
  const alerts = layoverChecker.checkRide(ride);
  let currentTime = new Date(ride.timerange.start);

  const setContext = useContextSectionStore((state) => state.setContext);

  return (
    <div className="p-3">
      <Button onClick={() => setContext({ type: "itinerary" })} size="sm">
        <ChevronLeft className="inline-block mr-2" size={14} />
        Back to itinerary
      </Button>
      <Card className="mt-3">
        <CardHeader>
          <CardTitle className="text-lg font-bold">{ride.name}</CardTitle>
        </CardHeader>

        <CardDescription className="px-3 flex gap-3">
          <Button className="flex items-center gap-2 w-full" asChild>
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
          <AlternativeRideSelector ride={ride} />
        </CardDescription>

        <CardContent>
          {ride.details?.legs.map((leg) => (
            <div className="py-2" key={leg.id}>
              <hr className="pb-4" />
              <JourneyRideLeg
                leg={leg}
                alerts={alerts}
                currentTime={currentTime}
              />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}

export default JourneyRideDetails;
