import { twMerge } from "tailwind-merge";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { MaxWidthContainer } from "~/components/MaxWidthContainer";
import { helpers } from "~/helpers";
import { CustomImage } from "~/components/CustomImage";
import BestGearDesktop from "root/public/images/shared/desktop/best-gear.webp";
import BestGearTablet from "root/public/images/shared/tablet/best-gear.webp";
import BestGearMobile from "root/public/images/shared/mobile/best-gear.webp";

type Props = {
    className?: string
};

export function RootAbout(props: Props) {
    const sectionTitle = "about";
    
    return (
        <section
            aria-label = {sectionTitle}
            className = {twMerge(
                "relative",
                props.className
            )}
        >
            <VisuallyHidden
                inline = {false}
            >
                <h2>
                    {sectionTitle}
                </h2>
            </VisuallyHidden>
            <MaxWidthContainer
                className = {helpers.formatClassName(
                    `
                        flex
                        flex-col-reverse laptopAndUp:flex-row
                        laptopAndUp:gap-x-[7.8125rem]
                        gap-y-10 tabAndUp:gap-y-16
                    `
                )}
            >
                <div
                    className = {helpers.formatClassName(
                        `
                            tabAndUp:mx-auto laptopAndUp:mx-0
                            tabAndUp:max-w-[35.8125rem] laptopAndUp:max-w-none
                            laptopAndUp:w-[27.8125rem]
                            laptopAndUp:max-h-[36.75rem] laptopAndUp:overflow-y-auto 
                            flex
                            text-center laptopAndUp:text-start
                        `
                    )}
                >
                    <div
                        className = {helpers.formatClassName(
                            `
                                flex  
                                flex-col 
                                gap-y-8
                                text-wrap
                            `
                        )}
                    >
                        <p
                            className = {helpers.formatClassName(
                                `
                                  text-black
                                    laptopAndUp:mt-auto
                                    cfont-h4-5 tabAndUp:cfont-h2
                                `
                            )}
                        >
                            bringing you the 
                            <span
                                className = "text-dark-orange"
                            >
                                {" best "}
                            </span>
                            audio gear
                        </p>
                        <p
                            className = {helpers.formatClassName(
                                `
                                    cfont-body
                                    text-[#7D7D7D]
                                    laptopAndUp:mb-auto
                                `
                            )}
                        >
                            Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.
                        </p>
                    </div>
                </div>
                <CustomImage 
                    nativePictureProps = {{
                        className: helpers.formatClassName(
                            `
                                w-full laptopAndUp:w-1/3 laptopAndUp:flex-grow  
                                h-[18.75rem] laptopAndUp:h-[36.75rem]
                                rounded-2
                            `
                        )
                    }}
                    nativeImgProps = {{
                        alt: "A person with headphones",
                        className: "rounded-inherit"
                    }}
                    images = {{
                        desktop: BestGearDesktop.src,
                        tablet: BestGearTablet.src,
                        mobile: BestGearMobile.src
                    }}
                />
            </MaxWidthContainer>
        </section>
    );
}
