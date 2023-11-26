// WITHOUT FAKE DATE: Uncomment this
// import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';

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

export interface Template {
    id: string;
    grid: Array<Row>;
}

interface DbRow {
    templateId: string;
    id: string;
    name: string;
     align: Align;
     products: Array<string>
}

export const getTemplate = async (templateId: string):Promise<Template>  => {
    // WITHOUT FAKE DATE: this should be something like that
    // const data = sql<Array<DbRow>>`select * from templates where templateId = ${templateId}`;
    // Or if we could relate tables, some inner join to avoid the second query to load products

    await fakeDelay(500);    
    const data = require(`./fake/templates/template-list.json`);
    const grid = data.filter((item:DbRow) => templateId === item.templateId);

    const productIdList = grid.reduce((products : Array<string>, row:DbRow ) => {
        return products.concat(row.products);
    }, [])

    const products = await getProducts(productIdList);
    return {
        id: templateId,
        grid: grid.map( (row: DbRow) => {  
            const {templateId, ...template} = row;
            return {
                ...template, 
                products: products.filter( product => row.products.includes(product.id))
            }
        })
    }
}

export const updateTemplate = async (formData: FormData) => {  
    const templateStringified = formData.get('template') as  string || "{}";    
    const template = JSON.parse(templateStringified);
    console.log("updateTemplate", template);

    // WITHOUT FAKE DATE: this should be something like that
    // - add new grids to db
    // - remove grids from db
    // - update grids in db

    await fakeDelay(1500);
   // redirect('/');
}
