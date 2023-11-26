"use client";

import Button from "@/ui/button";
import { updateTemplate } from "@/lib/template";
import { Template } from "@/lib/template";

export default function Actions({
  updated,
  template,
}: {
  updated: boolean;
  template: Template;
}) {
  const invalid =
    template.grid.length === 0 ||
    template.grid.some((row) => row.products.length === 0 || row.name === "");
  return (
    <div className="mt-4">
      <form action={updateTemplate}>
        <input type="hidden" name="template" value={JSON.stringify(template)} />
        <Button type="submit" disabled={!updated || invalid}>
          Save
        </Button>
      </form>
    </div>
  );
}
