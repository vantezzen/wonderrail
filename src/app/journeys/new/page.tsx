"use client";
import PlannerComponent from "@/components/Planner";
import useJourneyIdStore from "@/components/Planner/journeyIdStore";
import LoadingScreen from "@/components/Various/LoadingScreen";
import { EMPTY_JOURNEY } from "@/lib/types";
import React from "react";

function PlannerPage() {
  const journeyId = useJourneyIdStore((state) => state.journeyId);
  const setIds = useJourneyIdStore((state) => state.setIds);

  React.useEffect(() => {
    setIds(undefined, undefined);
  }, []);

  if (journeyId) {
    return <LoadingScreen text="Updating interface" />;
  }

  return (
    <div>
      <PlannerComponent journey={EMPTY_JOURNEY} />
    </div>
  );
}

export default PlannerPage;
