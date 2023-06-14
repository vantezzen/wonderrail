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
    {
      type: "location",
      id: uuidv4(),
      name: "Berlin",
      location: {
        lat: 52.520008,
        lng: 13.404954,
      },
      timerange: {
        start: new Date("2021-01-01T00:00:00.000Z"),
        end: new Date("2021-01-02T00:00:00.000Z"),
      },
    },
    {
      type: "ride",
      id: uuidv4(),
      name: "Berlin -> Paris",
      start: {
        lat: 52.520008,
        lng: 13.404954,
      },
      end: {
        lat: 48.864716,
        lng: 2.349014,
      },
      timerange: {
        start: new Date("2021-01-02T00:00:00.000Z"),
        end: new Date("2021-01-02T07:00:00.000Z"),
      },
    },
    {
      type: "location",
      id: uuidv4(),
      name: "Paris",
      location: {
        lat: 48.864716,
        lng: 2.349014,
      },
      timerange: {
        start: new Date("2021-01-02T00:00:00.000Z"),
        end: new Date("2021-01-06T00:00:00.000Z"),
      },
    },
  ],
};

export type Coordinate = z.infer<typeof CoordinateSchema>;
export type JourneyTimerange = z.infer<typeof JourneyTimerangeSchema>;
export type JourneyLocation = z.infer<typeof JourneyLocationSchema>;
export type JourneyRide = z.infer<typeof JourneyRideSchema>;
export type JourneyStep = z.infer<typeof JourneyStepSchema>;
export type Journey = z.infer<typeof JourneySchema>;
