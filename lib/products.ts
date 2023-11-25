export interface Product  {
    id: string;
    name: string;
    price: number;
    img: string;
}

export const getProducts = (ids:Array<string>):Array<Product>  => {
    const data = require(`./fake/products/product-list.json`);
    return data.filter((item:Product) => ids.includes(item.id));
}