import React from "react";
import PlannerMap from "./PlannerMap";
import Heading from "../Various/Heading";

function Planner() {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2">
        <PlannerMap />
      </div>
      <div className="p-6">
        <Heading>Your trip</Heading>
      </div>
    </div>
  );
}

export default Planner;
