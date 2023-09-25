import { helpers } from "~/helpers";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { H1 } from "~/components/H1";
import { X } from "~/components/icons/X";
import { Hamburger } from "~/components/icons/Hamburger";
import { RootNav } from "~/components/RootNav";
import { CartBtn } from "~/components/CartBtn";
import { twMerge } from "tailwind-merge";
import { RootHeaderNavDisplayer } from "~/components/RootHeaderNavDisplayer";
import { RootBtnNavigationWrapper } from "~/components/RootBtnNavigationWrapper";

function HungryFlexItems() {
    return (
        <div
            className = "flex-grow min-w-[2.625rem] laptopAndUp:hidden"
        ></div>
    );
}

type Props = {
    useCloseModalLink?: boolean,
    className?: string
};

export function RootHeader(props: Props) {
    return (
        <header
            className = {twMerge(
                helpers.formatClassName(
                    `
                        bg-chaos-black
                        text-white
                        flex-shrink-0
                    `
                ),
                props.className
            )}
        >
            <MaxWidthContainer
                className = {helpers.formatClassName(
                    `
                        flex 
                        justify-between 
                        items-center
                        py-[32px] laptopAndUp:py-[36px]
                        overflow-x-auto
                    `
                )}
            >
                <div
                    className = {helpers.formatClassName(
                        `
                            flex 
                            flex-row-reverse
                            items-center
                            flex-grow tabAndUp:flex-grow-0
                        `
                    )}
                >
                    <HungryFlexItems />
                    <H1 />
                    <HungryFlexItems />
                    <RootBtnNavigationWrapper
                        openContent = {
                            <X 
                                aria-label = "close navigation menu"
                            />
                        }
                        closeContent = {
                            <Hamburger 
                                aria-label = "open navigation menu"
                            />
                        }
                        className = "laptopAndUp:hidden"
                    />
                </div>
                <RootHeaderNavDisplayer 
                    rootNav = {
                        <RootNav 
                            useModalCloseLink = {props.useCloseModalLink}
                            className = "hidden laptopAndUp:inline-block"
                        />
                    }
                />
                <CartBtn />
            </MaxWidthContainer>
        </header>
    );
}
