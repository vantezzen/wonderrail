import { JourneyRide, JourneyStay } from "@/lib/types";
import { Footprints } from "lucide-react";
import React, { useEffect, useState } from "react";
import JourneyRideBadge from "./JourneyRideBadge";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import usePlannerStore from "../plannerStore";
import { getDistanceFromLatLonInKm } from "@/lib/utils/coordinates";

function JourneyRideStationDistanceCheck({ ride }: { ride: JourneyRide }) {
  const [departureStationDistance, setDepartureStationDistance] = useState(0);
  const [destinationStationDistance, setDestinationStationDistance] =
    useState(0);

  const planner = usePlannerStore((store) => store.planner);

  useEffect(() => {
    const rideIndex = planner.journey.steps.findIndex(
      (step) => step.id === ride.id
    );
    const departureStay = planner.journey.steps[rideIndex - 1] as JourneyStay;
    const destinationStay = planner.journey.steps[rideIndex + 1] as JourneyStay;

    setDepartureStationDistance(
      getDistanceFromLatLonInKm(
        departureStay?.cityCenterCoordinates,
        ride.start
      )
    );
    setDestinationStationDistance(
      getDistanceFromLatLonInKm(
        destinationStay?.cityCenterCoordinates,
        ride.end
      )
    );
  }, [ride]);

  return (
    <>
      {departureStationDistance > 5 && (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge icon={<Footprints className="" size={16} />} />
          </TooltipTrigger>

          <TooltipContent>
            The departure station is {departureStationDistance}km away from the
            city center.
          </TooltipContent>
        </Tooltip>
      )}
      {destinationStationDistance > 5 && (
        <Tooltip>
          <TooltipTrigger>
            <JourneyRideBadge icon={<Footprints className="" size={16} />} />
          </TooltipTrigger>

          <TooltipContent>
            The destination station is {destinationStationDistance}km away from
            the city center.
          </TooltipContent>
        </Tooltip>
      )}
    </>
  );
}

export default JourneyRideStationDistanceCheck;
