import Image from "next/image";
import React from "react";

import anlyticsImage from "@assets/images/screenshots/analytics.png";
import rankImage from "@assets/images/screenshots/rank.png";
import receiptImage from "@assets/images/screenshots/receipt.png";
import linePattern from "@assets/images/line-pattern.png";

function Introduction() {
  return (
    <section className="py-12 bg-white sm:py-16 lg:py-20 rounded-lg">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="max-w-4xl px-4 mx-auto text-center sm:px-0">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">
            Discover NeonFin&apos;s Edge
          </h2>
        </div>
        <div className="relative max-w-md mx-auto mt-12 md:max-w-none md:mt-20">
          <div className="absolute inset-x-0 hidden top-36 xl:block">
            <Image
              className="object-contain w-full h-auto max-w-xl mx-auto"
              src={linePattern}
              alt=""
              aria-hidden
            />
          </div>
          <div className="grid grid-cols-1 text-center md:text-left md:grid-cols-3 md:gap-x-16 gap-y-12 xl:gap-x-32">
            <div className="flex flex-col justify-between">
              <div className="relative flex-shrink-0 mx-8 md:mx-0">
                <div className="absolute -inset-1">
                  <div
                    className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
                    style={{
                      background:
                        "linear-gradient(90deg, #44FF9A -0.55%, #44B0FF 22.86%, #8B44FF 48.36%, #FF6644 73.33%, #EBFF70 99.34%)",
                    }}
                  />
                </div>
                <Image
                  className="relative w-full h-auto mx-auto filter drop-shadow-lg rounded-lg"
                  src={anlyticsImage}
                  alt="Analytics screenshot"
                />
              </div>
              <div className="mt-6 md:mt-10">
                <h3 className="text-xl font-bold text-gray-900 font-pj">
                  Advanced Statistics
                </h3>
                <p className="mt-4 text-base font-normal leading-7 text-gray-600">
                  What are your spending habits? How have prices changed? Get a
                  detailed breakdown of your spending by category, time period,
                  and more.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="relative flex-shrink-0 mx-8 md:mx-0">
                <div className="absolute -inset-1">
                  <div
                    className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
                    style={{
                      background:
                        "linear-gradient(90deg, #44FF9A -0.55%, #44B0FF 22.86%, #8B44FF 48.36%, #FF6644 73.33%, #EBFF70 99.34%)",
                    }}
                  />
                </div>
                <Image
                  className="relative w-full h-auto mx-auto filter drop-shadow-lg rounded-lg"
                  src={rankImage}
                  alt="Rank system screenshot"
                />
              </div>
              <div className="mt-6 md:mt-10">
                <h3 className="text-xl font-bold text-gray-900 font-pj">
                  Point and Rank System
                </h3>
                <p className="mt-4 text-base font-normal leading-7 text-gray-600">
                  Motivate yourself to stick to your budget and reach your
                  financial goals by earning points and climbing the ranks.
                </p>
              </div>
            </div>
            <div className="flex flex-col justify-between">
              <div className="relative flex-shrink-0 mx-8 md:mx-0">
                <div className="absolute -inset-1">
                  <div
                    className="w-full h-full mx-auto rotate-180 opacity-20 blur-lg filter"
                    style={{
                      background:
                        "linear-gradient(90deg, #44FF9A -0.55%, #44B0FF 22.86%, #8B44FF 48.36%, #FF6644 73.33%, #EBFF70 99.34%)",
                    }}
                  />
                </div>
                <Image
                  className="relative w-full h-auto mx-auto filter drop-shadow-lg rounded-lg"
                  src={receiptImage}
                  alt="Receipt scanner"
                />
              </div>
              <div className="mt-6 md:mt-10">
                <h3 className="text-xl font-bold text-gray-900 font-pj">
                  Ease of Use
                </h3>
                <p className="mt-4 text-base font-normal leading-7 text-gray-600">
                  A simple, user-friendly interface that makes budgeting a
                  breeze. neonFin can scan and analyze your receipts using AI
                  and automatically add your purchases. Quickly add other items
                  by scanning barcodes with your phone&apos;s camera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Introduction;
