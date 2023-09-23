"use client";

import React from "react";

export const CartContext = React.createContext<
    | [
        string[] | undefined, 
        (newState: string[]) => void
      ] 
    | null
>(null);
