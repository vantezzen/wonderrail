import AutoCount from "@/components/Various/AutoCount";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import JourneyStats from "@/lib/Journey/JourneyStats";
import React from "react";
import StatusBarElement from "./StatusBarElement";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import Planner from "@/lib/Journey/Planner";
import { ChevronDown, ChevronUp } from "lucide-react";

function CustomizableAmount({
  amount,
  value,
  setValue,
  planner,
}: {
  amount: number;
  value: number;
  setValue: (value: number) => void;
  planner: Planner;
}) {
  return (
    <TableCell className="flex gap-1 items-center">
      <AutoCount value={amount} />x
      <Input
        type="number"
        className="w-24"
        value={value}
        onChange={(e) => {
          setValue(+e.target.value);
          planner.emit("change");
        }}
      />
      €
    </TableCell>
  );
}

function PriceDetailsPopover({ planner }: { planner: Planner }) {
  const stats = planner.stats.get();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex gap-3 hover:bg-zinc-900 rounded px-2 items-center text-left">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-zinc-600">Price</p>
            <p
              className="text-lg font-bold text-zinc-300"
              suppressHydrationWarning
            >
              <AutoCount value={stats.cost.total} />€
            </p>
          </div>

          <ChevronDown size={16} className="" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[500px] border-2 border-zinc-500">
        <h2 className="text-lg font-bold text-zinc-300">Price details</h2>

        <Table className="text-zinc-400">
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <TableRow>
              <TableCell>Reservations</TableCell>
              <TableCell>
                <AutoCount value={stats.totalReservationAmount} />x
              </TableCell>
              <TableCell>
                <AutoCount value={stats.cost.totalReservationPrice} />€
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Accommodation</TableCell>
              <CustomizableAmount
                amount={stats.journeyLength}
                value={planner.journey.priceForAccommodationPerDay}
                setValue={(value) =>
                  (planner.journey.priceForAccommodationPerDay = value)
                }
                planner={planner}
              />
              <TableCell>
                <AutoCount value={stats.cost.totalAccommodationPrice} />€
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Food</TableCell>
              <CustomizableAmount
                amount={stats.journeyLength}
                value={planner.journey.priceForFoodPerDay}
                setValue={(value) =>
                  (planner.journey.priceForFoodPerDay = value)
                }
                planner={planner}
              />
              <TableCell>
                <AutoCount value={stats.cost.totalFoodPrice} />€
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </PopoverContent>
    </Popover>
  );
}

export default PriceDetailsPopover;
