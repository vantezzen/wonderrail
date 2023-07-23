"use client";
import PlannerComponent from "@/components/Planner";
import useJourneyIdStore from "@/components/Planner/journeyIdStore";
import LoadingScreen from "@/components/Various/LoadingScreen";
import Storage from "@/lib/Journey/Storage";
import { Journey } from "@/lib/types";
import React from "react";

function JourneyPage({
  params: { userId, journeyId },
}: {
  params: { userId: string; journeyId: string };
}) {
  const journeyIdState = useJourneyIdStore((state) => state.journeyId);
  const setIds = useJourneyIdStore((state) => state.setIds);
  const [journey, setJourney] = React.useState<Journey>();
  React.useEffect(() => {
    setIds(userId, journeyId);

    const storage = new Storage();
    storage.loadJourney(userId, journeyId).then((journey) => {
      setJourney(journey);
    });
  }, [userId, journeyId]);

  if (!journeyIdState) {
    return <LoadingScreen text="Updating interface" />;
  }

  if (!journey) {
    return <LoadingScreen text="Loading journey" />;
  }

  return <PlannerComponent journey={journey} />;
}

export default JourneyPage;
