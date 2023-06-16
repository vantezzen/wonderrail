"use client";
import AuthenticatedRoute from "@/components/Layout/AuthenticatedRoute";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthState } from "@/lib/firebase/FirebaseConnectionStore";
import useJourneys from "@/lib/hooks/useJourneys";
import { Journey } from "@/lib/types";
import { Dot } from "lucide-react";
import Link from "next/link";
import React from "react";

function AppPage() {
  const [user] = useAuthState();
  const { journeys, isLoading } = useJourneys();

  return (
    <div className="p-6 md:p-12">
      <div className="grid grid-cols-3 gap-12">
        <Card className="col-span-2">
          <CardHeader>
            <div className="flex justify-between gap-4 items-center">
              <CardTitle>Your journeys</CardTitle>
              <Link href="/journeys/new">
                <Button>Create new journey</Button>
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

            {journeys?.docs.map((journeyItem) => {
              const journey = JSON.parse(journeyItem.data().journey) as Journey;

              return (
                <Link href={`/journeys/${user?.uid}/${journeyItem.id}`}>
                  <button className="rounded bg-zinc-800 hover:bg-zinc-900 p-6 w-full text-left duration-100">
                    <h3 className="text-lg font-bold">{journey.name}</h3>

                    <p className="text-zinc-500 font-medium mt-2">
                      {journey.description}
                    </p>

                    <div className="flex gap-1 items-center text-zinc-500 text-sm mt-2">
                      <span>
                        {
                          journey.steps.filter((step) => step.type === "stay")
                            .length
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
                  </button>
                </Link>
              );
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>My profile</CardTitle>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

export default AppPage;
