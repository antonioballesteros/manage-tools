export interface Product  {
    id: number;
    name: string;
    price: number;
    img: string;
}

export const getProducts = (ids:Array<number>):Array<Product>  => {
    const data = require(`./fake/products/product-list.json`);
    return data.filter((item:Product) => ids.includes(item.id));
}