import React from "react";
import { Card, CardHeader, CardTitle } from "../../ui/card";
import Planner from "@/lib/Journey/Planner";
import { MapPin } from "lucide-react";
import { JourneyStay } from "@/lib/types";



import useContextSectionStore from "../ContextSection/contextState";
import { cn } from "@/lib/utils";

function JourneyStayDisplay({
  stay,
  planner,
}: {
  stay: JourneyStay;
  planner: Planner;
}) {
  const context = useContextSectionStore((state) => state.context);
  const setContext = useContextSectionStore((state) => state.setContext);

  const isStartEndDateEqual =
    stay.timerange.start.toLocaleDateString() ===
    stay.timerange.end.toLocaleDateString();

  const isSelected =
    context && context.type === "stay" && context.stayId === stay.id;

  return (
    <div className="relative">
      <div className="absolute inset-0 w-full h-full z-0 opacity-20 bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] blur-lg filter" />

      <button
        onClick={() => {
          setContext({
            type: "stay",
            stayId: stay.id,
          });
        }}
        className="w-full"
      >
        <Card
          className={cn(
            "relative z-10 p-1",
            isSelected
              ? "border-2 border-zinc-700"
              : "border-2 border-transparent"
          )}
        >
          <div className="flex items-center text-zinc-600 w-full">
            <CardHeader className="w-full">
              <div className="flex lg:justify-between gap-2 xl:items-center ">
                <CardTitle className="dark:text-zinc-200 text-zinc-700 flex items-center font-bold text-lg">
                  <MapPin className="mr-2 " size={16} />
                  {stay.locationName ?? stay.location.name}
                </CardTitle>
              </div>

              <span
                className="font-medium text-zinc-400 text-right"
                suppressHydrationWarning
              >
                {isStartEndDateEqual
                  ? stay.timerange.start.toLocaleDateString()
                  : stay.timerange.start.toLocaleDateString() +
                    " - " +
                    stay.timerange.end.toLocaleDateString()}
              </span>
            </CardHeader>
          </div>
        </Card>
      </button>
    </div>
  );
}

export default JourneyStayDisplay;
