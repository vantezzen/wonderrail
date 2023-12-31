import AutoCount from "@/components/Various/AutoCount";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PieChart } from "react-minimal-pie-chart";
import React from "react";
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
import { ChevronDown } from "lucide-react";
import Dot from "@/components/Various/Dot";
import { useIsReadOnly } from "@/lib/hooks/useSaveActionStatus";
import { round } from "@/lib/utils/number";

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
  const isReadOnly = useIsReadOnly();
  return (
    <TableCell className="flex gap-1 items-center">
      {amount}x
      <Input
        type="number"
        className="w-24"
        value={value}
        onChange={(e) => {
          setValue(+e.target.value);
          planner.emit("change");
        }}
        readOnly={isReadOnly}
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
        <button className="flex gap-3 dark:hover:bg-zinc-800 hover:bg-zinc-100 rounded px-2 items-center text-left">
          <div className="flex flex-col gap-1">
            <p className="text-xs text-zinc-600">Price</p>
            <p
              className="text-lg font-bold dark:text-zinc-300 text-zinc-800"
              suppressHydrationWarning
            >
              <AutoCount value={stats.cost.total} />€
            </p>
          </div>

          <ChevronDown size={16} className="" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-[600px] border-2 dark:border-zinc-500 border-zinc-300">
        <div className="flex gap-3 items-center">
          <div className="">
            <h2 className="text-lg font-bold dark:text-zinc-300 text-zinc-800">
              Price details
            </h2>

            <Table className="dark:text-zinc-400 text-zinc-700">
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dot className="bg-emerald-500" />
                      Interrail Ticket
                    </div>
                  </TableCell>
                  <CustomizableAmount
                    amount={1}
                    value={planner.journey.priceForInterrailTicket}
                    setValue={(value) =>
                      (planner.journey.priceForInterrailTicket = value)
                    }
                    planner={planner}
                  />
                  <TableCell>
                    {planner.journey.priceForInterrailTicket}€
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dot className="bg-amber-500" />
                      Reservations
                    </div>
                  </TableCell>
                  <TableCell>{stats.totalReservationAmount}x</TableCell>
                  <TableCell>{stats.cost.totalReservationPrice}€</TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dot className="bg-purple-500" />
                      Accommodation
                      <div className="span text-zinc-500">*</div>
                    </div>
                  </TableCell>
                  <TableCell>{stats.journeyLength}x</TableCell>
                  <TableCell>
                    {round(stats.cost.totalAccommodationPrice, 2)}€
                  </TableCell>
                </TableRow>

                <TableRow>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Dot className="bg-blue-500" />
                      Food
                    </div>
                  </TableCell>
                  <CustomizableAmount
                    amount={stats.journeyLength}
                    value={planner.journey.priceForFoodPerDay}
                    setValue={(value) =>
                      (planner.journey.priceForFoodPerDay = value)
                    }
                    planner={planner}
                  />
                  <TableCell>{stats.cost.totalFoodPrice}€</TableCell>
                </TableRow>
              </TableBody>
            </Table>

            <span className="text-zinc-500 text-sm">
              *Based on the lowest hostel price available on Hostelworld
            </span>
          </div>

          <PieChart
            data={[
              {
                title: "Interrail Ticket",
                value: planner.journey.priceForInterrailTicket,
                color: "#10B981",
              },
              {
                title: "Reservations",
                value: stats.cost.totalReservationPrice,
                color: "#F59E0B",
              },
              {
                title: "Accommodation",
                value: stats.cost.totalAccommodationPrice,
                color: "#8B5CF6",
              },
              {
                title: "Food",
                value: stats.cost.totalFoodPrice,
                color: "#3B82F6",
              },
            ]}
            startAngle={-90}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default PriceDetailsPopover;
