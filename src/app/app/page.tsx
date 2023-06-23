"use client";
import Delete from "@/components/Dashboard/JourneyActions/Delete";
import Share from "@/components/Dashboard/JourneyActions/Share";
import Profile from "@/components/Dashboard/Profile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthState } from "@/lib/firebase/FirebaseConnectionStore";
import useJourneys from "@/lib/hooks/useJourneys";
import { Journey } from "@/lib/types";
import { ChevronRight, Dot, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import logoImage from "@/assets/logo.png";

function AppPage() {
  const [user] = useAuthState();
  const { journeys, isLoading } = useJourneys();

  return (
    <div className="p-6 md:p-12">
      <div className="flex gap-3 items-center mb-6">
        <div>
          <Image
            src={logoImage}
            alt="WonderRail logo"
            width={100}
            height={100}
          />
        </div>
        <Dot size={16} />
        <h1 className="font-bold">Dashboard</h1>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex justify-between gap-4 items-center">
              <CardTitle>Your journeys</CardTitle>
              <Link href="/journeys/new">
                <Button>
                  <Plus size={16} className="mr-3" />
                  Create new journey
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            {journeys?.size === 0 && !isLoading && (
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium">No journeys yet</h3>
                <p className="text-zinc-500 font-medium">
                  Add your first journey by clicking the button above
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4">
              {journeys?.docs.map((journeyItem) => {
                const journey = JSON.parse(
                  journeyItem.data().journey
                ) as Journey;

                return (
                  <div key={journeyItem.id} className="flex gap-4 items-center">
                    <Link
                      href={`/journeys/${user?.uid}/${journeyItem.id}`}
                      key={journey.id}
                      className="w-full"
                    >
                      <button className="rounded bg-zinc-900 hover:bg-zinc-800 p-4 w-full text-left duration-100 flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold">{journey.name}</h3>

                          <p className="text-zinc-500 font-medium mt-1 text-sm">
                            {journey.description}
                          </p>

                          <div className="flex gap-1 items-center text-zinc-500 text-xs mt-2">
                            <span>
                              {
                                journey.steps.filter(
                                  (step) => step.type === "stay"
                                ).length
                              }{" "}
                              stops
                            </span>

                            <Dot size={12} className="text-zinc-500" />

                            <span>
                              Starting{" "}
                              {new Date(
                                journey.startDate as unknown as string
                              ).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="text-zinc-500" />
                      </button>
                    </Link>

                    <div className="flex flex-col gap-2">
                      <Share
                        journeyId={journeyItem.id}
                        userId={user?.uid!}
                        isPublic={journey.isPublic}
                      />
                      <Delete journeyId={journeyItem.id} userId={user?.uid!} />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Profile />
      </div>
    </div>
  );
}

export default AppPage;
