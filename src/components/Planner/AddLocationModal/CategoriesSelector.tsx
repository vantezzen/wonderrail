import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import data from "@/data/categories.json";
import { ScrollArea } from "@/components/ui/scroll-area";
import RatingPills from "./RatingPills";
import usePlannerStore from "../plannerStore";
import { trackEvent } from "@/lib/analytics";

const categories = Object.keys(data);

function CategoriesSelector() {
  const updatePopupState = usePlannerStore((state) => state.setPopupState);
  const setIsOpen = (open: boolean) => updatePopupState("addLocation", open);
  const planner = usePlannerStore((state) => state.planner);

  return (
    <div className="p-4 text-zinc-400 text-sm">
      <h4 className="text-base font-medium mb-1">
        Find intersting places to visit
      </h4>
      <p className="mb-2">
        or search for any city you want using the search box above
      </p>

      <Tabs defaultValue={categories[0]}>
        <TabsList className="w-full">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="w-full">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category}>
            <ScrollArea className="h-[300px]">
              <div className="grid gap-3 pr-3">
                {data[category as keyof typeof data].map((place) => (
                  <button
                    key={place.name}
                    className="text-left cursor-pointer"
                    onClick={() => {
                      planner.addLocation({
                        id: place.interrailId,
                        name: place.name,
                        coordinates: place.coordinates,
                        interrailId: place.interrailId,
                      });
                      setIsOpen(false);
                      trackEvent("add_location_suggestions_click");
                      trackEvent(
                        `add_location_suggestions_click_${place.name}`
                      );
                    }}
                  >
                    <Card className="p-1 hover:bg-zinc-900 duration-100">
                      <CardHeader className="p-2">
                        <CardTitle className="text-base">
                          {place.name}
                        </CardTitle>
                        <CardDescription className="text-sm">
                          {place.description}
                        </CardDescription>
                        <div className="grid grid-cols-2 gap-2 gap-x-6">
                          {Object.entries(place.stats).map(([key, value]) => (
                            <RatingPills key={key} title={key} score={value} />
                          ))}
                        </div>
                      </CardHeader>
                    </Card>
                  </button>
                ))}
              </div>
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}

export default CategoriesSelector;
