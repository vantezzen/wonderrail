import React from "react";
import usePlannerStore from "../../plannerStore";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert } from "@/components/ui/alert";
import { CheckSquare, Square } from "lucide-react";
import TodoDetails from "./TodoDetails";
import { ScrollArea } from "@/components/ui/scroll-area";

function TodoList() {
  const show = usePlannerStore((state) => state.view.showTodoList);
  const updateView = usePlannerStore((state) => state.setView);
  const setShow = (showCalendar: boolean) => {
    updateView("showTodoList", showCalendar);
  };

  const planner = usePlannerStore((store) => store.planner);

  return (
    <Dialog open={show} onOpenChange={setShow}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Todo List</DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-[500px]">
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
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

export default TodoList;
