import Planner from "../Planner";

export default abstract class Migration {
  abstract name: string;
  abstract hasToRun(planner: Planner): Promise<boolean>;
  abstract run(planner: Planner): Promise<void>;
}
