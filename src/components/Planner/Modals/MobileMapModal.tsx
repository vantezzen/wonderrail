import React, { useEffect } from "react";
import usePlannerStore from "../plannerStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackEvent } from "@/lib/analytics";
import PlannerMap from "../PlannerMap";

function MobileMapModal() {
  const show = usePlannerStore((state) => state.view.showMapModal);
  const updateView = usePlannerStore((state) => state.setView);
  const planner = usePlannerStore((state) => state.planner);
  const setShow = (showCalendar: boolean) => {
    updateView("showMapModal", showCalendar);
  };
  useEffect(() => {
    if (show) {
      trackEvent("planner_open_modal_map");
    }
  }, [show]);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Map</DialogTitle>
        </DialogHeader>

        <PlannerMap />
      </DialogContent>
    </Dialog>
  );
}

export default MobileMapModal;
