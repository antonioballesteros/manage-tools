"use client";

import clsx from "clsx";

import { Align, Row } from "@/lib/template";
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

const getRowStyles = (zoom: number) => {
  return {
    height: 304 * (zoom / 100), //  `calc(304px * ${zoom} / 100 )`,
  };
};

export default function RowCard({
  row,
  zoom,
  onChange,
  onDragProduct,
  onDropProduct,
  children,
}: {
  row: Row;
  zoom: number;
  onChange: Function;
  onDragProduct: Function;
  onDropProduct: Function;
  children?: React.ReactNode;
}) {
  const onUpdateName = (e: any) => {
    onChange({ ...row, name: e.target.value });
  };

  const onDragOver = (ev: any) => {
    ev.preventDefault();
  };

  const onDropElement = (ev: any) => {
    ev.preventDefault();
    const getElementOrParentId = (target: HTMLElement | null): string => {
      if (!target) {
        return "";
      }
      if (target.id) {
        return target.id;
      }
      if (target.parentElement) {
        return getElementOrParentId(target.parentElement);
      }
      return "";
    };

    const dropRowId = getElementOrParentId(ev.target);
    if (!dropRowId) {
      return;
    }
    onDropProduct(dropRowId, ev.pageX);
  };

  const small = zoom < 75;
  const hidden = zoom < 40;

  return (
    <div className="flex">
      <div
        id={row.id}
        className={clsx(
          "flex w-[648px] border-2 border-green-800 mb-2",
          align(row.align)
        )}
        onDrop={onDropElement}
        onDragOver={onDragOver}
        style={getRowStyles(zoom)}
      >
        {row.products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onDrag={onDragProduct}
            zoom={zoom}
          />
        ))}
      </div>
      <div
        className={clsx(
          "flex flex-col ml-10 flex-grow max-w-[420px]",
          hidden && "hidden"
        )}
      >
        <h3 className={clsx("font-bold", small && "hidden")}>Row: {row.id}</h3>
        <h4 className={clsx("text-sm", small && "hidden")}>Align</h4>
        <TripleToggleSwitch onChange={onChange} row={row} />
        <h4 className={clsx("text-sm mt-2", small && "hidden")}>Name</h4>
        <input
          value={row.name}
          onChange={onUpdateName}
          className={clsx(
            "rounded-md px-1 mt-1",
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
