import Planner from "./Planner";

export type Message = any[];

export default class Logging {
  entries: Message[] = [];

  constructor(public planner: Planner) {}

  log(message: Message | string) {
    this.entries.push([`[${new Date().toISOString()}]`, message]);
    this.planner.emit("change");
  }
}
