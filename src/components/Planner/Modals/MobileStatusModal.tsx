import React, { useEffect } from "react";
import usePlannerStore from "../plannerStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { trackEvent } from "@/lib/analytics";
import StatusBar from "../StatusBar";

function MobileStatusModal() {
  const show = usePlannerStore((state) => state.view.showMobileStatus);
  const updateView = usePlannerStore((state) => state.setView);
  const setShow = (showCalendar: boolean) => {
    updateView("showMobileStatus", showCalendar);
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
          <DialogTitle>Status</DialogTitle>
        </DialogHeader>

        <StatusBar />
      </DialogContent>
    </Dialog>
  );
}

export default MobileStatusModal;
