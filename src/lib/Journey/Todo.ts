import {
  JourneyRide,
  JourneyStay,
  JourneyStep,
  JourneyTimerange,
} from "../types";
import Planner from "./Planner";

export enum TodoItemType {
  RESERVE_ACCOMMODATION,
  RESERVE_TRAIN,
}

export type TodoItem = {
  step: JourneyStep;
  isDone: boolean;
  type: TodoItemType;
  untilDate?: Date;
  toggleDone: () => void;
};

export default class Todo {
  constructor(private planner: Planner) {}

  public getTodoItems() {
    const todos: TodoItem[] = [];
    for (const step of this.planner.journey.steps) {
      const needsTodo =
        (step.type === "ride" && step.needsReservation) || step.type === "stay";

      if (!needsTodo) continue;

      const isDone =
        (step.type === "ride" && step.isReserved) ||
        (step.type === "stay" && step.isAccommodationReserved);

      const type =
        step.type === "ride"
          ? TodoItemType.RESERVE_TRAIN
          : TodoItemType.RESERVE_ACCOMMODATION;
      const untilDate = this.calculateUntilDate(step);

      todos.push({
        step,
        isDone,
        type,
        untilDate,
        toggleDone: () => {
          this.toggleDone(step, type);
        },
      });
    }

    return todos;
  }

  private calculateUntilDate(step: JourneyStay | JourneyRide) {
    const isInBusyMonths = this.isInBusyMonths(step.timerange);
    let reserveDaysBefore = isInBusyMonths ? 20 : 1;
    return new Date(
      step.timerange.start.getTime() - reserveDaysBefore * 1000 * 60 * 60 * 24
    );
  }

  private isInBusyMonths(timerange: JourneyTimerange) {
    const busyMonths = [6, 7, 8]; // June-August
    return (
      busyMonths.includes(timerange.start.getMonth()) ||
      busyMonths.includes(timerange.end.getMonth())
    );
  }

  private toggleDone(step: JourneyStep, type: TodoItemType) {
    if (type === TodoItemType.RESERVE_TRAIN) {
      (step as JourneyRide).isReserved = !(step as JourneyRide).isReserved;
    } else if (type === TodoItemType.RESERVE_ACCOMMODATION) {
      (step as JourneyStay).isAccommodationReserved = !(step as JourneyStay)
        .isAccommodationReserved;
    }

    this.planner.emit("change");
  }
}
