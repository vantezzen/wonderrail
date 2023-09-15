import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Copy } from "lucide-react";
import React from "react";

function SharePopup({
  journeyId,
  userId,
  isPublic,
  children,
}: {
  journeyId: string;
  userId: string;
  isPublic: boolean;
  children: React.ReactNode;
}) {
  const shareUrl = `${window.location.origin}/journeys/${userId}/${journeyId}`;
  const [hasCopiedUrl, setHasCopiedUrl] = React.useState(false);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Share your journey</AlertDialogTitle>

          <AlertDialogDescription>
            Share this link with your friends to let them see your journey.
            <br />
            Your friends will see a read-only version of your journey and will
            not be able to edit it.
          </AlertDialogDescription>

          {!isPublic && (
            <Alert>
              <AlertTriangle size={16} />

              <AlertTitle>
                Your journey is not public. Only you can see it.
              </AlertTitle>
              <AlertDescription>
                Your journey is currently private and other users cannot see it.
                You can change this in the journey editor.
              </AlertDescription>
            </Alert>
          )}
        </AlertDialogHeader>

        <div className="flex w-full items-center gap-2 mt-4">
          <Input value={shareUrl} readOnly />
          <Button
            variant="secondary"
            className={
              hasCopiedUrl ? "bg-emerald-500 hover:bg-emerald-400" : ""
            }
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              setHasCopiedUrl(true);

              setTimeout(() => {
                setHasCopiedUrl(false);
              }, 1000);
            }}
          >
            <Copy size={16} />
          </Button>
        </div>
        <AlertDialogCancel>Close</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default SharePopup;
