import { Journey } from "@/lib/types";
import React from "react";
import JourneyStayDisplay from "./JourneyStayDisplay";
import JourneyRide from "./JourneyRide";
import Planner from "@/lib/Journey/Planner";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import JourneyStep from "./JourneyStep";

function JourneySteps({ planner }: { planner: Planner }) {
  const [isDragging, setIsDragging] = React.useState(false);

  return (
    <DragDropContext
      onDragStart={() => setIsDragging(true)}
      onDragEnd={(result) => {
        setIsDragging(false);
        if (!result.destination) return;
        planner.moveStayPosition(result.source.index, result.destination.index);
      }}
    >
      <Droppable type="COLUMN" droppableId="journey-steps">
        {(provided) => (
          <div
            className="mt-6"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {planner.journey.steps.map((step, index) => (
              <Draggable
                key={step.id}
                draggableId={step.type + step.id}
                index={index}
                isDragDisabled={step.type !== "stay"}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="mt-6"
                  >
                    <JourneyStep
                      step={step}
                      planner={planner}
                      dragHandleProps={provided.dragHandleProps!}
                      isDragging={isDragging}
                    />
                  </div>
                )}
              </Draggable>
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default JourneySteps;
