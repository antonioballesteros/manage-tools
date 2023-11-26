// WITHOUT FAKE DATE: Uncomment this
 import { sql } from '@vercel/postgres';
import { fakeDelay } from './utils';

export interface Product  {
    id: string;
    name: string;
    price: number;
    img: string;
}

export const getProducts = async (ids:Array<string>):Promise<Array<Product>>  => {
    // WITHOUT FAKE DATE: this should be something like that
    // const productLists = ids.join(', ')
    // const data = await sql<Array<Product>>`select * from products where id in (${productLists})`;

    await fakeDelay(1000);
    const data = require(`./fake/products/product-list.json`);
    return data.filter((item:Product) => ids.includes(item.id));
}