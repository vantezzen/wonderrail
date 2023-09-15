import Image from "next/image";
import React from "react";
import lightLogo from "@/assets/logo_light.png";
import { Button } from "../ui/button";
import Link from "next/link";

function Header() {
  return (
    <div className="flex gap-3 justify-between items-center p-3 border-b border-zinc-300">
      <Link href="/" className="flex items-center">
        <Image
          src={lightLogo}
          alt="logo"
          className="object-contain"
          width={100}
          height={100}
        />
      </Link>

      <div className="flex items-center gap-3">
        <Link href="/app">
          <Button variant="link" className="text-zinc-600">
            Login
          </Button>
        </Link>
        <Link href="/app">
          <Button>Start planning</Button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
