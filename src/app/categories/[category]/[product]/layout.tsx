import React from "react";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";

type Props = {
    children: React.ReactNode
};

export default function ProductLayout(props: Props) {
    return (
        <MaxWidthContainer>
            {props.children}
        </MaxWidthContainer>
    );
}
