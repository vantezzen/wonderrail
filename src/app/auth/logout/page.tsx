"use client";
import { firebaseAuth } from "@/lib/firebase/clientApp";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Logout() {
  const router = useRouter();
  useEffect(() => {
    firebaseAuth.signOut().then(() => {
      router.push("/auth");
    });
  }, []);

  return <div>Logout</div>;
}

export default Logout;
