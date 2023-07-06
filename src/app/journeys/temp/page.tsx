"use client";
import PlannerComponent from "@/components/Planner";
import LoadingScreen from "@/components/Various/LoadingScreen";
import Storage from "@/lib/Journey/Storage";
import { useTrackEvent } from "@/lib/analytics";
import { Journey } from "@/lib/types";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function TemporarySavedJourney() {
  const [journey, setJourney] = React.useState<Journey>();
  const router = useRouter();

  useEffect(() => {
    const storage = new Storage();
    try {
      const journey = storage.loadTemporaryJourney();
      setJourney(journey);
    } catch (e) {
      console.error(e);

      // No temporary journey found or invalid journey
      router.push("/journeys/new");
    }
  }, []);

  useTrackEvent("planner_open_temporary");

  if (!journey) {
    return <LoadingScreen text="Loading journey..." />;
  }

  return (
    <div>
      <PlannerComponent journey={journey} />
    </div>
  );
}

export default TemporarySavedJourney;
