// WITHOUT FAKE DATE: Uncomment this
// import { sql } from '@vercel/postgres';

import { getProducts, Product } from "./products";
import { fakeDelay } from "./utils";

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
    gridId: string;
    id: string;
    name: string;
     align: Align;
     products: Array<string>
}

export const getGrid = async (gridId: string):Promise<Array<Row>>  => {
    // WITHOUT FAKE DATE: this should be something like that
    // const data = sql<Array<DbRow>>`select * from templates where gridId = ${gridId}`;
    // Or if we could relate tables, some inner join to avoid the second query to load products

    await fakeDelay(500);    
    const data = require(`./fake/templates/grid-list.json`);
    const grid = data.filter((item:DbRow) => gridId === item.gridId);

    const productIdList = grid.reduce((products : Array<string>, row:DbRow ) => {
        return products.concat(row.products);
    }, [])

    const products = await getProducts(productIdList);
    return grid.map( (row: DbRow) => {  
        const {gridId, ...grid} = row;
        return {
            ...grid, 
            products: products.filter( product => row.products.includes(product.id))
        }
    })
}