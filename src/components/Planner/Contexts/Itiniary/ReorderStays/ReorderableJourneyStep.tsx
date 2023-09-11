import JourneyStayDisplay from "@/components/Planner/Stay/JourneyStayDisplay";
import Planner from "@/lib/Journey/Planner";
import { JourneyStay } from "@/lib/types";
import React from "react";

function ReorderableJourneyStep({
  step,
  planner,
}: {
  step: JourneyStay;
  planner: Planner;
}) {
  return <JourneyStayDisplay stay={step} reordering />;
}

export default ReorderableJourneyStep;
