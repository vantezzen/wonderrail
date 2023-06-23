import React from "react";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import Link from "next/link";
import SharePopup from "@/components/Various/SharePopup";
import usePlannerStore from "../plannerStore";
import { useAuthState } from "@/lib/firebase/FirebaseConnectionStore";
import useSaveActionStatus, {
  SaveActionStatus,
} from "@/lib/hooks/useSaveActionStatus";
import { useRouter } from "next/navigation";
import Storage from "@/lib/Journey/Storage";
import LoadingScreen from "@/components/Various/LoadingScreen";

function MenuBar() {
  const plannerStore = usePlannerStore();
  const router = useRouter();

  const saveStatus = useSaveActionStatus();
  const [isLoading, setIsLoading] = React.useState(false);
  const journeyId = usePlannerStore((state) => state.planner.journey.id);
  const isPublic = usePlannerStore((state) => state.planner.journey.isPublic);
  const [user] = useAuthState();
  const [hasChanges, setHasChanges] = React.useState(false);

  React.useEffect(() => {
    const onUpdate = () => {
      setHasChanges(true);
    };

    plannerStore.planner.on("change", onUpdate);
    return () => {
      plannerStore.planner.off("change", onUpdate);
    };
  }, [plannerStore.planner]);

  const actions = {
    file: {
      save: async () => {
        if (saveStatus === SaveActionStatus.READ_ONLY) return;

        if (saveStatus === SaveActionStatus.LOGIN) {
          const storage = new Storage();
          storage.saveTemporaryJourney(plannerStore.planner.journey);
          router.push("/auth");
          return;
        }

        setIsLoading(true);
        const storage = new Storage();
        const { userId, journeyId } = await storage.saveJourney(
          plannerStore.planner.journey
        );

        if (saveStatus === SaveActionStatus.NEW) {
          router.push(`/journeys/${userId}/${journeyId}`);
        } else {
          setIsLoading(false);
        }
      },
    },
    itinerary: {
      addLocation: () => {
        plannerStore.setPopupState("addLocation", true);
      },
    },
  };

  return (
    <div className="bg-black">
      {isLoading && <LoadingScreen text="Saving..." />}

      <Menubar className="m-3">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem disabled={saveStatus === SaveActionStatus.READ_ONLY}>
              {saveStatus === SaveActionStatus.READ_ONLY && "Save"}
              {saveStatus === SaveActionStatus.NEW && "Create Journey"}
              {saveStatus === SaveActionStatus.SAVE && "Save"}
              {saveStatus === SaveActionStatus.LOGIN && "Login to save"}
              {hasChanges && "*"}
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            <SharePopup
              journeyId={journeyId}
              userId={user!.uid}
              isPublic={isPublic}
            >
              <MenubarItem>Share</MenubarItem>
            </SharePopup>
            <MenubarSeparator />
            <Link href="/app">
              <MenubarItem>Back to dashboard</MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>Itinerary</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={actions.itinerary.addLocation}>
              New stop <MenubarShortcut>⌘N</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default MenuBar;
