"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Align, Row } from "@/lib/template";
import { Template } from "@/lib/template";
import RowCard from "@/ui/row-card";
import Button from "@/ui/button";
import Actions from "./actions";
import { Product } from "@/lib/products";
import VerticalSlider from "@/ui/vertical-slider";
import clsx from "clsx";

export default function Template({
  template: templateInit,
}: {
  template: Template;
}) {
  const [template, setTemplate] = useState(templateInit);
  const [updated, setUpdated] = useState(false);
  const [productDrag, setProductDrag] = useState<Product | null>(null);
  const [dragStartX, setDragStartX] = useState(0);
  const [zoom, setZoom] = useState(100);

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
    setUpdated(true);
  };

  const onRemove = (row: Row) => {
    setTemplate((prevTemplate) => {
      return {
        ...prevTemplate,
        grid: prevTemplate.grid.filter((r) => row.id !== r.id),
      };
    });
    setUpdated(true);
  };

  const onDrag = (ev: any, product: Product) => {
    setProductDrag(product);
    setDragStartX(ev.pageX);
  };

  const onDrop = (destRowId: string, dropEndX: number) => {
    const rightDirection = dropEndX > dragStartX;
    const origRowId = template.grid.find((g) => {
      return g.products.some((p) => p.id === productDrag!.id);
    })?.id;

    const rowOriginal = template.grid.find((g) => g.id === origRowId);
    const rowDest = template.grid.find((g) => g.id === destRowId);

    if (destRowId === origRowId && rowOriginal!.products.length > 1) {
      setTemplate((prevTemplate) => {
        return {
          ...prevTemplate,
          grid: prevTemplate.grid.map((row) => {
            const productsFiltered = row.products.filter(
              (p) => p.id !== productDrag!.id
            );
            if (row.id === origRowId) {
              return {
                ...row,
                products: rightDirection
                  ? [...productsFiltered, productDrag!]
                  : [productDrag!, ...productsFiltered],
              };
            }
            return row;
          }),
        };
      });
      setUpdated(true);
    }

    if (destRowId !== origRowId && rowDest!.products.length < 3) {
      setTemplate((prevTemplate) => {
        return {
          ...prevTemplate,
          grid: prevTemplate.grid.map((row) => {
            if (row.id === origRowId) {
              return {
                ...row,
                products: row.products.filter((p) => p.id !== productDrag!.id),
              };
            }
            if (row.id === destRowId) {
              return {
                ...row,
                products: rightDirection
                  ? [...row.products, productDrag!]
                  : [productDrag!, ...row.products],
              };
            }
            return row;
          }),
        };
      });
      setUpdated(true);
    }
  };

  const onZoom = (value: number) => setZoom(value);

  return (
    <div className="flex">
      <VerticalSlider
        value={zoom}
        onChange={onZoom}
        className="mr-4 w-[64px] h-[300px]"
      />

      <div className="flex flex-col">
        {template.grid.map((row) => {
          return (
            <RowCard
              key={row.id}
              row={row}
              onChange={(updatedRow: Row) => onChange(updatedRow)}
              onDrag={onDrag}
              onDrop={onDrop}
              zoom={zoom}
            >
              <div
                className={clsx(
                  zoom < 75
                    ? "mt-1 p-1"
                    : "mt-4 rounded-md border-2 border-black p-4",
                  zoom < 40 && "hidden"
                )}
              >
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
    </div>
  );
}
