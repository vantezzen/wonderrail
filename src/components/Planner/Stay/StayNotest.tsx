import { Separator } from "@/components/ui/separator";
import React from "react";
import { JourneyStay } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import usePlannerStore from "../plannerStore";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";

function StayNotes({ stay }: { stay: JourneyStay }) {
  const planner = usePlannerStore((store) => store.planner);
  const isReadOnly = useIsReadOnly();

  return (
    <div className="pt-3">
      <Separator className="my-3" />
      <div className="pt-3">
        <h3 className="dark:text-zinc-200 text-zinc-600 font-bold">Notes</h3>

        <Textarea
          value={stay.notes ?? ""}
          onChange={(event) => {
            stay.notes = event.target.value;
            planner.emit("change");
          }}
          className="mt-3 dark:text-zinc-200 text-zinc-700 placeholder:text-zinc-500"
          placeholder="Add any notes you want to add to this location here."
          readOnly={isReadOnly}
        />
      </div>
    </div>
  );
}

export default StayNotes;
