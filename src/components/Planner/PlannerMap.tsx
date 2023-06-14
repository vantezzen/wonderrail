"use client";
import React from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl";
import maplibregl from "maplibre-gl";
import { Journey, JourneyLocation, JourneyRide } from "@/lib/types";
import DeckGL from "@deck.gl/react/typed";
import { ArcLayer, PathLayer } from "@deck.gl/layers/typed";
import { HexagonLayer } from "@deck.gl/aggregation-layers/typed";
import Planner, { GeoCity } from "@/lib/Journey/Planner";
import { journeyLocationToGeoCity } from "@/lib/utils/planner";
import { getDistanceFromLatLonInKm } from "@/lib/utils/coordinates";

function PlannerMap({ planner }: { planner: Planner }) {
  // Lines should be drawn between each step
  const lines = [];
  const rides = planner.journey.steps.filter(
    (step) => step.type === "ride"
  ) as JourneyRide[];

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
    });
  }

  const startingLocation =
    (planner.journey.steps[0] as JourneyLocation).location ||
    (planner.journey.steps[0] as JourneyRide).start;

  const lastLocation = planner.journey.steps[
    planner.journey.steps.length - 1
  ] as JourneyLocation;

  const [selectedLocation, setSelectedLocation] =
    React.useState<GeoCity | null>(
      lastLocation ? journeyLocationToGeoCity(lastLocation) : null
    );
  const [isHoveringCity, setIsHoveringCity] = React.useState(false);

  return (
    <div className="min-h-screen w-full relative">
      <DeckGL
        initialViewState={{
          latitude: startingLocation.lat || 48,
          longitude: startingLocation.lng || 2,
          zoom: 4,
          pitch: 30,
        }}
        controller
        style={{ width: "100%", height: "100vh" }}
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
            getSourceColor: (d) => [230, 230, 230],
            getTargetColor: (d) => [230, 230, 230],
          }),

          // All rides
          new ArcLayer({
            id: "rides",
            data: planner.getRides(selectedLocation),
            pickable: false,
            getWidth: 2,
            getHeight: 0.1,
            getSourcePosition: (d) => [
              d.coordinates[0].lng,
              d.coordinates[0].lat,
            ],
            getTargetPosition: (d) => [
              d.coordinates[1].lng,
              d.coordinates[1].lat,
            ],
            getSourceColor: (d) => [100, 100, 100],
            getTargetColor: (d) => [100, 100, 100],
          }),

          // Locations
          new HexagonLayer({
            id: "journey-locations",
            data: planner.getLocations(),
            pickable: true,
            extruded: true,
            radius: 20000,
            elevationScale: 1,
            getPosition: (d) => [d.location.lng, d.location.lat],
            getColorWeight: (d) => {
              if (
                selectedLocation?.location &&
                getDistanceFromLatLonInKm(
                  d.location,
                  selectedLocation.location
                ) < 50
              )
                return 1;
              if (
                getDistanceFromLatLonInKm(d.location, lastLocation.location) <
                50
              )
                return 2;
              return 0;
            },
            colorRange: [
              [255, 0, 0],
              [255, 255, 255],
              [0, 0, 255],
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
        onClick={({ object }) => {
          if (!object) {
            setSelectedLocation(null);
            return;
          }
          if (object.points) {
            const location = object.points[0].source;
            if (
              selectedLocation &&
              getDistanceFromLatLonInKm(
                selectedLocation.location,
                lastLocation.location
              ) < 50
            ) {
              try {
                planner.addLocation(location);
              } catch (e) {
                console.log(e);
              }
            }
            setSelectedLocation(location);
          }
        }}
      >
        <Map
          mapLib={maplibregl}
          mapStyle="https://api.maptiler.com/maps/dataviz-dark/style.json?key=eIgS48TpQ70m77qKYrsx"
        />
      </DeckGL>
    </div>
  );
}

export default PlannerMap;
