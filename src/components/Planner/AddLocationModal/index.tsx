import React, { useEffect } from "react";
import {
  CommandDialog,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../../ui/command";
import { Button } from "../../ui/button";
import { Loader2, Plus } from "lucide-react";
import { InterrailLocation } from "@/lib/types";
import { useDebounce } from "use-debounce";
import usePlannerStore from "../plannerStore";
import CategoriesSelector from "./CategoriesSelector";
import { trackEvent } from "@/lib/analytics";

function AddLocationModal() {
  const planner = usePlannerStore((state) => state.planner);
  const isOpen = usePlannerStore((state) => state.popups.addLocation);
  const updatePopupState = usePlannerStore((state) => state.setPopupState);
  const setIsOpen = (open: boolean) => updatePopupState("addLocation", open);

  const beforeLocation = usePlannerStore((state) => state.addLocationBefore);
  const setBeforeLocation = usePlannerStore(
    (state) => state.setAddLocationBefore
  );

  const [isLoadingLocations, setIsLoadingLocations] = React.useState(false);
  const [interrailLocations, setInterrailLocations] = React.useState<
    InterrailLocation[]
  >([]);
  const [searchRaw, setSearch] = React.useState("");
  const [search] = useDebounce(searchRaw, 1000);

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
      <div className="relative mt-6">
        <Button
          onClick={() => {
            setIsOpen(true);
            trackEvent("add_location_modal_button_click");
          }}
          variant="secondary"
          className="w-full relative z-10"
        >
          <Plus size={16} className="mr-2" />
          Add location
        </Button>

        {planner.journey.steps.length === 0 && (
          <span className="animate-ping-sm absolute inline-flex h-full w-full inset-0 rounded-lg bg-orange-200 opacity-75"></span>
        )}
      </div>

      <CommandDialog
        open={isOpen}
        onOpenChange={(open) => {
          setIsOpen(open);
          setBeforeLocation(null);
        }}
      >
        {planner.journey.steps.length === 0 && (
          <div className="p-5 text-center">
            <h3 className="text-xl font-medium">Welcome to WonderRail!</h3>
            <p className="text-zinc-500 font-medium">
              Start by adding the location you want to start from
            </p>
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
        {searchRaw.length === 0 && <CategoriesSelector />}

        <CommandList>
          {interrailLocations.length > 0 && searchRaw.length > 0 && (
            <CommandGroup heading="Search results">
              {interrailLocations.map((station) => (
                <CommandItem
                  key={station.id}
                  onSelect={() => {
                    planner.addLocation(station, undefined, beforeLocation);
                    setIsOpen(false);
                  }}
                  className="cursor-pointer"
                >
                  {station.name}
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
}

export default AddLocationModal;
