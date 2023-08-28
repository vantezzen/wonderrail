import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ContextSectionStandalonePages = {
  type: "stay" | "generalSettings" | "passEditor" | "itinerary";
  stayId: string;
};

type ContextSectionRideDetails = {
  type: "rideDetails";
  rideId: string;
};

type ContextSectionState =
  | null
  | ContextSectionStandalonePages
  | ContextSectionRideDetails;

interface ContextState {
  context: ContextSectionState;
  setContext: (context: ContextSectionState) => void;
}

const useContextSectionStore = create<ContextState>()(
  devtools((set) => ({
    context: null,
    setContext: (context: ContextSectionState) => set({ context }),
  }))
);
export default useContextSectionStore;
