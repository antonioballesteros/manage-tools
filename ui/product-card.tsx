import Image from "next/image";

import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  /*
  Currency should/could be a store configuration
  out of scope here
  */

  return (
    <div className="flex flex-col mr-4 max-w-[200px]">
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
