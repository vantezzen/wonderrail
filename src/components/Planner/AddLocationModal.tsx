import Planner from "@/lib/Journey/Planner";
import React, { useEffect } from "react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Button } from "../ui/button";
import { Loader2, Plus } from "lucide-react";
import { InterrailStation } from "@/lib/Journey/Interrail";

function AddLocationModal({ planner }: { planner: Planner }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const [isLoadingStations, setIsLoadingStations] = React.useState(false);
  const [interrailStations, setInterrailStations] = React.useState<
    InterrailStation[]
  >([]);
  const [search, setSearch] = React.useState("");

  const locations = planner.getLocations();

  useEffect(() => {
    if (planner.journey.steps.length === 0) {
      setIsOpen(true);
    }
  }, [planner.journey.steps.length]);

  useEffect(() => {
    if (search.length < 3) return;
    setIsLoadingStations(true);
    planner.interrail
      .searchStations(search)
      .then((stations) => {
        setInterrailStations(stations);
      })
      .finally(() => {
        setIsLoadingStations(false);
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
          value={search}
          onValueChange={setSearch}
        />

        {isLoadingStations && (
          <Loader2 className="animate-spin my-6 mx-auto" size={32} />
        )}

        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          {interrailStations.length > 0 && (
            <CommandGroup heading="Search results">
              {interrailStations.map((station) => (
                <CommandItem
                  key={station.id}
                  onSelect={() => {
                    planner.addCity(station);
                    setIsOpen(false);
                  }}
                >
                  {station.station}
                </CommandItem>
              ))}
            </CommandGroup>
          )}

          <CommandGroup heading="Most popular">
            {locations.map((location) => (
              <CommandItem
                key={location.id}
                onSelect={() => {
                  planner.addCity(location);
                  setIsOpen(false);
                }}
              >
                {location.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default AddLocationModal;
