import React from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import { ChevronLeft, Trash } from "lucide-react";
import { Button } from "../../ui/button";
import { JourneyStay } from "@/lib/types";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import HostelInformation from "../Stay/HostelInformation";
import WeatherInformation from "../Stay/WeatherInformation";
import PassInvalidInfos from "../Stay/PassInvalidInfos";
import LanguageAssistance from "../Stay/LanguageAssistance";
import CurrencyInformation from "../Stay/CurrencyInformation";
import StayNotes from "../Stay/StayNotest";
import usePlannerStore from "../plannerStore";
import useContextSectionStore from "../ContextSection/contextState";
import StayDuration from "../Stay/StayDuration";
import Image from "next/image";

function ContextSectionStay({ stayId }: { stayId: string }) {
  const planner = usePlannerStore((state) => state.planner);
  const stay = planner.journey.steps.find(
    (step) => step.id === stayId
  ) as JourneyStay;

  const isReadOnly = useIsReadOnly();
  const setContext = useContextSectionStore((state) => state.setContext);

  return (
    <div className="p-3">
      <Button onClick={() => setContext({ type: "itinerary" })} size="sm">
        <ChevronLeft className="inline-block mr-2" size={14} />
        Back to itinerary
      </Button>

      <Card className="p-1 mt-3">
        <div className="flex items-center text-zinc-600 w-full">
          <CardHeader className="w-full">
            <div className="flex lg:justify-between gap-2 xl:items-center ">
              <CardTitle className="text-zinc-700 flex items-center font-bold text-lg">
                <Image
                  src={`${
                    process.env.NEXT_PUBLIC_APP_URL
                  }/api/splash/${encodeURIComponent(
                    stay.locationName ?? stay.location.name
                  )}`}
                  width={48}
                  height={48}
                  className="rounded-xl w-12 h-12 object-cover mr-3"
                  alt={stay.locationName ?? stay.location.name}
                />
                {stay.locationName ?? stay.location.name}
              </CardTitle>

              <div className="flex gap-2 ml-auto">
                <Tooltip>
                  <TooltipTrigger>
                    <Button
                      onClick={() => planner.removeStep(stay)}
                      variant="brand"
                      size="sm"
                      disabled={isReadOnly}
                    >
                      <Trash className="" size={16} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Remove</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <StayDuration stay={stay} />
            <PassInvalidInfos stay={stay} />
            <HostelInformation stay={stay} />
            <WeatherInformation stay={stay} />
            <LanguageAssistance stay={stay} />
            <CurrencyInformation stay={stay} />
            <StayNotes stay={stay} />
          </CardHeader>
        </div>
      </Card>
    </div>
  );
}

export default ContextSectionStay;
