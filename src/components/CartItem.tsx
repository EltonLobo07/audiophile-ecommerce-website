"use client";

import { Cart } from "~/contexts/Cart";
import { Quantity } from "~/components/Quantity";
import Image from "next/image";
import { helpers } from "~/helpers";
import { Amount } from "~/components/Amount";
import { useCartContext } from "~/custom-hooks/useCartContext";

type Props = {
    cartItem: Cart[number]
};

export function CartItem(props: Props) {
    const [cart, setCart] = useCartContext();

    const handleIncrementBtnClick = () => {
        if (cart === undefined) {
            return;
        }
        const newCart = cart.map(cartItem => {
            if (cartItem.slug === props.cartItem.slug) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity + 1
                };
            }
            return cartItem;
        });
        setCart(newCart);
    };

    const hanldeDecrementBtnClick = () => {
        if (cart === undefined) {
            return;
        }
        setCart(cart.map(cartItem => {
            if (cartItem.slug === props.cartItem.slug) {
                return {
                    ...cartItem,
                    quantity: cartItem.quantity - 1
                };
            }
            return cartItem;
        }));
    };

    return (
        <li
            className = {helpers.formatClassName(
                `
                    flex
                    flex-wrap
                    gap-x-4
                    gap-y-2
                    items-center
                `
            )}
        >
            <Image 
                src = {props.cartItem.image}
                alt = {`${props.cartItem.name} sample`}
                width = {64}
                height = {64}
                className = {helpers.formatClassName(
                    `
                        bg-gayish-white
                        object-contain object-center
                        rounded-[8px]
                    `
                )}
            />
            <div
                className = {helpers.formatClassName(
                    `
                        flex
                        flex-col
                        
                        mr-1 tabAndUp:mr-[2.8125rem]
                    `
                )}
            >
                <span
                    className = {helpers.formatClassName(
                        `
                            font-sans 
                            font-bold 
                            text-[0.9375rem] 
                            leading-[1.5625rem]
                            text-black
                        `
                    )}
                >
                    {props.cartItem.name}
                </span>
                <Amount
                    className = {helpers.formatClassName(
                        `
                            cfont-modal-price
                            text-[#7F7F7F]
                        `
                    )}
                >
                    {props.cartItem.price}
                </Amount>
            </div>
            <Quantity
                disableDecrementBtn = {props.cartItem.quantity === 1}
                onIncrement = {handleIncrementBtnClick}
                onDecrement = {hanldeDecrementBtnClick}
                btnClassName = {helpers.formatClassName(
                    `
                        py-[0.4375rem]
                        px-[0.75rem]
                    `
                )}
                quantityClassName = "py-[0.4375rem] px-0"
                className = "ml-auto"
            >
                {props.cartItem.quantity}
            </Quantity>
        </li>
    );
}
