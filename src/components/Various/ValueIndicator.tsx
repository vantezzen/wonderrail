import { round } from "@/lib/utils/number";
import React from "react";

function ValueIndicator({
  values,
  steps = {
    low: 8,
    medium: 30,
    high: 60,
    end: 100,
  },
  postfix = "",
}: {
  values: number[];
  steps?: {
    low: number;
    medium: number;
    high: number;
    end: number;
  };
  postfix?: string;
}) {
  return (
    <div className="relative mt-3">
      <div className="flex justify-between items-center text-zinc-600 text-sm font-bold">
        <div>
          {steps.low}
          {postfix}
        </div>
        <div>
          {steps.end}
          {postfix}
        </div>
      </div>

      <div className="w-full h-2 bg-gray-200 rounded-full flex">
        <div className="w-1/3 bg-green-400 h-full rounded-l-lg" />
        <div className="w-1/3 bg-yellow-400 h-full" />
        <div className="w-1/3 bg-red-400 h-full rounded-r-lg" />
      </div>

      {values.map((value) => {
        let indicatorPosition = 0; // 0-100% based on price
        if (value > steps.low && value < steps.medium) {
          // Place at appropriate position between low and medium (0-33%)
          indicatorPosition =
            (value - steps.low) / (steps.medium - steps.low) / 3;
        } else if (value > steps.medium && value < steps.high) {
          // Place at appropriate position between medium and high (33-66%)
          indicatorPosition =
            (value - steps.medium) / (steps.high - steps.medium) / 3 + 0.33;
        } else if (value > steps.high) {
          // Place at appropriate position between high and max (66-100%)
          indicatorPosition =
            (value - steps.high) / (steps.end - steps.high) / 3 + 0.66;
        }

        return (
          <>
            <div
              className="absolute bottom-[-8px] w-2 h-6 bg-white rounded-full shadow-md border-2 border-gray-600"
              style={{
                left: `${indicatorPosition * 100}%`,
              }}
            />

            <div
              className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 text-zinc-600 text-sm font-bold"
              style={{
                left: `${indicatorPosition * 100}%`,
              }}
            >
              {round(value, 2)}
              {postfix}
            </div>
          </>
        );
      })}
    </div>
  );
}

export default ValueIndicator;
