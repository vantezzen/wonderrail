import React from "react";
import FeatureSection from "./FeatureSection";

function Free() {
  return (
    <FeatureSection
      className="min-h-auto"
      title={
        <>
          Sometimes the best
          <br />
          things in life are <span className="italic">free</span>.
        </>
      }
      subtitle={
        <>
          WonderRail is free and open-source. Add as many stops as you want and
          use all features without needing to subscribe - we know Interrailling
          can be expensive enough on its own.
        </>
      }
    />
  );
}

export default Free;
