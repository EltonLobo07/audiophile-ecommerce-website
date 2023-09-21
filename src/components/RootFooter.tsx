import { helpers } from "~/src/helpers";
import { MaxWidthContainer } from "~/src/components/MaxWidthContainer";
import { RootNav } from "~/src/components/RootNav";
import { H1 } from "./H1";
import { twStyles } from "~/src/app/tw-styles";
import { SocialMediaNav } from "~/src/components/SocialMediaNav";

export function RootFooter() {
    return (
        <footer
            className = {helpers.formatClassName(
                `
                    bg-chaos-black 
                    text-white
                `
            )}
        >
            <MaxWidthContainer>
                <div
                    className = {helpers.formatClassName(
                        `
                            h-[4px] 
                            bg-dark-orange 
                            w-[101px] 
                            mx-auto tabAndUp:mx-0
                        `
                    )}
                ></div>
            </MaxWidthContainer>
            <MaxWidthContainer
                className = {helpers.formatClassName(
                    `
                        pt-[52px] tabAndUp:pt-[60px] laptopAndUp:pt-[75px]
                        pb-[38px] tabAndUp:pb-[46px] laptopAndUp:pb-[48px]
                        text-center tabAndUp:text-start
                    `
                )}
            >
                <div
                    className = {helpers.formatClassName(
                        `
                            flex 
                            flex-col-reverse laptopAndUp:flex-row-reverse
                            laptopAndUp:justify-between
                            items-center tabAndUp:items-start laptopAndUp:items-stretch
                            gap-y-12 tabAndUp:gap-y-8
                            mb-12 tabAndUp:mb-8 laptopAndUp:mb-9
                        `
                    )}
                >
                    <RootNav
                        unorderedListClassName = {helpers.formatClassName(
                            `
                                flex-col tabAndUp:flex-row
                                gap-y-4
                            `
                        )}
                    />
                    <H1 />
                </div>
                <div
                    className = {helpers.formatClassName(
                        `
                            flex flex-row justify-between
                            mb-12 tabAndUp:mb-20 laptopAndUp:mb-14
                        `
                    )}
                >
                    <p
                        className = {helpers.formatClassName(
                            `
                                ${twStyles.Body}
                                text-argent
                                laptopAndUp:max-w-[33.75rem]
                            `
                        )}
                    >
                        Audiophile is an all in one stop to fulfill your audio needs. We&apos;re a small team of music lovers and sound specialits who are devoted to helping you get the most out of personal audio. Come and visit our demo facility - we&apos;re open 7 days a week.
                    </p>
                    <SocialMediaNav 
                        className = {helpers.formatClassName(
                            `
                                hidden laptopAndUp:inline-block 
                                self-end 
                                -translate-y-1
                            `
                        )}
                    />
                </div>
                <div
                    className = {helpers.formatClassName(
                        `
                            flex
                            flex-col-reverse tabAndUp:flex-row-reverse laptopAndUp:flex-row
                            tabAndUp:justify-between 
                            tabAndUp:items-center
                            gap-y-12
                        `
                    )}
                >
                    <SocialMediaNav 
                        className = {helpers.formatClassName(
                            `
                                laptopAndUp:hidden 
                                mx-auto tabAndUp:mx-0
                            `
                        )}
                    />
                    <small
                        className = {helpers.formatClassName(
                            `
                                ${twStyles.Body}
                              text-argent
                                capitalize
                            `
                        )}
                    >
                        copyright 2023. all rights reserved
                    </small>
                </div>
            </MaxWidthContainer>
        </footer>
    );
}
