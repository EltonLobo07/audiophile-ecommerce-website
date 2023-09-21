import fs from "fs/promises";
import { z } from "zod";
import { schemas } from "./schemas";

const DATA_FILE_PATH = `${process.cwd()}/src/data/data.json`;
const SCREEN = ["desktop", "tablet", "mobile"] as const;

type Screen = (typeof SCREEN)[number];
type Products = z.infer<typeof schemas.products>;
type Product = Products[number];

function getScreenSpecificPaths<
    TKeys extends Screen
>(keys: readonly TKeys[], url: string): Record<TKeys, string> {
    const output: Partial<Record<TKeys, string>> = {};
    for (const key of keys) {
        output[key] = url.replaceAll("%r", key);
    }
    return output as Record<TKeys, string>;
}

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

async function getHomePageProductHighlight(): 
    Promise<
        Pick<
            Product, 
            | "new"
            | "name"
            | "slug"
            | "category"
        > & {
            images: Record<Screen, string>,
            shortDescription: string
        }
    > 
{
    const products = await getProducts();
    const targetProductSlug = "xx99-mark-two-headphones";
    const product = products.find(product => product.slug === targetProductSlug);
    if (!product) {
        throw new Error(`Product associated to slug "${targetProductSlug}" is absent`);
    }
    return {
        ...product,
        images: getScreenSpecificPaths(
            SCREEN,
            "/images/home/%r/hero.jpg"
        ),
        shortDescription: "Experience natural, life-like audio and exceptional build quality made for the passionate music enthusiast."
    };
}

export const dataHelpers = {
    getCategories,
    getHomePageProductHighlight
};
