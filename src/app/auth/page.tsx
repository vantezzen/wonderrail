"use client";
import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebaseAuth } from "@/lib/firebase/clientApp";
import Link from "next/link";
import logoImage from "@/assets/logo.png";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";

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

      const hasTemporarilySavedJourney =
        localStorage.getItem("journey") !== null;

      // Forces page reload with refresh, otherwise race conditions and caching might cause problems
      window.location.href = hasTemporarilySavedJourney
        ? "/journeys/temp"
        : "/app";

      return false;
    },
  },
};

function SignInScreen() {
  const [user] = useAuthState(firebaseAuth);
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/app");
    }
  }, [user]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center gap-4 bg-black">
      <Image src={logoImage} width={150} height={150} alt="WonderRail logo" />

      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />

      <p className="mt-6 font-medium text-zinc-500 text-center">
        By continuing, you agree to WonderRail&apos;s{" "}
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
