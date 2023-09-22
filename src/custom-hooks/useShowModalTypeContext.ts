import React from "react";
import { ShowModalTypeContext } from "~/contexts/ShowModalType";

export function useShowModalTypeContext() {
    const context = React.useContext(ShowModalTypeContext);
    if (!context) {
        throw new Error("useShowModalTypeContext cannot be used in a component that can't access the ShowModalType context");
    }
    return context;
}
