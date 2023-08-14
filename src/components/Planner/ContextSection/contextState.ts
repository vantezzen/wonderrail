import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ContextSectionStay = {
  type: "stay";
  stayId: string;
};

type ContextSectionGeneralSettings = {
  type: "generalSettings";
};

type ContextSectionPassEditor = {
  type: "passEditor";
};

type ContextSectionRideDetails = {
  type: "rideDetails";
  rideId: string;
};

type ContextSectionState =
  | null
  | ContextSectionStay
  | ContextSectionGeneralSettings
  | ContextSectionPassEditor
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