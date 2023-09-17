import React from "react";
import { Card, CardContent } from "../ui/card";

function OthersItem({
  title,
  description,
}: {
  title: React.ReactNode;
  description: React.ReactNode;
}) {
  return (
    <Card className="w-full pt-5 rounded-lg">
      <CardContent>
        <h3 className="text-lg font-bold">{title}</h3>

        <p className="font-medium text-zinc-600 text-sm mt-3">{description}</p>
      </CardContent>
    </Card>
  );
}

export default OthersItem;
