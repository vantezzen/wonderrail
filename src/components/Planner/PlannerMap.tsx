"use client";
import React, { useEffect } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl";
import maplibregl from "maplibre-gl";
import {
  InterrailLocation,
  InvalidRide,
  JourneyRide,
  JourneyStay,
} from "@/lib/types";
import DeckGL from "@deck.gl/react/typed";
import { ArcLayer } from "@deck.gl/layers/typed";
import { HexagonLayer } from "@deck.gl/aggregation-layers/typed";
import { getDistanceFromLatLonInKm } from "@/lib/utils/coordinates";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import usePlannerStore from "./plannerStore";

function PlannerMap() {
  const planner = usePlannerStore((state) => state.planner);
  const showPopularCities = usePlannerStore(
    (state) => state.view.showPopularCities
  );

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

  const colorOpacity = showPopularCities ? 100 : 0;
  return (
    <div className="w-full relative h-[80vh] lg:h-[calc(100vh-4rem)]">
      <DeckGL
        viewState={viewState}
        onViewStateChange={({ viewState }) => {
          setViewState(viewState);
        }}
        controller
        style={{
          width: "100%",
          height: "100%",
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
              d.isInvalid ? [230, 100, 100] : [230, 230, 230],
            getTargetColor: (d) =>
              d.isInvalid ? [230, 100, 100] : [230, 230, 230],
          }),

          // All rides
          new ArcLayer({
            id: "rides",
            data: planner.getRides(selectedLocation),
            pickable: false,
            getWidth: 2,
            getHeight: 0.1,
            getSourcePosition: (d) => [d.from.lng, d.from.lat],
            getTargetPosition: (d) => [d.to.lng, d.to.lat],
            getSourceColor: (d) => [100, 100, 100],
            getTargetColor: (d) => [100, 100, 100],
          }),

          // Locations
          new HexagonLayer({
            id: "journey-locations",
            data: planner.getCities(),
            pickable: true,
            extruded: true,
            radius: 20000,
            elevationScale: 1,
            getPosition: (d: InterrailLocation) => [
              d.coordinates.lng,
              d.coordinates.lat,
            ],
            getColorWeight: (d: InterrailLocation) => {
              if (
                selectedLocation?.coordinates &&
                getDistanceFromLatLonInKm(
                  d.coordinates,
                  selectedLocation.coordinates
                ) < 50
              )
                return 1;
              if (
                lastStay &&
                getDistanceFromLatLonInKm(
                  d.coordinates,
                  lastStay.location.coordinates
                ) < 50
              )
                return 2;
              return 0;
            },
            colorRange: [
              [255, 165, 105, colorOpacity],
              [255, 255, 255, colorOpacity],
              [0, 0, 255, colorOpacity],
            ],
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
          mapLib={maplibregl}
          mapStyle={`https://api.maptiler.com/maps/dataviz-dark/style.json?key=${process.env.NEXT_PUBLIC_MAPTILER_KEY}`}
        />
      </DeckGL>
    </div>
  );
}

export default PlannerMap;
