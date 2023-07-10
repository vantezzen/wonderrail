import { Card } from "@/components/ui/card";
import { HostelData } from "@/lib/types";
import { formatDateTime } from "@/lib/utils/date";
import React from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
} from "recharts";

function HostelPriceChangeInformation({
  datapoints,
}: {
  datapoints: HostelData[];
}) {
  if (datapoints.length < 2) return null;

  return (
    <div style={{ width: "100%", height: 50 }}>
      <ResponsiveContainer>
        <AreaChart data={datapoints}>
          <Tooltip
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <Card className="p-3">
                    On{" "}
                    <strong>
                      {formatDateTime(payload[0].payload.updatedAt)}
                    </strong>
                    , the lowest price was{" "}
                    <strong>{payload[0].payload.lowestPricePerNight}€</strong>{" "}
                    per night.
                  </Card>
                );
              }
            }}
            allowEscapeViewBox={{ x: false, y: true }}
          />
          <Area dataKey="lowestPricePerNight" fill="#e7e7e7" stroke="#e7e7e7" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HostelPriceChangeInformation;
