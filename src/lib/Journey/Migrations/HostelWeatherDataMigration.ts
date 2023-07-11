import { JourneyStay } from "@/lib/types";
import Migration from "./Migration";
import Planner from "../Planner";

export default class HostelWeatherDataMigration extends Migration {
  name = "HostelWeatherDataMigration";

  async hasToRun(planner: Planner) {
    if (planner.journey.steps.length === 0) return false;
    return (
      planner.journey.steps.filter(
        (step) => step.type === "stay"
      ) as JourneyStay[]
    ).every((stay) => !stay.hostels);
  }

  async run(planner: Planner) {
    await planner.findHostels();
    await planner.getWeather();
  }
}
