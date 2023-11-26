"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Align, Row } from "@/lib/template";
import { Template } from "@/lib/template";
import RowCard from "@/ui/row-card";
import Button from "@/ui/button";
import Actions from "./actions";

export default function Template({
  template: templateInit,
}: {
  template: Template;
}) {
  const [template, setTemplate] = useState(templateInit);
  const [updated, setUpdated] = useState(false);

  console.log("template", template);

  const onChange = (updatedRow: Row) => {
    setTemplate((prevTemplate) => {
      return {
        ...prevTemplate,
        grid: prevTemplate.grid.map((row) => {
          if (row.id === updatedRow.id) {
            return updatedRow;
          }
          return row;
        }),
      };
    });
    setUpdated(true);
  };

  const onCreate = (row: Row) => {
    const position = template.grid.indexOf(row);
    setTemplate((prevTemplate) => {
      return {
        ...prevTemplate,
        grid: [
          ...prevTemplate.grid.slice(0, position + 1),
          {
            id: uuidv4(),
            align: Align.LEFT,
            name: "",
            products: [],
          },
          ...prevTemplate.grid.slice(position + 1),
        ],
      };
    });
  };
  const onRemove = (row: Row) => {
    setTemplate((prevTemplate) => {
      return {
        ...prevTemplate,
        grid: prevTemplate.grid.filter((r) => row.id !== r.id),
      };
    });
  };

  return (
    <div className="flex flex-col">
      {template.grid.map((row) => {
        return (
          <RowCard
            key={row.id}
            row={row}
            onChange={(updatedRow: Row) => onChange(updatedRow)}
          >
            <div className="mt-4 rounded-md border-2 border-black p-4">
              <Button onClick={() => onCreate(row)} className="mr-4">
                Create new Grid
              </Button>
              <Button
                onClick={() => onRemove(row)}
                disabled={!!row.products.length}
              >
                Remove this Grid
              </Button>
            </div>
          </RowCard>
        );
      })}
      <Actions updated={updated} template={template} />
    </div>
  );
}
