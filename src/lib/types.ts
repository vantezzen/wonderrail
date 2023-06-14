import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

export const CoordinateSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const JourneyTimerangeSchema = z.object({
  start: z.date(),
  end: z.date(),
});

export const JourneyLocationSchema = z.object({
  type: z.literal("location"),
  id: z.string(),
  name: z.string(),
  location: CoordinateSchema,
  timerange: JourneyTimerangeSchema,
});

export const JourneyRideSchema = z.object({
  type: z.literal("ride"),
  id: z.string(),
  name: z.string(),
  start: CoordinateSchema,
  end: CoordinateSchema,
  timerange: JourneyTimerangeSchema,
});

export const InvalidRideSchema = z.object({
  type: z.literal("invalid"),
  id: z.string(),
  name: z.string(),
  start: CoordinateSchema,
  end: CoordinateSchema,
});

export const JourneyStepSchema = z.union([
  JourneyLocationSchema,
  JourneyRideSchema,
  InvalidRideSchema,
]);

export const JourneySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  steps: z.array(JourneyStepSchema),
});

export const EXAMPLE_JOURNEY: Journey = {
  id: uuidv4(),
  name: "My Journey",
  description: "This is my journey",
  steps: [
    // {
    //   type: "location",
    //   id: uuidv4(),
    //   name: "Paris",
    //   location: {
    //     lat: 2.355006,
    //     lng: 48.87993,
    //   },
    //   timerange: {
    //     start: new Date("2021-01-01T00:00:00.000Z"),
    //     end: new Date("2021-01-02T00:00:00.000Z"),
    //   },
    // },
  ],
};

export type Coordinate = z.infer<typeof CoordinateSchema>;
export type JourneyTimerange = z.infer<typeof JourneyTimerangeSchema>;
export type JourneyLocation = z.infer<typeof JourneyLocationSchema>;
export type JourneyRide = z.infer<typeof JourneyRideSchema>;
export type JourneyStep = z.infer<typeof JourneyStepSchema>;
export type Journey = z.infer<typeof JourneySchema>;
export type InvalidRide = z.infer<typeof InvalidRideSchema>;

export type GeoPoint = {
  geometry: {
    coordinates: [number, number];
  };
  properties: {
    name: string;
  };
};

export type GeoCity = {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
  };
};

export type GeoConnection = {
  id: string;
  name: string;
  duration: string;
  coordinates: [[number, number], [number, number]];
};
