import { JourneyStay } from "@/lib/types";
import Migration from "./Migration";
import Planner from "../Planner";

export default class CountryCodeMigration extends Migration {
  name = "CountryCodeMigration";

  async hasToRun(planner: Planner) {
    if (planner.journey.steps.length === 0) return false;
    return (
      planner.journey.steps.filter(
        (step) => step.type === "stay"
      ) as JourneyStay[]
    ).some((stay) => !stay.countryCode);
  }

  async run(planner: Planner) {
    const stays = planner.journey.steps.filter(
      (step) => step.type === "stay"
    ) as JourneyStay[];

    for (const stay of stays) {
      const city = await planner.api.getCityInfo(
        stay.locationName ?? stay.location.name
      );
      stay.countryCode = city.countryCode;
      stay.locationName = city.name;
    }
  }
}
