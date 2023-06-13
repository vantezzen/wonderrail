import { z } from "zod";

export const JourneyStepSchema = z.object({
  id: z.string(),
  name: z.string(),
  location: z.string(),
});

export const JourneySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().optional(),
  steps: z.array(JourneyStepSchema),
});

export type JourneyStep = z.infer<typeof JourneyStepSchema>;
export type Journey = z.infer<typeof JourneySchema>;
