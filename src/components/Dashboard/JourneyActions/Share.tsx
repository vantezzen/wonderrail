import SharePopup from "@/components/Various/SharePopup";


import { Button } from "@/components/ui/button";
import { ShareIcon } from "lucide-react";
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
