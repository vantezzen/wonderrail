import { create } from "zustand";
import { devtools } from "zustand/middleware";

export type ContextSectionStandalonePages = {
  type: "generalSettings" | "passEditor" | "itinerary";
};

type ContextSectionRideDetails = {
  type: "rideDetails";
  rideId: string;
};

export type ContextSectionStayPage = {
  type: "stay";
  stayId: string;
};

type ContextSectionState =
  | null
  | ContextSectionStandalonePages
  | ContextSectionRideDetails
  | ContextSectionStayPage;

interface ContextState {
  context: ContextSectionState;
  setContext: (context: ContextSectionState) => void;
}

const useContextSectionStore = create<ContextState>()(
  devtools((set) => ({
    context: {
      type: "itinerary",
    },
    setContext: (context: ContextSectionState) => set({ context }),
  }))
);
export default useContextSectionStore;
