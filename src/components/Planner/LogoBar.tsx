import React from "react";
import Image from "next/image";
import logoImage from "@/assets/logo.png";
import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseAuth } from "@/lib/firebase/clientApp";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

function LogoBar() {
  const [user] = useAuthState(firebaseAuth);

  return (
    <div className="flex gap-3 justify-between items-start mb-3">
      {user && (
        <Link href="/app" className="flex items-center hover:underline">
          <ChevronLeft />
          Back to dashboard
        </Link>
      )}
      <Image
        src={logoImage}
        alt="logo"
        width={100}
        height={100}
        className="mb-6"
      />
    </div>
  );
}

export default LogoBar;
