import React from "react";

function Testimonials() {
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-100 font-pj">
              What Our Users Are Saying
            </h2>
            <p className="font-medium text-zinc-500">
              Don&apos;t just take our word for it, see what other users have to
              say about neonFin
            </p>
          </div>
          <div className="relative mt-8 md:mt-16 md:order-2">
            <div className="absolute -inset-1">
              <div
                className="w-full h-full max-w-full opacity-30 blur-lg filter"
                style={{
                  background:
                    "linear-gradient(90deg, #44FF9A -0.55%, #44B0FF 22.86%, #8B44FF 48.36%, #FF6644 73.33%, #EBFF70 99.34%)",
                }}
              />
            </div>
            <div className="relative grid max-w-lg grid-cols-1 overflow-hidden border border-gray-200 divide-y divide-gray-200 md:max-w-none md:grid-cols-3 rounded-xl md:divide-x md:divide-y-0">
              <div className="flex flex-col overflow-hidden">
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-9 lg:px-10">
                  <div className="my-5">
                    <blockquote>
                      <p className="text-lg text-gray-900 font-pj">
                        “This app has completely changed the way I think about
                        budgeting. It&apos;s easy to use and the point system
                        makes it fun to save money.”
                      </p>
                    </blockquote>
                    <p className="mt-8 text-lg font-bold text-gray-900 font-pj">
                      Emma Williams
                    </p>
                    <p className="mt-1 text-base text-gray-600 font-pj">CTO</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-9 lg:px-10">
                  <div className="my-5">
                    <blockquote>
                      <p className="text-lg text-gray-900 font-pj">
                        “I love the detailed statistics and the ability to scan
                        barcodes to add purchases quickly. It makes it so much
                        easier to stay on top of my budget.”
                      </p>
                    </blockquote>
                    <p className="mt-8 text-lg font-bold text-gray-900 font-pj">
                      Jacob Martinez
                    </p>
                    <p className="mt-1 text-base text-gray-600 font-pj">
                      Student
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col overflow-hidden">
                <div className="flex flex-col justify-between flex-1 p-6 bg-white lg:py-9 lg:px-10">
                  <div className="my-5">
                    <blockquote>
                      <p className="text-lg text-gray-900 font-pj">
                        “neonFin is a game-changer. I&apos;ve never been able to
                        stick to a budget until now. Thank you for creating this
                        app!”
                      </p>
                    </blockquote>
                    <p className="mt-8 text-lg font-bold text-gray-900 font-pj">
                      Wade Warren
                    </p>
                    <p className="mt-1 text-base text-gray-600 font-pj">
                      Father
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
