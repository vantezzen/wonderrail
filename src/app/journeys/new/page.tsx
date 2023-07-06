import PlannerComponent from "@/components/Planner";
import { EMPTY_JOURNEY } from "@/lib/types";
import React from "react";

function PlannerPage() {
  return (
    <div>
      <PlannerComponent journey={EMPTY_JOURNEY} />
    </div>
  );
}

export default PlannerPage;
