"use client";
import React, { useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebaseAuth } from "@/lib/firebase/clientApp";
import Link from "next/link";
import logoImage from "@/assets/logo.png";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
import "./firebase.css";

const uiConfig: firebaseui.auth.Config = {
  signInSuccessUrl: "/app",
  signInOptions: ["google.com", "password"],
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
    <div className="min-h-screen flex flex-col lg:grid lg:grid-cols-2 gap-4">
      <div className="lg:h-screen p-6">
        <div className="h-full w-full rounded-xl bg-zinc-900 text-white p-16">
          <Image
            src={logoImage}
            width={100}
            height={100}
            alt="WonderRail logo"
          />

          <h2 className="hidden lg:block lg:text-5xl font-extrabold max-w-2xl mt-12">
            Discover the smartest way to{" "}
            <span
              style={{
                background: "linear-gradient(132deg, #30A76D 0%, #295F45 100%)",
                backgroundClip: "text",
                // @ts-ignore
                "-webkit-background-clip": "text",
                // @ts-ignore
                "-webkit-text-fill-color": "transparent",
              }}
            >
              Interrail
            </span>
          </h2>

          <p className="text-xl mt-8 text-zinc-400">
            You can use the WonderRail planner without logging in - create a
            free account to save your journeys in the cloud and share them with
            friends.
          </p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-4 p-6 max-w-xl mx-auto">
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />

        <p className="font-medium text-zinc-500 text-center">
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
    </div>
  );
}

export default SignInScreen;
