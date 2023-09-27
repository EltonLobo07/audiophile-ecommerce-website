import { Facebook } from "~/components/icons/Facebook";
import { Instagram } from "~/components/icons/Instagram";
import { Twitter } from "~/components/icons/Twitter";

type Props = Omit<JSX.IntrinsicElements["nav"], "children">;

export function SocialMediaNav(props: Props) {
    const socialMediaIconsCommonName = "w-[24px] h-[24px] cursor-pointer text-white hover:text-dark-orange";
    const anchorTargetAttr = "_blank";

    return (
        <nav
            {...props}
        >
            <ul
                className = "flex gap-x-[16px]"
            >
                <li>
                    <a
                        href = "https://www.facebook.com/"
                        target = {anchorTargetAttr}
                    >
                        <Facebook
                            aria-label = "audiophile on Facebook"
                            className = {socialMediaIconsCommonName}
                        />
                    </a>
                </li>
                <li>
                    <a
                        href = "https://twitter.com/"
                        target = {anchorTargetAttr}
                    >
                        <Twitter
                            aria-label = "audiophile on Twitter"
                            className = {socialMediaIconsCommonName}
                        />
                    </a>
                </li>
                <li>
                    <a
                        href = "https://www.instagram.com/"
                        target = {anchorTargetAttr}
                    >
                        <Instagram 
                            aria-label = "audio on Instagram"
                            className = {socialMediaIconsCommonName}
                        />
                    </a>
                </li>
            </ul>
        </nav>
    );
}
