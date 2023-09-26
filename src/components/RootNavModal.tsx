import { Dialog } from "@headlessui/react";
import { helpers } from "~/helpers";

export type Props = {
    Title: typeof Dialog.Title,
    Description: typeof Dialog.Description,
    rootCategoryUnorderedList: JSX.Element
};

export function RootNavModal(props: Props) {
    return (
        <div
            className = {helpers.formatClassName(
                `
                    fixed
                    top-[calc(2*var(--header-v-pad)+var(--header-max-font-height))]
                    laptopAndUp:top-[calc(2*var(--header-laptopAndUp-v-pad)+var(--header-max-font-height))]
                    w-full
                    max-h-[calc(calc(100%-calc(2*var(--header-v-pad)))-var(--header-max-font-height))]
                    laptopAndUp:max-h-[calc(calc(100%-calc(2*var(--header-laptopAndUp-v-pad)))-var(--header-max-font-height))]
                    overflow-y-auto
                    bg-white
                    rounded-b-2
                    pt-[32px] tabAndUp:pt-[56px]
                    pb-[35px] tabAndUp:pb-[67px]
                `
            )}
        >
            {props.rootCategoryUnorderedList}
        </div>
    );
}
