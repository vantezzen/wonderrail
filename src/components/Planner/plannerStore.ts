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
    showPopularCities: boolean;
    showStatusBar: boolean;
  };
  setView: (view: keyof PlannerState["view"], state: boolean) => void;
}

const usePlannerStore = create<PlannerState>()(
  devtools((set) => ({
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
      showPopularCities: true,
      showStatusBar: true,
    },
    setView: (view, newState) =>
      set((state) => ({
        view: {
          ...state.view,
          [view]: newState,
        },
      })),
  }))
);
export default usePlannerStore;
