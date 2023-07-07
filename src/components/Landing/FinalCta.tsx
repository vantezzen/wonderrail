"use client";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { trackEvent } from "@/lib/analytics";

function FinalCta() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 ">
      <div className="mx-auto max-w-7xl p-12 bg-zinc-800 rounded">
        <div className="text-center lg:flex lg:items-center lg:justify-between lg:text-left">
          <div className="max-w-xl mx-auto lg:mx-0">
            <h2 className="text-3xl font-bold text-zinc-50 sm:text-4xl font-pj">
              Ready to Embark on Your Adventure?
            </h2>
            <p className="max-w-md mx-auto mt-4 text-base font-medium leading-7 text-zinc-400 lg:mx-0 sm:mt-6 font-pj">
              Europe is calling! Use WonderRail to transform your Interrail
              dreams into reality. Start your journey now!
            </p>
          </div>
          <div className="mt-8 sm:flex sm:items-center lg:mt-0 sm:justify-center lg:justify-end sm:space-x-6">
            <Link
              href="/journeys/new"
              onClick={() => {
                trackEvent("landing_final_cta_click");
              }}
            >
              <Button className="mt-12">Get started now</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FinalCta;
