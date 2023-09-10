import ValueIndicator from "@/components/Various/ValueIndicator";
import { JourneyStay } from "@/lib/types";
import React from "react";
import usePlannerStore from "../plannerStore";
import StaySectionItem from "./StaySectionItem";

function WeatherInformation({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((state) => state.planner);

  if (!stay.weather) return null;

  return (
    <StaySectionItem title="Weather">
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
    </StaySectionItem>
  );
}

export default WeatherInformation;
