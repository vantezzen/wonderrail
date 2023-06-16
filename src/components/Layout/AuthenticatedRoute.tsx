"use client";
import { useAuthState } from "@/lib/firebase/FirebaseConnectionStore";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import LoadingScreen from "../Various/LoadingScreen";

/**
 * Authenticated Route: Only let logged in users see this page.
 */
function AuthenticatedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, loading, error] = useAuthState();

  useEffect(() => {
    if (user === null && !loading) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  if (user !== null && !loading) {
    return <>{children}</>;
  }
  return <LoadingScreen text="Preparing" />;
}

export default AuthenticatedRoute;
