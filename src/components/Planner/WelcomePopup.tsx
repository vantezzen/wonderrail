import React from "react";
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

function WelcomePopup() {
  const isOpen = usePlannerStore((state) => state.popups.welcome);
  const updatePopupState = usePlannerStore((state) => state.setPopupState);
  const setIsWelcomePopupOpen = (open: boolean) =>
    updatePopupState("welcome", open);

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsWelcomePopupOpen}>
      <AlertDialogContent className="md:w-[700px]">
        <AlertDialogHeader>
          <Image
            src={logoImage}
            alt="logo"
            width={100}
            height={100}
            className="mb-6"
          />
          <AlertDialogTitle className="text-zinc-300">
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

          <Button onClick={() => setIsWelcomePopupOpen(false)}>
            Start planning
          </Button>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WelcomePopup;
