import Planner from "@/lib/Journey/Planner";
import React, { useEffect } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { Hexagon, Loader2, Plus } from "lucide-react";
import { InterrailLocation } from "@/lib/types";
import { useDebounce } from "use-debounce";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

function AddLocationModal({ planner }: { planner: Planner }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [isLoadingLocations, setIsLoadingLocations] = React.useState(false);
  const [interrailLocations, setInterrailLocations] = React.useState<
    InterrailLocation[]
  >([]);
  const [searchRaw, setSearch] = React.useState("");
  const [search] = useDebounce(searchRaw, 1000);

  const locations = planner.getCities();

  useEffect(() => {
    if (planner.journey.steps.length === 0) {
      setIsOpen(true);
    }
  }, [planner.journey.steps.length]);

  useEffect(() => {
    if (search.length < 3) return;
    setIsLoadingLocations(true);
    planner.interrail
      .searchStations(search)
      .then((stations) => {
        setInterrailLocations(stations);
      })
      .finally(() => {
        setIsLoadingLocations(false);
      });
  }, [search]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        variant="ghost"
        className="w-full mt-6"
      >
        <Plus size={16} className="mr-2" />
        Add location
      </Button>

      <CommandDialog open={isOpen} onOpenChange={setIsOpen}>
        {planner.journey.steps.length === 0 && (
          <div className=" p-5">
            Welcome to WonderRail!
            <br />
            Start by adding the location you want to start from
          </div>
        )}

        <CommandInput
          placeholder="Search..."
          value={searchRaw}
          onValueChange={setSearch}
        />

        {isLoadingLocations && (
          <Loader2 className="animate-spin my-6 mx-auto" size={32} />
        )}

        <CommandList>
          {/* <CommandEmpty>No results found.</CommandEmpty> */}

          {interrailLocations.length > 0 && (
            <CommandGroup heading="Search results">
              {interrailLocations.map((station) => (
                <CommandItem
                  key={station.id}
                  onSelect={() => {
                    planner.addLocation(station);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {station.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          {/* <CommandGroup heading="Most popular">
            {locations.map((location) => (
              <CommandItem
                key={location.id}
                onSelect={() => {
                  // planner.addLocation(location);
                  setIsOpen(false);
                }}
              >
                {location.name}
              </CommandItem>
            ))}
          </CommandGroup> */}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default AddLocationModal;
