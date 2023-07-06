import PlannerComponent from "@/components/Planner";
import { useTrackEvent } from "@/lib/analytics";
import { EMPTY_JOURNEY } from "@/lib/types";
import React from "react";

function PlannerPage() {
  useTrackEvent("planner_open_new");

  return (
    <div>
      <PlannerComponent journey={EMPTY_JOURNEY} />
    </div>
  );
}

export default PlannerPage;
