"use client";

import clsx from "clsx";

import { Align, Row } from "@/lib/grid";
import ProductCard from "./product-card";
import TripleToggleSwitch from "./triple-toggle-switch";

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
}: {
  row: Row;
  onChange: Function;
}) {
  return (
    <div className="flex">
      <div className={clsx("flex w-[648px]", align(row.align))}>
        {row.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="flex flex-col ml-10">
        <h3 className="font-bold">Row: {row.id}</h3>
        <TripleToggleSwitch onChange={onChange} align={row.align} id={row.id} />
      </div>
    </div>
  );
}
