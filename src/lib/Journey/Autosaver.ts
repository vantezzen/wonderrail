import useJourneyIdStore from "@/components/Planner/journeyIdStore";
import { firebaseAuth } from "../firebase/clientApp";
import Planner from "./Planner";
import {
  SaveActionStatus,
  getSaveActionStatus,
} from "../hooks/useSaveActionStatus";
import Storage from "./Storage";

/**
 * Autosaver: Handle automatically save changes periodically in the background
 */
export default class Autosaver {
  private static AUTOSAVE_TIME_MS = 1000 * 20; // Save at most every 20 seconds
  private currentSaveTimeout: NodeJS.Timeout | undefined;

  constructor(private planner: Planner) {
    this.planner.addListener("change", () => {
      this.handleJourneyChange();
    });
  }

  private handleJourneyChange() {
    if (!this.currentSaveTimeout && this.canSaveCurrentJourney()) {
      this.currentSaveTimeout = setTimeout(() => {
        const storage = new Storage();
        storage.saveJourney(this.planner.journey);
        this.planner.emit("saved");
      }, Autosaver.AUTOSAVE_TIME_MS);
    }
  }

  private canSaveCurrentJourney() {
    const currentUser = firebaseAuth.currentUser;
    const journeyUserId = useJourneyIdStore.getState().userId;

    return (
      getSaveActionStatus(currentUser, journeyUserId) === SaveActionStatus.SAVE
    );
  }
}
