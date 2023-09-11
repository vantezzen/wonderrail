import React from "react";
import JourneySteps from "../../Steps/JourneySteps";
import usePlannerStore from "../../plannerStore";
import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";
import { Loader2 } from "lucide-react";
import AddLocationModal from "../../Modals/AddLocationModal";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import { Button } from "@/components/ui/button";
import ReorderStaysList from "./ReorderStays/ReorderStaysList";

function Itiniary() {
  const planner = usePlannerStore((store) => store.planner);
  const isReadOnly = useIsReadOnly();

  const [isReordering, setIsReordering] = React.useState(false);

  return (
    <div className="px-6">
      <Button onClick={() => setIsReordering(!isReordering)}>Reorder</Button>

      {isReordering ? <ReorderStaysList /> : <JourneySteps />}

      {planner.isLoading && (
        <Alert className="mt-3">
          <Loader2 className="mr-2 animate-spin" size={16} />
          <AlertTitle>Your journey being planned</AlertTitle>
          <AlertDescription>
            We are currently planning your journey in the background. During
            this, information shown might be inaccurate. You can still continue
            editing your journey.
          </AlertDescription>
        </Alert>
      )}

      {planner.journey.steps.length === 0 && (
        <div className="mt-6 text-center">
          <h3 className="font-medium text-zinc-400">No stops yet</h3>
          <p className="text-zinc-500 font-medium text-sm">
            Add your first stop by clicking the button below or choosing a city
            on the map.
          </p>
        </div>
      )}

      {!isReadOnly && <AddLocationModal />}
    </div>
  );
}

export default Itiniary;
