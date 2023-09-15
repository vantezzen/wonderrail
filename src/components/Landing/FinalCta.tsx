import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

function FinalCta() {
  return (
    <div className="max-w-6xl mt-16 mx-auto p-16 lg:rounded-xl bg-gradient-to-br from-zinc-700 to-black">
      <div className="flex flex-col md:flex-row gap-3 justify-between items-center">
        <div>
          <h2 className="text-5xl text-white max-w-xl font-extrabold leading-normal mb-6">
            Ready to Embark on Your Adventure?
          </h2>

          <p className="text-lg text-zinc-400 font-medium max-w-xl">
            Europe is calling! Use WonderRail to transform your Interrail dreams
            into reality. Start your journey now!
          </p>
        </div>

        <Link href="/app">
          <Button size="lg" variant="secondary">
            Start planning
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default FinalCta;
