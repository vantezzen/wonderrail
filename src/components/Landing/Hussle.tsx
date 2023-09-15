import React from "react";
import FeatureSection from "./FeatureSection";
import Image from "next/image";
import detailsImage from "@/assets/landing/details.png";

function Hussle() {
  return (
    <FeatureSection
      title={
        <>
          Planning.
          <br />
          Without the hussle.
        </>
      }
      subtitle={
        <>
          WonderRail's intelligent journey planner automates the process of{" "}
          <span className="text-black">selecting the best trains</span> for your
          trip. Get all necessary details like train changes, ticket prices,
          reservation requirements, hostel prices, and weather conditions,{" "}
          <span className="text-black">all in one place</span>
        </>
      }
    >
      <div
        className="mt-16 w-full h-[40vh] md:h-[60vh] relative rounded-xl overflow-hidden
        bg-brand-400
        bg-gradient-to-br from-brand-400 to-brand-500
      "
      >
        <Image
          src={detailsImage}
          alt="Planner"
          className="absolute w-3/4 md:w-1/2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-xl"
        />
      </div>
    </FeatureSection>
  );
}

export default Hussle;
