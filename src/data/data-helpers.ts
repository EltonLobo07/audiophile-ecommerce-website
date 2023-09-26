import fs from "fs/promises";
import { z } from "zod";
import { schemas } from "./schemas";
import { DeepReadonly } from "~/type-helpers";

const DATA_FILE_PATH = `${process.cwd()}/src/data/data.json`;
const SCREEN = ["desktop", "tablet", "mobile"] as const;

type Screen = (typeof SCREEN)[number];
type Products = z.infer<typeof schemas.products>;
type Product = Products[number];
type ProductToAdvertise = Record<
    | "name"
    | "slug"
    | "category"
    | "description",
    string
> & Record<"images", Record<Screen, string>>;


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
            "/images/home/%r/hero.webp"
        ),
        shortDescription: "Experience natural, life-like audio and exceptional build quality made for the passionate music enthusiast."
    };
}

async function getCategoryNamesAndImages(): Promise<{images: Record<Screen, string>, name: string}[]> {
    const categoryNames = await getCategories();
    const categoriesWithImages = new Set(["headphones", "earphones", "speakers"]);
    const output: Awaited<ReturnType<typeof getCategoryNamesAndImages>> = [];
    for (const categoryName of categoryNames) {
        if (categoriesWithImages.has(categoryName)) {
            output.push({
                name: categoryName,
                images: getScreenSpecificPaths(
                    SCREEN,
                    /*
                        No "%r" in the string below to replace any screen dircetory as only one source
                        will be used for all screen sizes
                    */
                    `/images/shared/desktop/category-thumbnail-${categoryName}.webp`
                )
            });
        }
    }   
    return output;
}


async function getProductsToAdvertise(): Promise<ProductToAdvertise[]> {
    const products = await getProducts();
    // Switch some product descriptions
    const zx9SpeakerSlug: string = "zx9-speaker";
    const productSlugToNewDescription = {
        [zx9SpeakerSlug]: "Upgrade to premium speakers that are phenomenally built to deliver truly remarkable sound"
    };
    const slugsOfProductToAdvertise = new Set([
        zx9SpeakerSlug,
        "zx7-speaker",
        "yx1-earphones"
    ]);
    const productsToAdvertise: Awaited<ReturnType<typeof getProductsToAdvertise>> = [];
    for (const curProduct of products) {
        const curProductSlug = curProduct.slug; 
        if (slugsOfProductToAdvertise.has(curProductSlug)) {
            productsToAdvertise.push({
                category: curProduct.category,
                description: (
                    curProductSlug in productSlugToNewDescription
                    ? productSlugToNewDescription[curProductSlug]
                    : curProduct.description
                ),
                name: curProduct.name,
                slug: curProductSlug,
                images: getScreenSpecificPaths(
                    SCREEN,
                    `/images/home/%r/${curProductSlug}.webp`
                )
            });
        }
    }
    // This step is to match the figma file design. The view is order dependent
    return productsToAdvertise.sort((p1, p2) => {
        const p1Slug = p1.slug;
        const p2Slug = p2.slug;
        if (p1Slug > p2Slug) {
            return -1;
        } 
        if (p1Slug < p2Slug) {
            return 1;
        }
        return 0;
    });
}

async function getProductsByCategory(category: string): 
    Promise<
        (
            Pick<
                Product,
                | "name"
                | "new"
                | "description"
                | "slug"
            > & Record<"images", Record<Screen, string>>
        )[]
    > 
{
    const products = await getProducts();
    return (
        products
            .filter(product => product.category === category)
            .map(product => (
                {
                    name: product.name,
                    description: product.description,
                    new: product.new,
                    slug: product.slug,
                    images: getScreenSpecificPaths(
                        SCREEN,
                        `/images/products/${product.slug}/%r/category-page-preview.webp`
                    )
                }
            ))
    );
}

export async function getProduct(args: DeepReadonly<{productSlug: string, category: string}>):
    Promise<
        | (
            Omit<Product, "others"> & 
            {
                cartImage: string,
                images: Record<Screen, string>,
                gallery: Record<Screen, string>[],
                others: {
                    slug: string,
                    name: string,
                    category: string,
                    images: Record<Screen, string>
                }[]
            }
        )
        | undefined
    >
{
    const products = await getProducts();
    const targetProduct = products.find(product => (
        product.slug === args.productSlug &&
        product.category === args.category
    ));
    if (!targetProduct) {
        return;
    }
    return {
        ...targetProduct,
        images: getScreenSpecificPaths(
            SCREEN,
            `/images/products/${targetProduct.slug}/%r/product.webp`
        ),
        gallery: new Array(3).fill(0).map((_value, idx) => getScreenSpecificPaths(
            SCREEN,
            `/images/products/${targetProduct.slug}/%r/gallery-${idx + 1}.webp`
        )),
        others: targetProduct.others.map(otherProduct => ({
            ...otherProduct,
            images: getScreenSpecificPaths(
                SCREEN,
                `/images/shared/%r/${otherProduct.slug}.webp`
            )
        })),
        cartImage: `/images/cart/${targetProduct.slug}.webp`
    };
}

async function isCategoryPresent(category: string): Promise<boolean> {
    const targetCategory = category.toLowerCase();
    const categories = await getCategories();
    return Boolean(categories.find(category => category === targetCategory));
}

async function isProductOfCategoryPresent(args: DeepReadonly<{productSlug: string, category: string}>): Promise<boolean> {
    const targetCategory = args.category.toLowerCase();
    const targetProduct = args.productSlug.toLowerCase();
    const products = await getProducts();
    return Boolean(products.find(product => (
        product.slug === targetProduct && product.category === targetCategory
    )));
}

export const dataHelpers = {
    getCategories,
    getHomePageProductHighlight,
    getCategoryNamesAndImages,
    getProductsToAdvertise,
    getProductsByCategory,
    getProduct,
    isCategoryPresent,
    isProductOfCategoryPresent
};
