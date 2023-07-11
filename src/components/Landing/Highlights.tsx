import Image from "next/image";
import React from "react";
import Highlight from "./Elements/Highlight";
import itineraryImage from "@/assets/landing/itinerary.png";
import timetableImage from "@/assets/landing/timetable.png";
import priceChangesImage from "@/assets/landing/price-changes.png";
import threedImage from "@/assets/landing/3d.png";
import shareImage from "@/assets/landing/share.png";
import notCoveredImage from "@/assets/landing/not-covered.png";

function Highlights() {
  return (
    <div className="">
      <div className="max-w-4xl px-4 mx-auto text-center sm:px-0 mb-12">
        <h2 className="text-3xl font-bold text-white sm:text-4xl xl:text-5xl font-pj">
          Discover WonderRail&apos;s Edge
        </h2>
      </div>

      <div className="flex flex-col md:grid md:grid-cols-12 gap-12">
        <Highlight
          size={4}
          top={
            <Image
              src={itineraryImage}
              alt="itinerary"
              width={300}
              height={300}
              className="rounded mx-auto"
            />
          }
          title="Start planning without hustle"
          description="No login required, just start planning your trip right away. WonderRail is a web app, meaning that you can access it from any device with a browser."
        />
        <Highlight
          size={8}
          top={
            <Image
              src={timetableImage}
              alt="timetable"
              className="rounded mx-auto w-full max-w-xl"
            />
          }
          title="Your Travel Companion"
          description="Our intelligent journey planner automates the process of selecting the best trains for your trip. Get all necessary details like train changes, ticket prices, reservation requirements, hostel prices, and weather conditions, all in one place."
        />

        <Highlight
          size={6}
          top={
            <Image
              src={shareImage}
              alt="share"
              className="rounded mx-auto w-full max-h-64 max-w-xl"
              style={{ objectFit: "contain" }}
            />
          }
          title="Travel Together"
          description="Bring your friends and family along for the ride. WonderRail allows you to share your journey plans with loved ones, creating shared memories even before you start the trip."
        />

        <Highlight
          size={6}
          top={
            <Image
              src={priceChangesImage}
              alt="price changes"
              className="rounded mx-auto w-full max-w-xl"
            />
          }
          title="Keep Your Budget in Check"
          description="Keep your Interrail tour budget-friendly with WonderRail's train selection algorithms and hostel price history."
        />
        <Highlight
          size={4}
          top={
            <Image
              src={threedImage}
              alt="3D view"
              className="rounded mx-auto w-full max-w-xl max-h-64"
              style={{ objectFit: "contain" }}
            />
          }
          title="Your Travel, Visualized"
          description="WonderRail's interactive map allows you to easily plan your Interrail tour. With intelligent suggestions based on your preferences, charting your course through Europe has never been easier."
        />

        <Highlight
          size={4}
          top={
            <Image
              src={notCoveredImage}
              alt="not covered alert"
              className="rounded mx-auto w-full max-w-xl max-h-64"
              style={{ objectFit: "contain" }}
            />
          }
          title="Stay within your Interrail limits"
          description="WonderRail keeps track of your Interrail pass limits, so you don't have to. Get notified when you are about to exceed your travel days or plan to travel outside of your Interrail zone."
        />

        <Highlight
          size={4}
          top={
            <Image
              src={itineraryImage}
              alt="itinerary"
              className="rounded mx-auto w-full max-w-xl max-h-64"
              style={{ objectFit: "contain" }}
            />
          }
          title="Open Source"
          description="WonderRail is open source, meaning that you can contribute to the project and help us improve the Interrail experience for everyone. Check out our GitHub repository to get started."
        />
      </div>
    </div>
  );
}

export default Highlights;
