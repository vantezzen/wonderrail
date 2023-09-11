import { Card, CardContent } from "@/components/ui/card";
import { Message } from "@/lib/Journey/Logging";
import React from "react";
import usePlannerStore from "../plannerStore";

function renderMessageItem(item: any) {
  if (typeof item === "object") {
    return <span>{JSON.stringify(item, null, 2)} </span>;
  }

  return <span>{item} </span>;
}

function LogMessage({ message }: { message: Message }) {
  return (
    <div>
      {message.map((item, index) => (
        <React.Fragment key={index}>{renderMessageItem(item)}</React.Fragment>
      ))}
    </div>
  );
}

function Logs() {
  const planner = usePlannerStore((store) => store.planner);
  return (
    <div className="p-3">
      <Card>
        <CardContent className="flex flex-col gap-4 pt-6">
          <pre className="whitespace-pre-wrap">
            {planner.logging.entries.map((message, index) => (
              <LogMessage key={index} message={message} />
            ))}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}

export default Logs;
