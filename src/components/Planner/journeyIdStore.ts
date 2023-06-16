import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface JourneyIdState {
  userId?: string;
  journeyId?: string;
  setIds: (userId?: string, journeyId?: string) => void;
}

const useJourneyIdStore = create<JourneyIdState>()(
  devtools((set) => ({
    userId: undefined,
    journeyId: undefined,
    setIds: (userId?: string, journeyId?: string) => set({ userId, journeyId }),
  }))
);
export default useJourneyIdStore;
