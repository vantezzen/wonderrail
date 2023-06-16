import Image from "next/image";
import React from "react";
import logoImage from "@/assets/logo.png";
import Link from "next/link";
import { Button } from "../ui/button";

function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <Link href="/">
        <Image src={logoImage} alt="WonderRail Logo" width={100} height={100} />
      </Link>
      <Link href="/auth">
        <Button>Sign In</Button>
      </Link>
    </div>
  );
}

export default Navbar;
