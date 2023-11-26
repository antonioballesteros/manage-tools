import Image from "next/image";

import { Product } from "@/lib/products";

export default function ProductCard({
  product,
  onDrag,
}: {
  product: Product;
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
      className="flex flex-col mr-4 max-w-[200px] cursor-pointer"
      draggable={true}
      onDragStart={onDragStart}
    >
      <h2 className="text-xl font-semibold">{product.name}</h2>

      <Image
        src={product.img}
        alt={product.name}
        width={200}
        height={300}
        priority={true}
      />
      <p className="ml-auto text-sm">{product.price} €</p>
    </div>
  );
}
