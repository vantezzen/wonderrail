import React from "react";
import { Card, CardTitle } from "../../ui/card";
import { ChevronRight } from "lucide-react";
import { JourneyStay } from "@/lib/types";

import useContextSectionStore from "../ContextSection/contextState";
import StepProgressIndicator from "../Steps/StepProgressIndicator";
import { Button } from "@/components/ui/button";
import usePlannerStore from "../plannerStore";
import Image from "next/image";

function JourneyStayDisplay({ stay }: { stay: JourneyStay }) {
  const context = useContextSectionStore((state) => state.context);
  const setContext = useContextSectionStore((state) => state.setContext);
  const planner = usePlannerStore((state) => state.planner);

  const isStartEndDateEqual =
    stay.timerange.start.toLocaleDateString() ===
    stay.timerange.end.toLocaleDateString();

  const color = planner.getStepColor(stay);

  return (
    <button
      onClick={() => {
        setContext({
          type: "stay",
          stayId: stay.id,
        });
      }}
      className="w-full bg-brand-50"
    >
      <Card
        className="flex items-center p-4 gap-3 border-none rounded-xl"
        style={{
          background: `linear-gradient(90deg, ${color}00 40%, ${color})`,
        }}
      >
        <Image
          src={`${
            process.env.NEXT_PUBLIC_APP_URL
          }/api/splash/${encodeURIComponent(
            stay.locationName ?? stay.location.name
          )}`}
          width={48}
          height={48}
          className="rounded-xl w-12 h-12 object-cover"
          alt={stay.locationName ?? stay.location.name}
        />

        <div className="flex flex-col text-zinc-600 w-full">
          <CardTitle className="text-zinc-700 font-bold text-lg text-left">
            {stay.locationName ?? stay.location.name}
          </CardTitle>

          {/* Badges */}
        </div>

        <div className="bg-zinc-100 bg-opacity-20 rounded-lg p-2 flex items-center gap-3">
          <span
            className="font-bold text-zinc-700 text-xs text-right whitespace-nowrap"
            suppressHydrationWarning
          >
            {isStartEndDateEqual
              ? stay.timerange.start.toLocaleDateString()
              : stay.timerange.start.toLocaleDateString() +
                " - " +
                stay.timerange.end.toLocaleDateString()}
          </span>

          <Button size="sm">
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="relative">
          <StepProgressIndicator step={stay} />
        </div>
      </Card>
    </button>
  );
}

export default JourneyStayDisplay;
