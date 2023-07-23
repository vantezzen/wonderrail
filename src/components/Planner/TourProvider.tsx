"use client";
import React from "react";
import { ShepherdOptionsWithType, ShepherdTour } from "react-shepherd";

import "shepherd.js/dist/css/shepherd.css";

const tourOptions = {
  defaultStepOptions: {
    cancelIcon: {
      enabled: true,
    },
  },
  useModalOverlay: true,
};

const backForwardButtons = [
  {
    type: "back",
    classes: "shepherd-button-secondary",
    text: "Back",
  },
  {
    type: "next",
    text: "Next",
  },
];

const steps: ShepherdOptionsWithType[] = [
  {
    id: "welcome",
    text: [
      `
      <p>
      Welcome to your WonderRail journey planner!
      This short tour will show you how to use the planner and how to get started planning your next trip.
      </p>
      `,
    ],
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type: "cancel",
        classes: "shepherd-button-secondary",
        text: "Exit",
      },
      {
        type: "next",
        text: "Next",
      },
    ],
  },
  {
    id: "general-settings",
    title: "General settings",
    text: `
    <p>
    Here you can find general settings for your journey, such as the name and description.<br /><br />
    You can also set it as publicly available, so you can send your plan to your friends or on the internet - don't worry, only you can edit it!
    </p>
    <p>
    <br />
      Remember to set your preferred departure time so we can plan your train rides to fit your schedule!
    </p>
    `,
    attachTo: { element: "#planner-general-settings", on: "left" },
    buttons: backForwardButtons,
  },
  {
    id: "pass-editor",
    title: "Your Interrail pass",
    text: `
    <p>
    WonderRail will automatically check that you are inside your pass limits. For this
    to work, you need to tell us what kind of pass you have here.
    </p>
    `,
    attachTo: { element: "#planner-pass-editor", on: "left" },
    buttons: backForwardButtons,
  },
  {
    id: "status-bar",
    title: "The status bar",
    text: `
    <p>
      Keep an eye on the status bar to see how many travel days you have used, how much your journey will probably cost and more!<br />
      You can also click on the price to see a detailed breakdown of the costs.
    </p>
    `,
    attachTo: { element: "#planner-status-bar", on: "top" },
    buttons: backForwardButtons,
  },
  {
    id: "menubar",
    title: "The menubar",
    text: `
    <p>
    The menubar holds tons of useful tools for planning your journey: You can reorder locations, get a todo list, calendar view of your journey, can customize the planner layout and more!
    </p>
    `,
    attachTo: { element: "#planner-menubar", on: "bottom" },
    buttons: backForwardButtons,
  },
  {
    id: "add-location",
    title: "Add a location",
    text: `
    <p>
    Now all that's left to do is plan your journey! Start by adding the location you want to start from and add as many locations as you want.
    </p>
    `,
    attachTo: { element: "#planner-menubar-itinerary", on: "bottom" },
    buttons: backForwardButtons,
  },
];

function TourProvider({ children }: { children: React.ReactNode }) {
  return (
    <ShepherdTour steps={steps} tourOptions={tourOptions}>
      {children}
    </ShepherdTour>
  );
}

export default TourProvider;
