import React from "react";
import OthersItem from "./OthersItem";

function Others() {
  return (
    <div className="pt-32 max-w-6xl mx-auto p-12">
      <h2 className="text-5xl text-center font-bold">And so much more...</h2>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <OthersItem
          title="Full offline support"
          description="WonderRail will save your journeys locally in the background so you
          can access them from anywhere - even if you're offline."
        />
        <OthersItem
          title="No login required"
          description="Use WonderRail without logging in and export journeys as a file. You can create a free account to save your journeys in the cloud and share them with your friends."
        />
        <OthersItem
          title="Intelligent Train selection"
          description="WonderRail will automatically score train rides based on price, duration and more to choose the best one for you."
        />
        <OthersItem
          title="Keep your budget in check"
          description="Always see how much you'll be spending on hostels, food and more with the automatic price calculations."
        />
        <OthersItem
          title="Your Journey, Visualized"
          description="WonderRail's interactive map allows you to easily plan your Interrail tour. With suggestions based on your preferences, charting your course through Europe has never been easier."
        />
        <OthersItem
          title="Open-Source"
          description="WonderRail's full source code is available on GitHub. Are you a developer? Why not tinker with WonderRail's code to add your own features!"
        />
      </div>
    </div>
  );
}

export default Others;
