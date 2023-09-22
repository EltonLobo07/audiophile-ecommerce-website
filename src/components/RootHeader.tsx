import { helpers } from "~/helpers";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { H1 } from "~/components/H1";
import { BtnNavigation } from "~/components/BtnNavigation";
import { X } from "~/components/icons/X";
import { Hamburger } from "~/components/icons/Hamburger";
import { RootNav } from "~/components/RootNav";
import { CartBtn } from "~/components/CartBtn";

function HungryFlexItems() {
    return (
        <div
            className = "flex-grow min-w-[2.625rem] laptopAndUp:hidden"
        ></div>
    );
}

export function RootHeader() {
    return (
        <header
            className = {helpers.formatClassName(
                `
                    bg-chaos-black
                    text-white
                    flex-shrink-0
                `
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
                    <BtnNavigation
                        openContent = {<X />}
                        closeContent = {<Hamburger />}
                        className = "laptopAndUp:hidden"
                    />
                </div>
                <RootNav 
                    className = "hidden laptopAndUp:inline-block"
                />
                <CartBtn />
            </MaxWidthContainer>
        </header>
    );
}
