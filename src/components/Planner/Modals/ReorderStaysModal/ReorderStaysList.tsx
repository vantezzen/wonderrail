import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import usePlannerStore from "../../plannerStore";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import ReorderableJourneyStep from "./ReorderableJourneyStep";
import { JourneyStay } from "@/lib/types";

function ReorderStaysList() {
  const planner = usePlannerStore((state) => state.planner);
  const isReadOnly = useIsReadOnly();
  const [isDragging, setIsDragging] = React.useState(false);
  const [height, setHeight] = React.useState(0);
  const parentRef = React.useRef<HTMLDivElement>(null);

  const stays = planner.journey.steps.filter(
    (step) => step.type === "stay"
  ) as JourneyStay[];

  return (
    <div
      ref={parentRef}
      style={{
        height: isDragging ? height : "auto",
      }}
    >
      <DragDropContext
        onDragStart={() => {
          setHeight(parentRef.current!.clientHeight);
          setIsDragging(true);
        }}
        onDragEnd={(result) => {
          setIsDragging(false);
          if (!result.destination) return;

          const stayIndex = planner.journey.steps.findIndex(
            (step) => step.id === result.draggableId
          );
          // Destination index includes journeys and stays
          const destinationIndex = result.destination.index * 2 - 1;

          planner.moveStayPosition(stayIndex, destinationIndex);
        }}
      >
        <Droppable
          type="COLUMN"
          droppableId="journey-steps"
          renderClone={(provided, snapshot, rubric) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <div className="transform translate-y-1/2">
                <ReorderableJourneyStep
                  step={stays[rubric.source.index]}
                  planner={planner}
                  dragHandleProps={provided.dragHandleProps!}
                />
              </div>
            </div>
          )}
        >
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {stays.map((step, index) => (
                <Draggable
                  key={step.id}
                  draggableId={step.id}
                  index={index}
                  isDragDisabled={isReadOnly || step.type !== "stay"}
                >
                  {(provided) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className="mt-6 left-auto top-auto"
                      >
                        <ReorderableJourneyStep
                          step={step}
                          planner={planner}
                          dragHandleProps={provided.dragHandleProps!}
                        />
                      </div>
                    );
                  }}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default ReorderStaysList;
