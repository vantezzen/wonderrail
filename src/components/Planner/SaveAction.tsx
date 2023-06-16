import Planner from "@/lib/Journey/Planner";
import useSaveActionStatus, {
  SaveActionStatus,
} from "@/lib/hooks/useSaveActionStatus";
import React from "react";
import { Button } from "../ui/button";
import Storage from "@/lib/Journey/Storage";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";

function SaveAction({ planner }: { planner: Planner }) {
  const status = useSaveActionStatus();
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasChanges, setHasChanges] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const onUpdate = () => {
      setHasChanges(true);
    };

    planner.on("change", onUpdate);
    return () => {
      planner.off("change", onUpdate);
    };
  }, [planner]);

  if (status === SaveActionStatus.READ_ONLY) {
    return null;
  }

  if (status === SaveActionStatus.NEW || status === SaveActionStatus.SAVE) {
    return (
      <div className="mb-6">
        <Button
          onClick={async () => {
            setIsLoading(true);
            const storage = new Storage();
            const { userId, journeyId } = await storage.saveJourney(
              planner.journey
            );

            if (status === SaveActionStatus.NEW) {
              router.push(`/journeys/${userId}/${journeyId}`);
            } else {
              setHasChanges(false);
              setIsLoading(false);
            }
          }}
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 animate-spin" size={16} />
          ) : (
            <>
              <Save size={16} className="mr-2" />
              <span className="mr-2">
                {status === SaveActionStatus.NEW ? "Create Journey" : "Save"}
              </span>
            </>
          )}
        </Button>

        {hasChanges && status === SaveActionStatus.SAVE && (
          <div className="text-center mt-2">
            <p className="text-zinc-600 text-sm">You have unsaved changes</p>
          </div>
        )}
      </div>
    );
  }

  if (status === SaveActionStatus.LOGIN) {
    return (
      <div className="mb-6">
        <Button
          onClick={() => {
            const storage = new Storage();
            storage.saveTemporaryJourney(planner.journey);
            router.push("/auth");
          }}
          className="w-full"
        >
          Login to save
        </Button>
      </div>
    );
  }

  return null;
}

export default SaveAction;
