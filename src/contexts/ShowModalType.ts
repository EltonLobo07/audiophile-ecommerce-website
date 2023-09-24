"use client";

import React from "react";
import { StateAndSetter } from "~/type-helpers";

export type ShowModalType = "cart" | "order-confirmation" | "nav-menu" | "none";

export const ShowModalTypeContext = React.createContext<StateAndSetter<ShowModalType> | null>(null);
