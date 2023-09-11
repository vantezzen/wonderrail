import React from "react";
import usePlannerStore from "../../plannerStore";
import { Alert } from "@/components/ui/alert";
import { CheckSquare, Square } from "lucide-react";
import TodoDetails from "./TodoDetails";
import { Card, CardContent } from "@/components/ui/card";

function TodoList() {
  const planner = usePlannerStore((store) => store.planner);

  return (
    <div className="p-3">
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <div className="grid gap-3 mr-4">
            {planner.todo.getTodoItems().map((todo) => {
              return (
                <button onClick={todo.toggleDone} key={todo.step.id}>
                  <Alert className="flex gap-3 text-left">
                    {todo.isDone ? (
                      <CheckSquare size={18} />
                    ) : (
                      <Square size={18} />
                    )}
                    <TodoDetails todo={todo} />
                  </Alert>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TodoList;
