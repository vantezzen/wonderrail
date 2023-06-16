import { Card } from "@/components/ui/card";
import React from "react";
import Balancer from "react-wrap-balancer";

function Highlight({
  top,
  title,
  description,
  size = 1,
}: {
  top: React.ReactNode;
  title: React.ReactNode;
  description: React.ReactNode;
  size?: number;
}) {
  return (
    <Card
      style={{
        gridColumn: `span ${size}`,
      }}
      className="p-6"
    >
      {top}

      <h2 className="text-center mt-8 font-bold text-white text-3xl">
        <Balancer>{title}</Balancer>
      </h2>
      <p className="font-medium mt-4 mx-6 text-zinc-500">
        <Balancer>{description}</Balancer>
      </p>
    </Card>
  );
}

export default Highlight;
