import Image from "next/image";
import React from "react";

function Feature({
  title,
  text,
  reversedOrder,
  image,
}: {
  title: React.ReactNode;
  text: React.ReactNode;
  reversedOrder?: boolean;
  image: any;
}) {
  return (
    <section className="py-12 sm:py-16 lg:py-24">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:items-center gap-y-8 md:grid-cols-2 md:gap-x-16">
          <div>
            <Image
              className="w-full max-w-lg max-h-[400px] mx-auto object-contain rounded-lg"
              src={image}
              alt=""
            />
          </div>
          <div
            className={`lg:pr-12`}
            style={{
              gridRow: reversedOrder ? 1 : undefined,
            }}
          >
            <h2 className="text-3xl font-bold text-zinc-100 sm:text-4xl xl:text-5xl font-pj">
              {title}
            </h2>
            <p className="mt-5 text-lg font-medium text-zinc-100 sm:mt-8 font-pj">
              {text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Feature;
