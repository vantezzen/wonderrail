"use client";
import { useAuthState } from "@/lib/firebase/FirebaseConnectionStore";
import useUserStore from "@/lib/firebase/userStore";
import React, { useEffect } from "react";
import LoadingScreen from "../Various/LoadingScreen";

/**
 * UserProvider: Guarantees that the current user is stored in the user store,
 * otherwise the children are not rendered
 */
function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, loadingUser, userError] = useAuthState();
  const setUser = useUserStore((store) => store.setUser);
  const storeUser = useUserStore((store) => store.user);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (loadingUser) {
    return <LoadingScreen text="Loading user details" />;
  }

  if (userError) {
    return <>{userError.message}</>;
  }

  if (user === null || user === undefined || storeUser === null) {
    return <>UserProvider: No user</>;
  }

  return <>{children}</>;
}

export default UserProvider;
