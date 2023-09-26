import { notFound } from "next/navigation";
import React from "react";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { dataHelpers } from "~/data/data-helpers";

type Props = {
    params: {
        category: string,
        product: string
    },
    children: React.ReactNode
};

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
