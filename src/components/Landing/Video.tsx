import Image from "next/image";
import React from "react";
import Highlight from "./Elements/Highlight";
import itineraryImage from "@/assets/landing/itinerary.png";
import timetableImage from "@/assets/landing/timetable.png";
import priceChangesImage from "@/assets/landing/price-changes.png";
import threedImage from "@/assets/landing/3d.png";
import shareImage from "@/assets/landing/share.png";
import notCoveredImage from "@/assets/landing/not-covered.png";

function Video() {
  return (
    <div className="mb-12">
      <div className="max-w-4xl px-4 mx-auto text-center sm:px-0 mb-12">
        <h2 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj">
          Let&apos;s give you a quick demo
        </h2>
      </div>

      <div className="flex justify-center items-center">
        <iframe
          width="1000"
          height="562"
          src="https://www.youtube-nocookie.com/embed/LJLSLOKdaLY"
          title="YouTube video player"
          frameBorder={0}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}

export default Video;
