"use client";
import { firebaseAuth } from "@/lib/firebase/clientApp";
import { User } from "firebase/auth";
import { useEffect } from "react";
import { useAuthState as useAuthStateHook } from "react-firebase-hooks/auth";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface FirebaseConnectionStore {
  authState: [User | null | undefined, boolean, Error | undefined];
  update: (state: Partial<FirebaseConnectionStore>) => void;
}

const useFirestoreConnectionStore = create<FirebaseConnectionStore>()(
  devtools((set) => ({
    authState: [null, true, undefined],
    update: (state) => set(state),
  }))
);
export default useFirestoreConnectionStore;

export const useAuthState = () =>
  useFirestoreConnectionStore((state) => state.authState);

export const FirebaseConnectionStoreProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authState = useAuthStateHook(firebaseAuth);
  const update = useFirestoreConnectionStore((state) => state.update);
  useEffect(() => update({ authState }), [authState]);

  return <>{children}</>;
};
