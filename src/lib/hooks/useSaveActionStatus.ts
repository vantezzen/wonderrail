import useJourneyIdStore from "@/components/Planner/journeyIdStore";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "../firebase/clientApp";

export enum SaveActionStatus {
  LOGIN,
  NEW,
  SAVE,
  READ_ONLY,
}

export default function useSaveActionStatus() {
  const [user] = useAuthState(firebaseAuth);
  const userId = useJourneyIdStore((store) => store.userId);

  if (!user && !userId) {
    return SaveActionStatus.LOGIN;
  }
  if (!userId) {
    return SaveActionStatus.NEW;
  }
  if (userId && (!user || userId !== user.uid)) {
    return SaveActionStatus.READ_ONLY;
  }

  return SaveActionStatus.SAVE;
}
