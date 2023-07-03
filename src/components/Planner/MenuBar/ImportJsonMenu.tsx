import { MenubarItem } from "@/components/ui/menubar";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

function ImportJsonMenu({
  onImport,
}: {
  onImport: (file: File) => Promise<void>;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <MenubarItem onSelect={(e) => e.preventDefault()}>
          Import journey from file
        </MenubarItem>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Import JSON</DialogTitle>
        <DialogDescription>
          Import a JSON file to load a journey.
        </DialogDescription>

        <Alert variant="destructive">
          <AlertTriangle className="mr-2" size={14} />
          <AlertTitle>
            Importing a JSON file will overwrite your current journey.
          </AlertTitle>
          <AlertDescription>
            Importing a JSON file will overwrite your current open journey. If
            you want to keep your current journey, please save it first and{" "}
            <Link href="/app/journeys/new">create a new journey</Link>.
          </AlertDescription>
        </Alert>

        <div className="flex flex-col space-y-2">
          <Label htmlFor="input-file">File</Label>
          <Input
            id="input-file"
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
          />
        </div>

        <Button
          className="mt-3"
          onClick={async () => {
            if (file) {
              setIsLoading(true);
              await onImport(file);
              setIsOpen(false);
              setIsLoading(false);
            }
          }}
          disabled={!file}
        >
          Import
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default ImportJsonMenu;
