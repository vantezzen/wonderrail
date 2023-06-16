import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const InterrailStationInfoSchema = z.object({
  station: z.string(),
  id: z.string(),
  country: z.string(),
});

const InterrailTransportInfoSchema = z.object({
  type: z.string(),
  code: z.string(),
});

const InterrailPricesInfoSchema = z.object({
  type: z.enum(["FIRST_CLASS", "SECOND_CLASS"]),
  amount: z.number(),
});

const InterrailBookingInformationSchema = z.object({
  advanceBookingDuration: z.string(),
  scheduleServiceDays: z.string(),
  carrierUrl: z.string(),
  extraTextWeb: z.string(),
  bookViaEmail: z.string(),
  bookViaPhone: z.string(),
  linkToBook1: z.string(),
  linkToBook2: z.string(),
  linkToCarrierTimetable: z.string(),
  warningLabels: z.array(z.string()),
  websiteBookingAvailable: z.boolean(),
});

const InterrailDurationSchema = z.object({
  hours: z.number(),
  minutes: z.number(),
});

const InterrailTimetableLegSchema = z.object({
  start: InterrailStationInfoSchema,
  end: InterrailStationInfoSchema,
  transport: InterrailTransportInfoSchema,
  facilities: z.array(z.string()),
  prices: z.array(InterrailPricesInfoSchema),
  id: z.string(),
  bookingInformation: InterrailBookingInformationSchema,
  type: z.literal("TRAIN_TRAVEL"),
  status: z.enum(["REQUIRED", "NOT_REQUIRED", "OUTDATED", "INVALID"]),
  duration: InterrailDurationSchema,
  trainType: z.string(),
  reservationAttributes: z.array(z.string()),
  supplementRequired: z.boolean(),
});

const InterrailTimetableEntrySchema = z.object({
  id: z.string(),
  price: z.number(),
  status: z.enum(["REQUIRED", "NOT_REQUIRED"]),
  duration: InterrailDurationSchema,
  legs: z.array(InterrailTimetableLegSchema),
  departure: z.string(),
  arrival: z.string(),
});

export const CoordinateSchema = z.object({
  lat: z.number(),
  lng: z.number(),
});

export const JourneyTimerangeSchema = z.object({
  start: z.date(),
  end: z.date(),
});

export const InterrailLocationSchema = z.object({
  id: z.string(),
  name: z.string(),
  coordinates: CoordinateSchema,
  interrailId: z.string(),
});

export const JourneyStaySchema = z.object({
  type: z.literal("stay"),
  id: z.string(),
  location: InterrailLocationSchema,
  timerange: JourneyTimerangeSchema,
});

export const InterrailLineSchema = z.object({
  id: z.string(),
  from: CoordinateSchema,
  to: CoordinateSchema,
  duration: z.string(),
});

export const JourneyRideSchema = z.object({
  type: z.literal("ride"),
  id: z.string(),
  name: z.string(),
  start: CoordinateSchema,
  end: CoordinateSchema,
  timerange: JourneyTimerangeSchema,
  needsReservation: z.boolean(),
  details: InterrailTimetableEntrySchema.optional(),
  price: z.number(),
  changes: z.number(),
});

export const InvalidRideSchema = z.object({
  type: z.literal("invalid"),
  id: z.string(),
  name: z.string(),
  start: CoordinateSchema,
  end: CoordinateSchema,
});

export const JourneyStepSchema = z.union([
  JourneyStaySchema,
  JourneyRideSchema,
  InvalidRideSchema,
]);

export const JourneySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  steps: z.array(JourneyStepSchema),
  startDate: z.date(),
  preferredDepartureTime: z.number(), // 0-24
});

export const EXAMPLE_JOURNEY: Journey = {
  id: uuidv4(),
  name: "My Journey",
  description: "This is my journey",
  startDate: new Date(),
  preferredDepartureTime: 10,
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

export type InterrailTimetableLeg = z.infer<typeof InterrailTimetableLegSchema>;
export type InterrailTimetableEntry = z.infer<
  typeof InterrailTimetableEntrySchema
>;
export type Coordinate = z.infer<typeof CoordinateSchema>;
export type JourneyTimerange = z.infer<typeof JourneyTimerangeSchema>;
export type InterrailLocation = z.infer<typeof InterrailLocationSchema>;
export type JourneyStay = z.infer<typeof JourneyStaySchema>;
export type InterrailLine = z.infer<typeof InterrailLineSchema>;
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
