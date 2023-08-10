import React, { useContext } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import usePlannerStore from "./plannerStore";
import Image from "next/image";
import logoImage from "@/assets/logo.png";
import { trackEvent } from "@/lib/analytics";
import { ShepherdTourContext } from "react-shepherd";

function WelcomePopup() {
  const isOpen = usePlannerStore((state) => state.popups.welcome);
  const updatePopupState = usePlannerStore((state) => state.setPopupState);
  const setIsWelcomePopupOpen = (open: boolean) =>
    updatePopupState("welcome", open);
  const tour = useContext(ShepherdTourContext);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsWelcomePopupOpen}>
      <AlertDialogContent className="md:w-[700px]">
        <AlertDialogHeader>
          <Image
            src={logoImage}
            alt="logo"
            width={100}
            height={100}
            className="mb-6 bg-zinc-900 p-3 rounded"
          />
          <AlertDialogTitle className="dark:text-zinc-300">
            Welcome to WonderRail!
          </AlertDialogTitle>
          <AlertDialogDescription>
            We're glad you're here. We're still in beta, so please be patient
            with us as we work out the kinks.
            <br />
            If you have any feedback, please let us know at{" "}
            <a href="mailto:hello@wonderrail.com" className="underline">
              hello@wonderrail.com
            </a>
            .
          </AlertDialogDescription>

          <Button
            onClick={() => {
              setIsWelcomePopupOpen(false);
              tour?.start();
            }}
          >
            Give me a quick tour
          </Button>

          <Button
            onClick={() => {
              setIsWelcomePopupOpen(false);
              updatePopupState("addLocation", true);
              trackEvent("welcome_popup_start_planning_button_click");
            }}
            variant="secondary"
          >
            Start planning
          </Button>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WelcomePopup;
