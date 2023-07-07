"use client";
import Link from "next/link";
import React from "react";

import Image from "next/image";
import Balancer from "react-wrap-balancer";
import { Button } from "../ui/button";
import interfaceImage from "@/assets/landing/interface.png";
import style from "./Hero.module.css";
import { cn } from "@/lib/utils";
import { ChevronRight, Train } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

function Hero() {
  return (
    <section className="relative py-6 lg:pb-36 lg:pt-36">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-y-8">
          <div className="text-center flex items-center flex-col">
            <div className="max-w-sm mx-auto sm:max-w-5xl text-center">
              <h1 className="text-5xl font-bold leading-tight sm:leading-tight lg:text-6xl lg:leading-tight font-pj bg-clip-text text-transparent bg-gradient-to-b from-purple-100 to-purple-300">
                <Balancer>Discover the smartest way to Interrail</Balancer>
              </h1>
              <p className="mt-5 text-base text-zinc-400 sm:mt-8 sm:text-xl lg:text-lg xl:text-xl">
                <Balancer>
                  Say goodbye to complicated planning and overwhelming choices.
                  <br />
                  WonderRail guides you through the maze of options, ensuring a
                  stress-free tour planning experience. With WonderRail, all
                  that's left is the thrill of the journey.
                </Balancer>
              </p>
            </div>

            <div className="flex items-center gap-6 mt-12">
              <Link
                href="/journeys/new"
                onClick={() => {
                  trackEvent("landing_hero_plan_journey");
                }}
              >
                <Button>
                  Plan your journey now
                  <Train size={16} className="ml-2" />
                </Button>
              </Link>
              <Link
                href="/journeys/0LBSAcyZgIQgVdasJ2L1o1jJ1MC2/5a9bd144-0865-49de-b444-ddda6e319bfc"
                onClick={() => {
                  trackEvent("landing_hero_example_journey");
                }}
              >
                <Button variant="secondary">
                  See an example <ChevronRight size={16} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
          <div>
            <Image
              className={cn(
                "max-w-5xl w-5/6 mx-auto rounded-[2rem]",
                style.heroImage
              )}
              src={interfaceImage}
              alt=""
              priority
              placeholder="blur"
              width={1920}
              height={1080}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
