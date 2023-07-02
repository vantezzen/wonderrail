"use client";
import Image from "next/image";
import React from "react";
import logoImage from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@/lib/firebase/clientApp";

function Navbar() {
  const [user] = useAuthState(firebaseAuth);

  return (
    <div className="flex justify-between items-center" suppressHydrationWarning>
      <Link href="/">
        <Image src={logoImage} alt="WonderRail Logo" width={100} height={100} />
      </Link>
      {user ? (
        <Link href="/app">
          <Button>Go to app</Button>
        </Link>
      ) : (
        <Link href="/auth">
          <Button>Sign In</Button>
        </Link>
      )}
    </div>
  );
}

export default Navbar;
