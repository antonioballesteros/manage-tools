"use client";

import { Row } from "@/lib/grid";
import {} from "@/lib/grid";
import RowCard from "@/ui/row-card";
import { useState } from "react";

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

  return grid.map((row) => {
    return (
      <RowCard
        key={row.id}
        row={row}
        onChange={(updatedRow: Row) => onChange(updatedRow)}
      />
    );
  });
}
