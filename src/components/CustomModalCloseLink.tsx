"use client";

import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";
import { CustomLink } from "~/components/CustomLink";

type Props = Parameters<typeof CustomLink>[0];

export function CustomModalCloseLink(props: Props) {
    const [showModalType, setShowModalType] = useShowModalTypeContext();
    
    return (
        <CustomLink 
            onClick = {() => {
                if (showModalType !== "none") {
                    setShowModalType("none");
                }
            }}
            {...props}
        />
    );
}
