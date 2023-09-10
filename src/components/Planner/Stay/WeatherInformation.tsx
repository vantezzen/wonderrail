import ValueIndicator from "@/components/Various/ValueIndicator";
import { Separator } from "@/components/ui/separator";
import { JourneyStay } from "@/lib/types";
import React from "react";
import usePlannerStore from "../plannerStore";

function WeatherInformation({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);

  if (!stay.weather) return null;

  return (
    <div className="mt-3">
      <Separator className="my-3" />

      <div className="flex items-center justify-between">
        <h3 className="dark:text-zinc-200 text-zinc-600 font-bold">Weather</h3>
        <div className="flex items-center gap-3">
          <p className="text-sm">
            at night{" "}
            <span className="font-bold">{stay.weather?.minTemperature}°C</span>
          </p>
          <p className="text-sm">
            average{" "}
            <span className="font-bold">{stay.weather?.avgTemperature}°C</span>
          </p>
          <p className="text-sm">
            highest{" "}
            <span className="font-bold">{stay.weather?.maxTemperature}°C</span>
          </p>

          <ValueIndicator
            values={[stay.weather?.avgTemperature]}
            postfix="°C"
            steps={{
              low: -10,
              medium: 20,
              high: 35,
              end: 45,
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default WeatherInformation;
