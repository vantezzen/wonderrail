import useJourneyIdStore from "@/components/Planner/journeyIdStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/clientApp";
import { useTrackEvent } from "../analytics";
import { User } from "firebase/auth";

export enum SaveActionStatus {
  LOGIN,
  NEW,
  SAVE,
  READ_ONLY,
}

export const getSaveActionStatus = (
  user: User | undefined | null,
  journeyUserId: string | undefined
) => {
  let saveActionStatus = SaveActionStatus.SAVE;

  if (!user && !journeyUserId) {
    saveActionStatus = SaveActionStatus.LOGIN;
  }
  if (!journeyUserId) {
    saveActionStatus = SaveActionStatus.NEW;
  }
  if (journeyUserId && (!user || journeyUserId !== user.uid)) {
    saveActionStatus = SaveActionStatus.READ_ONLY;
  }

  return saveActionStatus;
};

export default function useSaveActionStatus() {
  const [user] = useAuthState(firebaseAuth);
  const userId = useJourneyIdStore((store) => store.userId);
  let saveActionStatus = getSaveActionStatus(user, userId);
  useTrackEvent(`save_action_status_${saveActionStatus}`);

  return saveActionStatus;
}

export function useIsReadOnly() {
  const saveActionStatus = useSaveActionStatus();
  return saveActionStatus === SaveActionStatus.READ_ONLY;
}
