import React from "react";
import useContextSectionStore, {
  ContextSectionStandalonePages,
} from "./contextState";
import {
  Bug,
  CalendarRange,
  CheckCheck,
  Cog,
  MenuSquare,
  Plus,
  Ticket,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/app/icon.png";
import Link from "next/link";
import Image from "next/image";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";
import usePlannerStore from "../plannerStore";

const ITEMS: {
  type: ContextSectionStandalonePages["type"];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  title: string;
  id?: string;
}[] = [
  {
    type: "itinerary",
    icon: MenuSquare,
    title: "Itinerary",
  },
  {
    type: "generalSettings",
    icon: Cog,
    title: "Settings",
    id: "planner-general-settings-item",
  },
  {
    type: "passEditor",
    icon: Ticket,
    title: "Interrail Pass",
    id: "planner-pass-editor-item",
  },
  {
    type: "calendar",
    icon: CalendarRange,
    title: "Calendar",
  },
  {
    type: "todo",
    icon: CheckCheck,
    title: "Todo List",
  },
  {
    type: "logs",
    icon: Bug,
    title: "Logs",
  },
];

function ContextSidebar() {
  const context = useContextSectionStore((store) => store.context);
  const setContext = useContextSectionStore((store) => store.setContext);

  const updatePopupState = usePlannerStore((state) => state.setPopupState);

  return (
    <TooltipProvider delayDuration={100}>
      <div
        className="
        lg:h-full w-full lg:w-auto
        px-3 py-5 
        bg-zinc-100 
        flex lg:flex-col gap-3 items-center z-20
        border-r-2 border-zinc-200

        fixed lg:static bottom-0 left-0 lg:z-auto
      "
      >
        <Link href="/app" className="mb-3 hidden lg:block">
          <Image src={logo} alt="WonderRail" width={30} height={30} />
        </Link>

        {ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = context?.type === item.type;
          return (
            <Tooltip key={item.type}>
              <TooltipContent side="right">{item.title}</TooltipContent>

              <TooltipTrigger>
                <button
                  className={cn(
                    "p-3 rounded-lg cursor-pointer duration-200",
                    isActive
                      ? "text-brand-600 bg-brand-100 hover:bg-brand-200"
                      : "text-zinc-500 hover:bg-zinc-200"
                  )}
                  onClick={() =>
                    setContext({
                      type: item.type,
                    } as ContextSectionStandalonePages)
                  }
                  id={item.id}
                >
                  <Icon className="w-5 h-5" />
                </button>
              </TooltipTrigger>
            </Tooltip>
          );
        })}

        <Tooltip>
          <TooltipContent side="right">
            Add new city to your itinerary
          </TooltipContent>

          <TooltipTrigger asChild>
            <button
              className={cn(
                "p-3 rounded-lg cursor-pointer text-zinc-500 bg-zinc-200 mt-auto"
              )}
              onClick={() => {
                updatePopupState("addLocation", true);
                setContext({
                  type: "itinerary",
                });
              }}
              id="planner-add-item"
            >
              <Plus className="w-5 h-5" />
            </button>
          </TooltipTrigger>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default ContextSidebar;
