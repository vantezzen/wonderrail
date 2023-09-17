import WithTooltip from "@/components/Various/WithTooltip";
import { Badge } from "@/components/ui/badge";
import { WifiOff } from "lucide-react";
import React, { useEffect, useState } from "react";

function OfflineInfo() {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    setIsOffline(!navigator.onLine);

    const setAsOnline = () => {
      setIsOffline(false);
    };
    const setAsOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", setAsOnline);
    window.addEventListener("offline", setAsOffline);

    return () => {
      window.removeEventListener("online", setAsOnline);
      window.removeEventListener("offline", setAsOffline);
    };
  }, []);

  if (!isOffline) return <div />;

  return (
    <WithTooltip
      text={
        <div className="max-w-md">
          You are offline.
          <br />
          You can still access journeys we've saved for offline use but features
          that require a connection, like updating hostel prices and adding
          locations, will not work.
        </div>
      }
    >
      <Badge className="flex gap-2 items-center" variant="outline">
        <WifiOff size={16} />
        You are offline
      </Badge>
    </WithTooltip>
  );
}

export default OfflineInfo;
