import { getProducts, Product } from "./products";

export enum Align  {
    LEFT = "left",
    CENTER = "center",
    RIGHT = "right"
}

export interface Row  {
    id: number;
    name: string;
    align: Align;
    products: Array<Product>;
}

interface DbRow {
    id: number;
    name: string;
     align: Align;
     products: Array<number>
}

export const getGrid = async (id: string):Promise<Array<Row>>  => {
    const data = require(`./fake/grid/${id}.json`);

    const productIdList = data.reduce((products : Array<number>, row:DbRow ) => {
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