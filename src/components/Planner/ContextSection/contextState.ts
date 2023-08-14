import { create } from "zustand";
import { devtools } from "zustand/middleware";

type ContextSectionStay = {
  type: "stay";
  stayId: string;
};

type ContextSectionGeneralSettings = {
  type: "generalSettings";
};

type ContextSectionState =
  | null
  | ContextSectionStay
  | ContextSectionGeneralSettings;

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
