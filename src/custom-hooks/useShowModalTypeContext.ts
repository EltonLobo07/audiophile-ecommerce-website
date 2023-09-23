import { ShowModalTypeContext } from "~/contexts/ShowModalType";
import { useCustomContext } from "~/custom-hooks/useCustomContext";

export function useShowModalTypeContext() {
    return useCustomContext(
        ShowModalTypeContext,
        "useShowModalTypeContext cannot be used in a component that can't access the ShowModalType context"    
    );
}
