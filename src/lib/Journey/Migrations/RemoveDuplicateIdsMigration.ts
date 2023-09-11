import Migration from "./Migration";
import Planner from "../Planner";

export default class RemoveDuplicateIdsMigration extends Migration {
  name = "RemoveDuplicateIdsMigration";

  async hasToRun(planner: Planner) {
    const steps = planner.journey.steps;

    // Find out if there are any duplicate ids
    const ids = steps.map((step) => step.id);
    const uniqueIds = [...new Set(ids)];
    const hasDuplicateIds = ids.length !== uniqueIds.length;
    return hasDuplicateIds;
  }

  async run(planner: Planner) {
    // Remove duplicate ids - only the first occurrence of each is is kept
    const steps = planner.journey.steps;
    const ids = steps.map((step) => step.id);
    const uniqueIds = [...new Set(ids)];
    const newSteps = steps.filter((step, index) => {
      return uniqueIds.indexOf(step.id) === index;
    });
    planner.journey.steps = newSteps;
  }
}
