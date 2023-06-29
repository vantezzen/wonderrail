import React, { useEffect, useMemo, useState } from "react";
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
import ShortcutManager from "@/lib/Journey/ShortcutManager";
import { Check } from "lucide-react";
import { getFileContents } from "@/lib/utils/file";
import { useToast } from "@/components/ui/use-toast";
import ImportJsonMenu from "./ImportJsonMenu";

function MenuBar() {
  const plannerStore = usePlannerStore();
  const router = useRouter();

  const [shortcuts] = useState(() => new ShortcutManager());
  const saveStatus = useSaveActionStatus();
  const [isLoading, setIsLoading] = React.useState(false);
  const journeyId = usePlannerStore((state) => state.planner.journey.id);
  const isPublic = usePlannerStore((state) => state.planner.journey.isPublic);
  const [user] = useAuthState();
  const [hasChanges, setHasChanges] = React.useState(false);
  const { toast } = useToast();

  React.useEffect(() => {
    const onUpdate = () => {
      setHasChanges(true);
    };

    plannerStore.planner.on("change", onUpdate);
    return () => {
      plannerStore.planner.off("change", onUpdate);
    };
  }, [plannerStore.planner]);

  const actions = useMemo(
    () => ({
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
        exportJson: () => {
          const storage = new Storage();
          storage.downloadAsJson(plannerStore.planner.journey);
        },
        importJson: async (file: File) => {
          const storage = new Storage();

          let json;
          try {
            json = await getFileContents(file);
          } catch (e) {
            toast({
              title: "Error reading file",
              description: "Could not read file contents",
              variant: "destructive",
            });
            return;
          }

          let journey;
          try {
            journey = storage.loadFromJson(json);
          } catch (e) {
            toast({
              title: "Invalid journey",
              description: "The file you uploaded is not a valid journey",
              variant: "destructive",
            });
            return;
          }
          plannerStore.planner.setJourney(journey);
        },
      },
      itinerary: {
        addLocation: () => {
          plannerStore.setPopupState("addLocation", true);
        },
      },
      view: {
        togglePopularCities: () => {
          plannerStore.setView(
            "showPopularCities",
            !plannerStore.view.showPopularCities
          );
        },
        toggleStatusBar: () => {
          plannerStore.setView(
            "showStatusBar",
            !plannerStore.view.showStatusBar
          );
        },
      },
    }),
    [plannerStore, router, saveStatus]
  );

  useEffect(() => {
    const shortcutItems = [
      {
        shortcut: "ctrl-s",
        action: actions.file.save,
      },
      {
        shortcut: "ctrl-k",
        action: actions.itinerary.addLocation,
      },
      {
        shortcut: "ctrl-shift-p",
        action: actions.view.togglePopularCities,
      },
      {
        shortcut: "ctrl-shift-g",
        action: actions.view.toggleStatusBar,
      },
    ];

    for (const item of shortcutItems) {
      shortcuts.addListener(item.shortcut, item.action);
    }

    return () => {
      for (const item of shortcutItems) {
        shortcuts.removeListener(item.shortcut, item.action);
      }
    };
  }, [shortcuts, actions]);

  return (
    <div className="bg-zinc-900">
      {isLoading && <LoadingScreen text="Saving..." />}

      <Menubar className="m-3">
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              disabled={saveStatus === SaveActionStatus.READ_ONLY}
              onSelect={() => actions.file.save()}
            >
              {saveStatus === SaveActionStatus.READ_ONLY && "Save"}
              {saveStatus === SaveActionStatus.NEW && "Create Journey"}
              {saveStatus === SaveActionStatus.SAVE && "Save"}
              {saveStatus === SaveActionStatus.LOGIN && "Login to save"}
              {hasChanges && "*"}
              <MenubarShortcut>⌘S</MenubarShortcut>
            </MenubarItem>
            {user && journeyId && (
              <SharePopup
                journeyId={journeyId}
                userId={user!.uid}
                isPublic={isPublic}
              >
                <MenubarItem onSelect={(e) => e.preventDefault()}>
                  Share
                </MenubarItem>
              </SharePopup>
            )}
            <MenubarSeparator />
            <MenubarItem onSelect={() => actions.file.exportJson()}>
              Export journey as file
            </MenubarItem>
            {saveStatus !== SaveActionStatus.READ_ONLY && (
              <ImportJsonMenu onImport={actions.file.importJson} />
            )}
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
              New stop <MenubarShortcut>⌘K</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={actions.view.togglePopularCities}>
              {plannerStore.view.showPopularCities ? (
                <Check size={12} className="mr-2" />
              ) : (
                ""
              )}
              Show popular cities <MenubarShortcut>⌘⇧P</MenubarShortcut>
            </MenubarItem>

            <MenubarItem onClick={actions.view.toggleStatusBar}>
              {plannerStore.view.showStatusBar ? (
                <Check size={12} className="mr-2" />
              ) : (
                ""
              )}
              Show status bar <MenubarShortcut>⌘⇧G</MenubarShortcut>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
}

export default MenuBar;
