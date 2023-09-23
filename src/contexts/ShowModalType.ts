"use client";

import React from "react";
import { StateAndSetter } from "~/type-helpers";

export type ShowModalType = "cart" | "order-confirmation" | "navigation" | "none";

export const ShowModalTypeContext = React.createContext<StateAndSetter<ShowModalType> | null>(null);
