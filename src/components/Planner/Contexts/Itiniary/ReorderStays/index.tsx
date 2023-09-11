import React from "react";
import usePlannerStore from "../../../plannerStore";


import ReorderStaysList from "./ReorderStaysList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

function ReoderStays() {
  const planner = usePlannerStore((state) => state.planner);
  const isLoading = planner.isLoading;

  return (
    <div>
      {isLoading && (
        <Alert>
          <Loader2 className="mr-4 animate-spin" />
          <AlertTitle>Planning your trip...</AlertTitle>
          <AlertDescription>
            We are now planning your trip, this may take a few seconds.
          </AlertDescription>
        </Alert>
      )}

      <div className={isLoading ? "opacity-30 pointer-events-none" : ""}>
        <ReorderStaysList />
      </div>
    </div>
  );
}

export default ReoderStays;
