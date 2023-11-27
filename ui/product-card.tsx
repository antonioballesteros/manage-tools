import Image from "next/image";

import { Product } from "@/lib/products";

const getItemStyles = (zoom: number) => {
  return {
    scale: zoom / 100,
    height: 304 * (100 / zoom), // `calc(304px * 100 / ${zoom})`,
    marginTop: 152 - 152 * (100 / zoom), // `calc(-304px * 100 / ${zoom})`,
  };
};

export default function ProductCard({
  product,
  zoom = 100,
  onDrag,
}: {
  product: Product;
  zoom?: number;
  onDrag: Function;
}) {
  /*
  Currency should/could be a store configuration
  out of scope here
  */

  function onDragStart(ev: any) {
    onDrag(ev, product);
  }

  return (
    <div
      className="flex flex-col mr-4 w-[200px] cursor-pointer"
      style={getItemStyles(zoom)}
      onDragStart={onDragStart}
    >
      <h2 className="p-1 text-xl font-semibold absolute top-0 w-full bg-white/50">
        {product.name}
      </h2>

      <Image
        src={product.img}
        alt={product.name}
        width={200}
        height={300}
        priority={true}
      />
      <p
        className="ml-auto p-1 text-sm absolute right-0 w-full flex justify-end bg-white/50"
        style={{ top: 272 }}
      >
        {product.price} €
      </p>
    </div>
  );
}
