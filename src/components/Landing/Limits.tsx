import React from "react";
import FeatureSection from "./FeatureSection";
import Image from "next/image";
import limitsImage from "@/assets/landing/limits.png";

function Limits() {
  return (
    <FeatureSection
      title={
        <>
          Know your
          <br />
          limits.
        </>
      }
      subtitle={
        <>
          WonderRail keeps track of your Interrail{" "}
          <span className="text-black">pass limits</span>, so you don't have to.
          Get notified when you are about to exceed your{" "}
          <span className="text-black">travel days</span> or plan to travel
          outside of your Interrail zone.
        </>
      }
    >
      <div
        className="mt-16 w-full h-[40vh] md:h-[60vh] relative rounded-xl overflow-hidden bg-brand-100
      "
      >
        <Image
          src={limitsImage}
          alt="Planner"
          className="absolute w-3/4 md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        />
      </div>
    </FeatureSection>
  );
}

export default Limits;
