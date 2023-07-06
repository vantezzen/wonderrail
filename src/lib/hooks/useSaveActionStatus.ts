import useJourneyIdStore from "@/components/Planner/journeyIdStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/clientApp";
import { useTrackEvent } from "../analytics";

export enum SaveActionStatus {
  LOGIN,
  NEW,
  SAVE,
  READ_ONLY,
}

export default function useSaveActionStatus() {
  const [user] = useAuthState(firebaseAuth);
  const userId = useJourneyIdStore((store) => store.userId);

  let saveActionStatus = SaveActionStatus.SAVE;

  if (!user && !userId) {
    saveActionStatus = SaveActionStatus.LOGIN;
  }
  if (!userId) {
    saveActionStatus = SaveActionStatus.NEW;
  }
  if (userId && (!user || userId !== user.uid)) {
    saveActionStatus = SaveActionStatus.READ_ONLY;
  }

  useTrackEvent(`save_action_status_${saveActionStatus}`);

  return saveActionStatus;
}

export function useIsReadOnly() {
  const saveActionStatus = useSaveActionStatus();
  return saveActionStatus === SaveActionStatus.READ_ONLY;
}
