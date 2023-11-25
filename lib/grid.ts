import { getProducts, Product } from "./products";

export enum Align  {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}

export interface Row  {
    id: string;
    name: string;
    align: Align;
    products: Array<Product>;
}

interface DbRow {
    id: string;
    name: string;
     align: Align;
     products: Array<string>
}

export const getGrid = async (id: string):Promise<Array<Row>>  => {
    const data = require(`./fake/grid/${id}.json`);

    const productIdList = data.reduce((products : Array<string>, row:DbRow ) => {
        return products.concat(row.products);
    }, [])

    const products = await getProducts(productIdList);
    return data.map( (row: DbRow) => {  
        return {
            ...row, 
            products: products.filter( product => row.products.includes(product.id))
        }
    })
}