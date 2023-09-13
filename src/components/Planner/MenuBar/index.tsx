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
import ShortcutManager from "@/lib/Journey/ShortcutManager";
import {
  DownloadCloud,
  Home,
  IterationCcw,
  PanelBottomInactive,
  PanelBottomOpen,
  Plus,
  Save,
  Share,
} from "lucide-react";
import { getFileContents } from "@/lib/utils/file";
import { useToast } from "@/components/ui/use-toast";
import ImportJsonMenu from "./ImportJsonMenu";
import LoadingToast from "@/components/Various/LoadingToast";
import { trackEvent } from "@/lib/analytics";
import { JourneyStay } from "@/lib/types";
import useDarkModeStore, {
  useDarkModeStoreRaw,
} from "@/components/Various/DarkMode";

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
  const isDarkMode = useDarkModeStore((store) => store.isDarkMode);
  const setDarkMode = useDarkModeStoreRaw((store) => store.setIsDarkMode);

  React.useEffect(() => {
    const onUpdate = () => {
      setHasChanges(true);
    };
    const onSaved = () => {
      setHasChanges(false);
    };

    plannerStore.planner.on("change", onUpdate);
    plannerStore.planner.on("saved", onSaved);
    return () => {
      plannerStore.planner.off("change", onUpdate);
      plannerStore.planner.off("saved", onSaved);
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
          trackEvent("planner_export_json");
          const storage = new Storage();
          storage.downloadAsJson(plannerStore.planner.journey);
        },
        importJson: async (file: File) => {
          trackEvent("planner_import_json");
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
            trackEvent("planner_import_json_error");
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
            trackEvent("planner_import_json_invalid");
            return;
          }
          plannerStore.planner.setJourney(journey);
          trackEvent("planner_import_json_success");
        },
      },
      itinerary: {
        addLocation: () => {
          trackEvent("menubar_add_location");
          plannerStore.setPopupState("addLocation", true);
        },
        updateAllHostelPrices: () => {
          trackEvent("menubar_update_all_hostel_prices");
          const allStays = plannerStore.planner.journey.steps.filter(
            (step) => step.type === "stay"
          ) as JourneyStay[];
          for (const stay of allStays) {
            plannerStore.planner.updateHostelData(stay);
          }
        },
      },
      view: {
        toggleStatusBar: () => {
          trackEvent("menubar_toggle_statusbar");
          plannerStore.setView(
            "showStatusBar",
            !plannerStore.view.showStatusBar
          );
        },
        toggleDarkMode: () => {
          trackEvent("menubar_toggle_dark_mode");
          setDarkMode(!isDarkMode);
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
    <div className="p-3 pb-0 dark text-zinc-100" id="planner-menubar">
      {isLoading && <LoadingToast title="Saving journey" />}

      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>File</MenubarTrigger>
          <MenubarContent>
            <MenubarItem
              disabled={saveStatus === SaveActionStatus.READ_ONLY}
              onSelect={() => actions.file.save()}
            >
              <Save size={12} className="mr-2" />
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
                  <Share size={12} className="mr-2" />
                  Share
                </MenubarItem>
              </SharePopup>
            )}
            <MenubarSeparator />
            <MenubarItem onSelect={() => actions.file.exportJson()}>
              <DownloadCloud size={12} className="mr-2" />
              Export journey as file
            </MenubarItem>
            {saveStatus !== SaveActionStatus.READ_ONLY && (
              <ImportJsonMenu onImport={actions.file.importJson} />
            )}
            <MenubarSeparator />
            <Link href="/app">
              <MenubarItem>
                <Home size={12} className="mr-2" />
                Back to dashboard
              </MenubarItem>
            </Link>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger id="planner-menubar-itinerary">
            Itinerary
          </MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={actions.itinerary.addLocation}>
              <Plus size={12} className="mr-2" />
              New stop <MenubarShortcut>⌘K</MenubarShortcut>
            </MenubarItem>
            <MenubarItem onClick={actions.itinerary.updateAllHostelPrices}>
              <IterationCcw size={12} className="mr-2" />
              Update all hostel prices
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>

        <MenubarMenu>
          <MenubarTrigger>View</MenubarTrigger>
          <MenubarContent>
            <MenubarItem onClick={actions.view.toggleStatusBar}>
              {plannerStore.view.showStatusBar ? (
                <PanelBottomOpen size={12} className="mr-2" />
              ) : (
                <PanelBottomInactive size={12} className="mr-2" />
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
