"use client";

import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { CustomLink } from "~/components/CustomLink";

type Props = Omit<Parameters<typeof CustomLink>[0], "onClick">;

export function CustomModalCloseLink(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();
    
    return (
        <CustomLink 
            {...props}
            onClick = {() => {
                if (showModalType !== "none") {
                    setShowModalType("none");
                }
            }}
        />
    );
}
