import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import usePlannerStore from "../../../plannerStore";
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

          const stayIndex = result.source.index;
          const destinationIndex = result.destination.index;

          planner.moveStayPosition(stayIndex, destinationIndex);
        }}
      >
        <Droppable
          type="COLUMN"
          droppableId="journey-steps"
          renderClone={(provided, snapshot, rubric) => (
            <div {...provided.draggableProps} ref={provided.innerRef}>
              <div
                className="transform translate-y-1/2"
                {...provided.dragHandleProps}
              >
                <ReorderableJourneyStep
                  step={stays[rubric.source.index]}
                  planner={planner}
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
                        <div {...provided.dragHandleProps}>
                          <ReorderableJourneyStep
                            step={step}
                            planner={planner}
                          />
                        </div>
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
