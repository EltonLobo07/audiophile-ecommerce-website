import { Metadata } from "next";
import { notFound } from "next/navigation";
import React from "react";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { dataHelpers } from "~/data/data-helpers";
import { helpers } from "~/helpers";

type Props = {
    params: {
        category: string,
        product: string
    },
    children: React.ReactNode
};

export async function generateMetadata(props: Props): Promise<Metadata> {
    return {
        title: helpers.addBrandDetails(`${props.params.product}`)
    };
}

export default async function ProductLayout(props: Props) {
    if (!(await dataHelpers.isProductOfCategoryPresent({
        category: props.params.category,
        productSlug: props.params.product
    }))) {
        notFound();
    }

    return (
        <MaxWidthContainer>
            {props.children}
        </MaxWidthContainer>
    );
}
