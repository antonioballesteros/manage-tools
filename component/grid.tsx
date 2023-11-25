"use client";

import { Align, Row } from "@/lib/grid";
import {} from "@/lib/grid";
import RowCard from "@/ui/row-card";
import { useState } from "react";

export default function Grid({ grid: gridInit }: { grid: Row[] }) {
  const [grid, setGrid] = useState(gridInit);

  console.log("grid", grid);

  const onChange = (row: Row, value: Align) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      const updatedRow: Row | undefined = newGrid.find((r) => r.id === row.id);
      if (updatedRow) {
        updatedRow.align = value;
      }
      return newGrid;
    });
  };

  return grid.map((row) => {
    return (
      <RowCard
        key={row.id}
        row={row}
        onChange={(value: Align) => onChange(row, value)}
      />
    );
  });
}
