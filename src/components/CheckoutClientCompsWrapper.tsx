"use client";

import React from "react";
import { CheckoutCartSummary } from "~/components/CheckoutCartSummary";
import { CheckoutForm } from "~/components/CheckoutForm";

export function CheckoutClientCompsWrapper() {
    const [submitCickTimestamp, setSubmitClickTimestamp] = React.useState<number | undefined>();

    return (
        <>
            <CheckoutForm 
                submitClickTimestamp = {submitCickTimestamp}
            />
            <CheckoutCartSummary
                setSubmitClickTimestamp = {setSubmitClickTimestamp}
            />
        </>
    );
}
