import { uppercaseFirstLetter } from "@/lib/utils/string";
import React from "react";

function RatingPills({
  title,
  score,
}: {
  title: string;
  score: number; // 1-5
}) {
  return (
    <div className="flex justify-between">
      <div className="text-sm text-zinc-500">{uppercaseFirstLetter(title)}</div>

      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => {
          return (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${
                i < score
                  ? "dark:bg-zinc-200 bg-zinc-700"
                  : "dark:bg-zinc-700 bg-zinc-200"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RatingPills;
