import fs from "fs/promises";
import { z } from "zod";
import { schemas } from "./schemas";

const DATA_FILE_PATH = `${process.cwd()}/src/data/data.json`;

type Products = z.infer<typeof schemas.products>;
type Product = Products[number];

async function getProducts(): Promise<Products> {
    return schemas.products.parse(JSON.parse(await fs.readFile(DATA_FILE_PATH, "utf-8")));
}

async function getCategories(): Promise<string[]> {
    const products = await getProducts();
    const categoriesSet = new Set<string>();
    for (const product of products) {
        categoriesSet.add(product.category);
    }
    const result: string[] = [];
    const categoriesIter = categoriesSet.keys();
    let { value, done } = categoriesIter.next();
    while (!done) {
        result.push(value);
        ({ value, done } = categoriesIter.next());
    }
    /*
        Sorting will make sure the categories are always in the same order. 
        Although JS keeps track of the insertion order of the elements in the set, 
        its good practice to treat iteration of a set to be of a random order
    */
    return result.sort();
}

export const dataHelpers = {
    getCategories
};
