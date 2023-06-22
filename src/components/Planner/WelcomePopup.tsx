import React from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Sparkles } from "lucide-react";

function WelcomePopup({
  onManualCreate,
  onAiCreate,
  open,
}: {
  onManualCreate: () => void;
  onAiCreate: () => void;
  open: boolean;
}) {
  return (
    <AlertDialog open={open} onOpenChange={() => {}}>
      <AlertDialogContent className="md:w-[700px]">
        <AlertDialogHeader>
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

          <div className="grid grid-cols-2 gap-6 pt-6">
            <div>
              <Button className="h-16" onClick={onManualCreate}>
                Create new journey manually
              </Button>
              <p className="font-medium text-sm text-zinc-500 mt-3">
                Create your journey from scratch, keeping full control of your
                trip. This is best if you already know where you want to go or
                already have experience with Interrail.
              </p>
            </div>

            <div>
              <Button className="h-16" onClick={onAiCreate}>
                Create new journey with AI{" "}
                <Sparkles size={16} className="ml-2" />
              </Button>
              <p className="font-medium text-sm text-zinc-500 mt-3">
                Let our AI create a journey for you based on your preferences.
                This is best if you're new to Interrail or don't know where you
                want to go. You can always edit the journey afterwards.
              </p>
            </div>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default WelcomePopup;
