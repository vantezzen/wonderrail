import { AiRequest, AiResponse } from "../types";
import Planner from "./Planner";

export default class JourneyAi {
  public itinerary: AiResponse | null = null;

  constructor(public planner: Planner) {}

  async generateItinerary(request: AiRequest) {
    const response = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const itinerary = (await response.json()) as AiResponse;
    this.itinerary = itinerary;
  }

  async acceptItinerary() {
    if (!this.itinerary) {
      throw new Error("No itinerary generated");
    }

    for (const location of this.itinerary) {
      await this.planner.addLocation(location.station, {
        start: new Date(location.startDate),
        end: new Date(location.endDate),
      });
    }
  }
}
