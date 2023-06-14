import { Coordinate } from "../types";

export function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}

export function getDistanceFromLatLonInKm(
  coordinates1: Coordinate,
  coordinates2: Coordinate
) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(coordinates2.lat - coordinates1.lat); // deg2rad below
  const dLon = deg2rad(coordinates2.lng - coordinates1.lng);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(coordinates1.lat)) *
      Math.cos(deg2rad(coordinates2.lat)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
}

export function arrayCoordinateToJourneyCoordinate(
  coordinates: [number, number]
): Coordinate {
  return {
    lat: coordinates[1],
    lng: coordinates[0],
  };
}
