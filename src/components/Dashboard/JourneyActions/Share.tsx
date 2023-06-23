import SharePopup from "@/components/Various/SharePopup";
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
import { AlertTriangle, Copy, ShareIcon } from "lucide-react";
import React from "react";

function Share({
  journeyId,
  userId,
  isPublic,
}: {
  journeyId: string;
  userId: string;
  isPublic: boolean;
}) {
  return (
    <SharePopup journeyId={journeyId} userId={userId} isPublic={isPublic}>
      <Button variant="secondary">
        <ShareIcon className="text-zinc-200" size={16} />
      </Button>
    </SharePopup>
  );
}

export default Share;
