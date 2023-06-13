import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebaseAuth } from "@/lib/firebase/clientApp";
import Link from "next/link";

const uiConfig: firebaseui.auth.Config = {
  signInSuccessUrl: "/app",
  signInOptions: ["google.com", "facebook.com", "twitter.com", "password"],
  signInFlow: "popup",
  callbacks: {
    signInFailure(error: firebaseui.auth.AuthUIError) {
      console.log(error);
    },
    signInSuccessWithAuthResult(authResult) {
      const provider = authResult.credential?.providerId ?? "password";
      localStorage.setItem("auth.lastLoginProvider", provider);

      // Forces page reload wiht refresh, otherwise race conditions and caching might cause problems
      window.location.href = "/app";

      return false;
    },
  },
};

function SignInScreen() {
  return (
    <div>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />

      <p className="mt-6 font-medium text-zinc-500 text-center">
        By continuing, you agree to neonFin&apos;s{" "}
        <Link href="/legal/terms" className="underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link href="/legal/privacy" className="underline">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}

export default SignInScreen;
