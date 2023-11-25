"use client";

import clsx from "clsx";

import { Align, Row } from "@/lib/grid";
import ProductCard from "./product-card";
import TripleToggleSwitch from "./triple-toggle-switch";
import React from "react";

const align = (align: Align): string | undefined => {
  if (align === Align.LEFT) {
    return undefined;
  }

  if (align === Align.RIGHT) {
    return "justify-end";
  }

  return "justify-center";
};

export default function RowCard({
  row,
  onChange,
  children,
}: {
  row: Row;
  onChange: Function;
  children?: React.ReactNode;
}) {
  const onUpdateName = (e: any) => {
    onChange({ ...row, name: e.target.value });
  };

  return (
    <div className="flex">
      <div className={clsx("flex w-[648px] h-[348px]", align(row.align))}>
        {row.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex flex-col ml-10 flex-grow max-w-[420px]">
        <h3 className="font-bold">Row: {row.id}</h3>
        <h4 className="text-sm">Align</h4>
        <TripleToggleSwitch onChange={onChange} row={row} />
        <h4 className="text-sm mt-2">Name</h4>
        <input
          value={row.name}
          onChange={onUpdateName}
          className={clsx(
            "rounded-md px-1",
            !!row.name
              ? "focus-visible:outline-green-600"
              : "focus-visible:outline-red-600 outline-2 outline outline-red-600 focus-visible:bg-white bg-red-200"
          )}
        />
        {children}
      </div>
    </div>
  );
}
