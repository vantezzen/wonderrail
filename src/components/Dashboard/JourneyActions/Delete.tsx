import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { firestore } from "@/lib/firebase/clientApp";
import { deleteDoc, doc } from "firebase/firestore";
import { Trash } from "lucide-react";
import React from "react";

function Delete({ journeyId, userId }: { journeyId: string; userId: string }) {
  const deleteJourney = () => {
    const documentRef = doc(firestore, `users/${userId}/journeys/${journeyId}`);
    deleteDoc(documentRef);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant="destructive">
          <Trash className="text-zinc-200" size={16} />
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent className="text-zinc-200">
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this journey?
          </AlertDialogTitle>

          <AlertDialogDescription>
            Deleting this journey will remove it from your account and you will
            not be able to recover it.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid grid-cols-2 gap-3">
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={deleteJourney}>Delete</AlertDialogAction>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Delete;
