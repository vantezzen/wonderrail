import React from "react";
import usePlannerStore from "../../plannerStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ReorderStaysList from "./ReorderStaysList";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

function ReoderStaysModal() {
  const show = usePlannerStore((state) => state.view.showReorderStays);
  const updateView = usePlannerStore((state) => state.setView);
  const planner = usePlannerStore((state) => state.planner);
  const setShow = (showCalendar: boolean) => {
    updateView("showReorderStays", showCalendar);
  };
  const isLoading = planner.isLoading;

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reorder locations</DialogTitle>
        </DialogHeader>

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
      </DialogContent>
    </Dialog>
  );
}

export default ReoderStaysModal;
