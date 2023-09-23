import { CartContext } from "~/contexts/Cart";
import { useCustomContext } from "~/custom-hooks/useCustomContext";

export function useCartContext() {
    return useCustomContext(
        CartContext,
        "useCartContext cannot be used in a component that can't access the Cart context"    
    );
}
