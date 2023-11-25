"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Align, Row } from "@/lib/grid";
import {} from "@/lib/grid";
import RowCard from "@/ui/row-card";
import Button from "@/ui/button";

export default function Grid({ grid: gridInit }: { grid: Row[] }) {
  const [grid, setGrid] = useState(gridInit);

  console.log("grid", grid);

  const onChange = (updatedRow: Row) => {
    setGrid((prevGrid) => {
      return prevGrid.map((row) => {
        if (row.id === updatedRow.id) {
          return updatedRow;
        }
        return row;
      });
    });
  };

  const onCreate = (row: Row) => {
    const position = grid.indexOf(row);
    setGrid((prevGrid) => {
      return [
        ...prevGrid.slice(0, position + 1),
        {
          id: uuidv4(),
          align: Align.LEFT,
          name: "",
          products: [],
        },
        ...prevGrid.slice(position + 1),
      ];
    });
  };
  const onRemove = (row: Row) => {
    setGrid((prevGrid) => {
      return prevGrid.filter((r) => row.id !== r.id);
    });
  };

  return grid.map((row) => {
    return (
      <RowCard
        key={row.id}
        row={row}
        onChange={(updatedRow: Row) => onChange(updatedRow)}
      >
        <div className="mt-4 rounded-md border-2 border-black p-4">
          <Button onClick={() => onCreate(row)} className="mr-4">
            Create
          </Button>
          <Button
            onClick={() => onRemove(row)}
            disabled={!!row.products.length}
          >
            Remove
          </Button>
        </div>
      </RowCard>
    );
  });
}
