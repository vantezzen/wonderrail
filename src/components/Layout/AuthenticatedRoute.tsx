import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "@/lib/firebase/FirebaseConnectionStore";

/**
 * Authenticated Route: Only let logged in users see this page.
 */
function AuthenticatedRoute({
  children,
  withoutOnboarding,
}: {
  children: React.ReactNode;
  withoutOnboarding?: boolean;
}) {
  const router = useRouter();
  const [user, loading, error] = useAuthState();

  useEffect(() => {
    if (user === null && !loading) {
      router.push({
        pathname: "/auth/login",
        query: { returnUrl: router.asPath },
      });
    }
  }, [user, loading, router]);

  if (user !== null && !loading) {
    return <>{children}</>;
  }
  return <>Loading</>;
}

export default AuthenticatedRoute;
