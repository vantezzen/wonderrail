import Planner from "@/lib/Journey/Planner";
import { JourneyStay } from "@/lib/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface PlannerState {
  planner: Planner;
  setPlanner: (planner: Planner) => void;

  popups: {
    welcome: boolean;
    ai: boolean;
    addLocation: boolean;
  };
  setPopupState: (popup: keyof PlannerState["popups"], state: boolean) => void;

  addLocationBefore: JourneyStay | null;
  setAddLocationBefore: (stay: JourneyStay | null) => void;

  view: {
    showStatusBar: boolean;
    showMapModal: boolean;
    showMobileStatus: boolean;
  };
  setView: (view: keyof PlannerState["view"], state: boolean) => void;
}

const usePlannerStore = create<PlannerState>()(
  devtools(
    (set): PlannerState => ({
      planner: null as any,
      setPlanner: (planner: Planner) => set({ planner }),

      popups: {
        welcome: false,
        ai: false,
        addLocation: false,
      },
      setPopupState: (popup, newState) =>
        set((state) => ({
          popups: {
            ...state.popups,
            [popup]: newState,
          },
        })),

      addLocationBefore: null,
      setAddLocationBefore: (stay) => set({ addLocationBefore: stay }),

      view: {
        showStatusBar: true,
        showMapModal: false,
        showMobileStatus: false,
      },
      setView: (view, newState) =>
        set((state) => ({
          view: {
            ...state.view,
            [view]: newState,
          },
        })),
    }),
    {
      name: "usePlannerStore",
    }
  )
);
export default usePlannerStore;
