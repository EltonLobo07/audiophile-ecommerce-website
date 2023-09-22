"use client";

import React from "react";

export type ShowModalType = "cart" | "order-confirmation" | "navigation" | "none";

export const ShowModalTypeContext = React.createContext<[ShowModalType, (newShowModalType: ShowModalType) => void] | null>(null);
