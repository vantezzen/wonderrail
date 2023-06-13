"use client";
import React from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import Map from "react-map-gl";
import maplibregl from "maplibre-gl";

function PlannerMap() {
  return (
    <div className="min-h-screen w-full">
      <Map
        mapLib={maplibregl}
        initialViewState={{
          latitude: 37.8,
          longitude: -122.4,
          zoom: 14,
        }}
        style={{ width: "100%", height: "100vh" }}
        mapStyle="https://api.maptiler.com/maps/basic-v2/style.json?key=eIgS48TpQ70m77qKYrsx"
      />
    </div>
  );
}

export default PlannerMap;
