import { InterrailTimetableEntry } from "@/lib/types";
import React from "react";
import {
  Card,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

import {
  formatDateTime,
} from "@/lib/utils/date";
import { ArrowRight } from "lucide-react";

function AlternativeRide({ entry }: { entry: InterrailTimetableEntry }) {
  return (
    <Card className="hover:bg-zinc-900 duration-100">
      <CardHeader>
        <CardDescription>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <span className="text-zinc-400">Stations</span>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-200">
                    {entry.legs[0].start.station}
                    <ArrowRight className="inline-block ml-1" size={16} />
                    <br />
                    {entry.legs[entry.legs.length - 1].end.station}
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <span className="text-zinc-400">Start/End Time</span>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-200">
                    {formatDateTime(new Date(entry.departure))}
                    <ArrowRight className="inline-block ml-1" size={16} />
                    <br />
                    {formatDateTime(new Date(entry.arrival))}
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <span className="text-zinc-400">Duration</span>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-200">
                    {entry.duration.hours}h {entry.duration.minutes}m
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <span className="text-zinc-400">Changes</span>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-200">
                    {
                      entry.legs.filter((leg) => leg.type !== "TRAIN_TRAVEL")
                        .length
                    }
                  </span>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>
                  <span className="text-zinc-400">Price</span>
                </TableCell>
                <TableCell>
                  <span className="text-zinc-200">{entry.price ?? 0}€</span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}

export default AlternativeRide;
