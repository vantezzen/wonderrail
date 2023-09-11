import InputDescription from "@/components/Various/InputDescription";
import { AlertTitle } from "@/components/ui/alert";
import { TodoItem, TodoItemType } from "@/lib/Journey/Todo";
import { JourneyRide, JourneyStay } from "@/lib/types";
import { cn } from "@/lib/utils";
import React from "react";

function TodoDetails({ todo }: { todo: TodoItem }) {
  let title = <></>;

  if (todo.type === TodoItemType.RESERVE_ACCOMMODATION) {
    const stay = todo.step as JourneyStay;
    title = <>Reserve an accommodation for {stay.locationName}.</>;
  }
  if (todo.type === TodoItemType.RESERVE_TRAIN) {
    const ride = todo.step as JourneyRide;
    title = <>Reserve your train for {ride.name}.</>;
  }
  return (
    <div className={cn(todo.isDone ? "opacity-50" : "", "duration-100")}>
      <AlertTitle className="font-medium dark:text-zinc-200 text-zinc-900 leading-relaxed">
        {title}
      </AlertTitle>
      <InputDescription>
        Until {todo.untilDate?.toLocaleDateString()}
      </InputDescription>
    </div>
  );
}

export default TodoDetails;
