"use client";

import React from "react";

export function useCustomContext<TContext>(
    reactContext: React.Context<TContext>, 
    errorMsg = "useContext is used in a component that can't access the provided context"
) {
    const context = React.useContext(reactContext);
    if (context === null) {
        throw new Error(errorMsg);
    }
    return context;
}
