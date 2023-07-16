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
      <div className="flex justify-between items-center">
        <p className="dark:text-zinc-400 text-zinc-600 text-sm">
          Expect an average temperature of{" "}
          <span className="font-bold">{stay.weather?.avgTemperature}°C</span>{" "}
          with a minimum of{" "}
          <span className="font-bold">{stay.weather?.minTemperature}°C</span> at
          night to{" "}
          <span className="font-bold">{stay.weather?.maxTemperature}°C</span>{" "}
          during the day based on last year's data.
        </p>
      </div>

      <ValueIndicator
        values={[
          stay.weather?.minTemperature,
          stay.weather?.avgTemperature,
          stay.weather?.maxTemperature,
        ]}
        postfix="°C"
        steps={{
          low: -10,
          medium: 20,
          high: 35,
          end: 45,
        }}
      />
    </div>
  );
}

export default WeatherInformation;
