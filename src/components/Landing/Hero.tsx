import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import waterImage from "@/assets/landing/water.png";
import plannerImage from "@/assets/landing/planner.png";

function Hero() {
  return (
    <div className="pt-32 max-w-6xl mx-auto p-12">
      <h1 className="text-6xl font-extrabold max-w-2xl">
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
      </h1>

      <p className="text-xl mt-8 text-zinc-600">
        WonderRail helps you through the maze of options when planning your
        Interrail journey, ensuring a stress-free tour planning experience. With
        WonderRail, all that's left is the thrill of the journey.
      </p>

      <div className="mt-8 flex gap-6">
        <Link href="/app">
          <Button size="lg">Start planning</Button>
        </Link>
        <Link href="/journeys/0LBSAcyZgIQgVdasJ2L1o1jJ1MC2/5a9bd144-0865-49de-b444-ddda6e319bfc">
          <Button variant="secondary" size="lg">
            See an example
          </Button>
        </Link>
      </div>

      <div className="mt-16 w-full h-[80vh] relative rounded-xl overflow-hidden">
        <Image
          src={waterImage}
          alt="Water"
          fill
          className="object-cover w-full h-full rounded-xl blur-3xl"
        />

        <Image
          src={plannerImage}
          alt="Planner"
          className="absolute w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border-8 border-zinc-100 rounded-xl"
        />
      </div>
    </div>
  );
}

export default Hero;
