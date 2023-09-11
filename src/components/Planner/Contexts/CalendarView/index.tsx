import { Calendar } from "@/components/ui/calendar";
import React from "react";
import usePlannerStore from "../../plannerStore";

import { JourneyRide, JourneyStay } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import "./CalendarView.css";

const tripColors = [
  "#F87171",
  "#FBBF24",
  "#34D399",
  "#60A5FA",
  "#A78BFA",
  "#F472B6",
  "#FCD34D",
  "#6EE7B7",
  "#93C5FD",
  "#D1D5DB",
];

function CalendarView() {
  const planner = usePlannerStore((state) => state.planner);

  const modifiers: { [key: string]: Date[] } = {
    ride: (
      planner.journey.steps.filter(
        (step) => step.type === "ride"
      ) as JourneyRide[]
    )
      .map((step: JourneyRide) => [step.timerange.start, step.timerange.end])
      .flat(),
  };
  const modifierStyles: { [key: string]: React.CSSProperties } = {};
  const stays = planner.journey.steps.filter(
    (step) => step.type === "stay"
  ) as JourneyStay[];

  const stayInfo: {
    stay: JourneyStay;
    color: string;
  }[] = [];

  for (const stayIndex in stays) {
    const stay = stays[stayIndex];
    const color = tripColors[parseInt(stayIndex) % tripColors.length];

    const days: Date[] = [];
    let currentDate = new Date(stay.timerange.start);
    while (currentDate <= stay.timerange.end) {
      days.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    modifiers[`stay-${stayIndex}`] = days;
    modifierStyles[`stay-${stayIndex}`] = {
      color: "white",
      backgroundColor: color,
    };
    stayInfo.push({
      stay,
      color,
    });
  }

  return (
    <div className="p-3">
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="mx-auto">
            <Calendar
              mode="single"
              selected={undefined}
              className="rounded-md border"
              modifiers={modifiers}
              modifiersStyles={modifierStyles}
              modifiersClassNames={{
                ride: "ride-day",
              }}
              fromDate={planner.journey.startDate}
              toDate={
                (
                  planner.journey.steps[
                    planner.journey.steps.length - 1
                  ] as JourneyStay
                )?.timerange?.end || undefined
              }
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex gap-2 items-center">
              <div>🚂</div>
              <div>
                <div className="font-semibold">Train ride</div>
              </div>
            </div>

            {stayInfo.map(({ stay, color }) => (
              <div className="flex gap-2 items-center" key={stay.id}>
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <div>
                  <div className="font-semibold">
                    {stay.locationName ?? stay.location.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CalendarView;
