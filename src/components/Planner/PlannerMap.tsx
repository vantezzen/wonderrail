"use client";
import React, { useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { Map, MapLib } from "react-map-gl";
import maplibregl from "maplibre-gl";
import {
  InterrailLocation,
  InvalidRide,
  JourneyRide,
  JourneyStay,
} from "@/lib/types";
import DeckGL from "@deck.gl/react/typed";
import { ArcLayer, IconLayer } from "@deck.gl/layers/typed";
import { getDistanceFromLatLonInKm } from "@/lib/utils/coordinates";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import usePlannerStore from "./plannerStore";
import { hexToRgbColor } from "@/lib/utils/string";

const ICON_MAPPING = {
  marker: {
    x: 0,
    y: 0,
    width: 128,
    height: 128,
    mask: true,
    anchorY: 128,
    anchorX: 64,
  },
  danger: {
    x: 128,
    y: 0,
    width: 128,
    height: 128,
    mask: false,
    anchorY: 128,
    anchorX: 64,
  },
};

function PlannerMap() {
  const planner = usePlannerStore((state) => state.planner);

  // Lines should be drawn between each step
  const lines = [];
  const rides = planner.journey.steps.filter(
    (step) => step.type === "ride" || step.type === "invalid"
  ) as (JourneyRide | InvalidRide)[];

  for (const ride of rides) {
    lines.push({
      from: {
        name: ride.name,
        coordinates: [ride.start.lng, ride.start.lat],
      },
      to: {
        name: ride.name,
        coordinates: [ride.end.lng, ride.end.lat],
      },
      isInvalid: ride.type === "invalid",
    });
  }

  const stays = (
    planner.journey.steps.filter(
      (step) => step.type === "stay"
    ) as JourneyStay[]
  ).map((stay, index) => ({
    coordinates: [stay.location.coordinates.lng, stay.location.coordinates.lat],
    index,
    stay,
  }));

  const isReadOnly = useIsReadOnly();

  const firstStay = (planner.journey.steps[0] as JourneyStay)?.location || {
    lat: 48,
    lng: 2,
  };
  const lastStay = planner.journey.steps[
    planner.journey.steps.length - 1
  ] as JourneyStay;

  const [selectedLocation, setSelectedLocation] =
    React.useState<InterrailLocation | null>(null);
  useEffect(() => {
    if (!lastStay) return;
    setSelectedLocation(lastStay.location);
  }, [lastStay]);
  const [isHoveringCity, setIsHoveringCity] = React.useState(false);

  const [viewState, setViewState] = React.useState<Record<string, any>>({
    latitude: firstStay?.coordinates?.lat || 48,
    longitude: firstStay?.coordinates?.lng || 2,
    zoom: 2,
    pitch: 50,
  });
  useEffect(() => {
    setTimeout(() => {
      setViewState({
        latitude: firstStay?.coordinates?.lat || 48,
        longitude: firstStay?.coordinates?.lng || 2,
        zoom: 4,
        pitch: 30,
        transitionDuration: 2000,
        transitionEasing: (t: number) =>
          // https://easings.net/#easeInOutCubic
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    }, 1000);
  }, []);

  const lineColor: [number, number, number] = [50, 50, 50];

  return (
    <div className="p-3 rounded-lg">
      <div className="w-full relative h-[90vh]">
        <DeckGL
          viewState={viewState}
          onViewStateChange={({ viewState }) => {
            setViewState(viewState);
          }}
          controller
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "1rem",
          }}
          layers={[
            // Chosen rides
            new ArcLayer({
              id: "journey-lines",
              data: lines,
              pickable: false,
              getWidth: 6,
              getHeight: 0.5,
              getSourcePosition: (d) => d.from.coordinates,
              getTargetPosition: (d) => d.to.coordinates,
              getSourceColor: (d) =>
                d.isInvalid ? [230, 100, 100] : lineColor,
              getTargetColor: (d) =>
                d.isInvalid ? [230, 100, 100] : lineColor,
            }),

            // Markers
            new IconLayer({
              id: "marker-layer",
              data: stays,
              iconAtlas: "/assets/markers.png",
              iconMapping: ICON_MAPPING,
              getIcon: () => "marker",

              sizeScale: 15,
              getPosition: (d) => d.coordinates,
              getSize: (d) => 2,
              getColor: (d) => {
                const color = planner.getStepColor(d.stay);
                return hexToRgbColor(color);
              },
            }),
          ]}
          getTooltip={({ object }) => {
            if (!object) return;

            if (object.from) {
              return `${object.from?.name} to ${object.to?.name}`;
            }
            if (object.name && object.duration)
              return `${object.name} (${object.duration})`;
            if (object.points) return object.points[0]?.source.name;
          }}
          onHover={({ object }) => {
            if (!object) {
              setIsHoveringCity(false);
              return;
            }
            if (object.points) {
              setIsHoveringCity(true);
            }
          }}
          getCursor={({ isDragging }) => {
            if (isDragging) return "grabbing";
            if (isHoveringCity) return "pointer";
            return "grab";
          }}
          onClick={async ({ object }) => {
            if (isReadOnly) return;
            if (!object) {
              setSelectedLocation(null);
              return;
            }
            if (object.points) {
              const location = object.points[0].source as InterrailLocation;
              setSelectedLocation(location);
              if (
                selectedLocation &&
                (!lastStay ||
                  getDistanceFromLatLonInKm(
                    selectedLocation.coordinates,
                    lastStay.location.coordinates
                  ) < 50)
              ) {
                try {
                  if (!lastStay) {
                    // Add first location to allow starting the journey
                    await planner.addLocation(selectedLocation);
                  }

                  await planner.addLocation(location);
                } catch (e) {
                  console.log(e);
                }
              }
            }
          }}
        >
          <Map
            mapLib={maplibregl as MapLib<any>}
            mapStyle={`https://api.maptiler.com/maps/dataviz-light/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
          />
        </DeckGL>
      </div>
    </div>
  );
}

export default PlannerMap;
