import { collection } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import useUserStore from "../firebase/userStore";
import { firestore } from "../firebase/clientApp";

export default function useJourneys() {
  const user = useUserStore((store) => store.user);

  const journeysCollectionRef = collection(
    firestore,
    `/users/${user?.uid}/journeys`
  );
  const [journeys, isLoading, error] = useCollection<{ journey: string }>(
    journeysCollectionRef as any
  );

  return {
    journeys,
    isLoading,
    error,
  };
}
