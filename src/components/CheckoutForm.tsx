"use client";

import React from "react";
import { helpers } from "~/helpers";
import { LabelAndInput } from "~/components/LabelAndInput";
import { LabelAndRadioBtn } from "~/components/LabelAndRadioBtn";
import { VisuallyHidden } from "~/components/VisuallyHidden";
import { CashOnDelivery } from "~/components/icons/CashOnDelivery";
import { useShowModalTypeContext } from "~/custom-hooks/useShowModalTypeContext";

type Props = {
    submitClickTimestamp: number | undefined
};

export function CheckoutForm(props: Props) {
    const [labelAndInputCompKeySuffix, setLabelAndInputCompKeySuffix] = React.useState(() => Date.now());
    const [forceStartedTyping, setForceStartedTyping] = React.useState(false);
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [address, setAddress] = React.useState("");
    const [zipCode, setZipCode] = React.useState("");
    const [city, setCity] = React.useState("");
    const [country, setCountry] = React.useState("");
    const [paymentMethod, setPaymentMethod] = React.useState<"e-money" | "cash-on-delivery">("e-money");
    const [eMoneyDetails, setEMoneyDetails] = React.useState({
        number: "",
        pin: ""
    });
    const processedSubmitClickTimestampRef = React.useRef<number | undefined>();
    const setShowModalType = useShowModalTypeContext()[1];
    const emailRegExp = React.useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/, []);
    const eMoneyNumberRegExp = React.useMemo(() => /^[0-9]{9}$/, []);
    const eMoneyPinRegExp = React.useMemo(() => /^[0-9]{4}$/, []);
    const phoneNumberRegExp = React.useMemo(() => /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/, []);

    const paymentMethodInputName = "paymentMethod";
    const formTitle = "checkout";
    const fieldsetClassName = "text-dark-orange cfont-subtitle mb-4";
    const fieldsetMainDivClassName = helpers.formatClassName(
        `
            flex
            flex-col
            gap-y-6
        `
    );
    const fieldsetLeafDivClassName = helpers.formatClassName(
        `
            flex
            flex-col tabAndUp:flex-row
            gap-x-4
            gap-y-6
        `
    );
    const tabAndUpFirstColWidth = "tabAndUp:w-[calc(50%-0.5rem)]";

    const resetRelevantStates = React.useCallback(() => {
        setName("");
        setEmail("");
        setPhoneNumber("");
        setAddress("");
        setZipCode("");
        setCity("");
        setCountry("");
        setPaymentMethod("e-money");
        setEMoneyDetails({
            number: "",
            pin: ""
        });
        setForceStartedTyping(false);
    }, []);

    const allFieldsFilledAndValid = React.useCallback(() => {
        return (
            name !== "" &&
            email !== "" &&
            emailRegExp.test(email) &&
            phoneNumber !== "" &&
            phoneNumberRegExp.test(phoneNumber) &&
            address !== "" &&
            zipCode !== "" &&
            city !== "" &&
            country !== "" &&
            (
                paymentMethod === "cash-on-delivery" ||
                (
                    paymentMethod === "e-money" &&
                    eMoneyDetails.number !== "" &&
                    eMoneyDetails.pin !== "" &&
                    eMoneyNumberRegExp.test(eMoneyDetails.number) &&
                    eMoneyPinRegExp.test(eMoneyDetails.pin)
                )
            ) 
        );
    }, [
        name,
        email,
        emailRegExp,
        phoneNumber,
        phoneNumberRegExp,
        address,
        zipCode,
        city,
        country,
        paymentMethod,
        eMoneyDetails,
        eMoneyNumberRegExp,
        eMoneyPinRegExp
    ]);

    React.useEffect(() => {
        if (
            props.submitClickTimestamp !== undefined && 
            processedSubmitClickTimestampRef.current !== props.submitClickTimestamp
        ) {
            processedSubmitClickTimestampRef.current = props.submitClickTimestamp;
            if (allFieldsFilledAndValid()) {
                resetRelevantStates();
                setLabelAndInputCompKeySuffix(Date.now());
                setShowModalType("order-confirmation");
            } else {
                setForceStartedTyping(true);
            }
        }
    }, [
        props.submitClickTimestamp,
        allFieldsFilledAndValid,
        resetRelevantStates,
        setShowModalType
    ]);

    return (
        <form
            aria-label = {formTitle}
            className = {helpers.formatClassName(
                `
                    flex-grow
                    bg-white
                    rounded-[8px]
                    pt-[24px] tabAndUp:pt-[30px] laptopAndUp:pt-[54px] 
                    px-[24px] tabAndUp:px-[28px] laptopAndUp:px-[48px]
                    pb-[30px] laptopAndUp:pb-[54px]
                `
            )}
        >
            <h3
                className = {helpers.formatClassName(
                    `
                        cfont-h3
                        text-black
                        mb-8 tabAndUp:mb-10
                    `
                )}
            >
                {formTitle}
            </h3>
            <div
                className = {helpers.formatClassName(
                    `
                        flex
                        flex-col
                        gap-y-8 tabAndUp:gap-y-16
                    `
                )}
            >
                <fieldset>
                    <legend
                        className = {fieldsetClassName}
                    >
                        billing details
                    </legend>
                    <div
                        className = {fieldsetMainDivClassName}
                    >
                        <div
                            className = {fieldsetLeafDivClassName}
                        >
                            <LabelAndInput
                                key = {`name-${labelAndInputCompKeySuffix}`}
                                forceStartedTyping = {forceStartedTyping}
                                labelProps = {{
                                    className: "flex-grow"
                                }}
                                inputProps = {{
                                    value: name,
                                    onChange: setName,
                                    required: true,
                                    placeholder: "Alexei Ward" 
                                }}
                            >
                                name
                            </LabelAndInput>
                            <LabelAndInput
                                key = {`email-${labelAndInputCompKeySuffix}`}
                                forceStartedTyping = {forceStartedTyping}
                                labelProps = {{
                                    className: "flex-grow"
                                }}
                                inputProps = {{
                                    value: email,
                                    onChange: setEmail,
                                    required: true,
                                    placeholder: "alexei@mail.com",
                                    pattern: emailRegExp
                                }}
                            >
                                email address
                            </LabelAndInput>
                        </div>
                        <LabelAndInput
                            key = {`phoneNumber-${labelAndInputCompKeySuffix}`}
                            forceStartedTyping = {forceStartedTyping}
                            inputProps = {{
                                value: phoneNumber,
                                onChange: setPhoneNumber,
                                required: true,
                                placeholder: "+1 202-555-0136",
                                pattern: phoneNumberRegExp
                            }}
                        >
                            phone number
                        </LabelAndInput>
                    </div>
                </fieldset>
                <fieldset>
                    <legend
                        className = {fieldsetClassName}
                    >
                        shipping info
                    </legend>
                    <div
                        className = {fieldsetMainDivClassName}
                    >
                        <LabelAndInput
                            key = {`address-${labelAndInputCompKeySuffix}`}
                            forceStartedTyping = {forceStartedTyping}
                            inputProps = {{
                                value: address,
                                onChange: setAddress,
                                required: true,
                                placeholder: "1137 Williams Avenue"
                            }}
                        >
                            your address
                        </LabelAndInput>
                        <div
                            className = {fieldsetLeafDivClassName}
                        >
                            <LabelAndInput
                                key = {`zipCode-${labelAndInputCompKeySuffix}`}
                                forceStartedTyping = {forceStartedTyping}
                                labelProps = {{
                                    className: "flex-grow"
                                }}
                                inputProps = {{
                                    value: zipCode,
                                    onChange: setZipCode,
                                    required: true,
                                    placeholder: "10001"
                                }}
                            >
                                ZIP code
                            </LabelAndInput>
                            <LabelAndInput
                                key = {`city-${labelAndInputCompKeySuffix}`}
                                forceStartedTyping = {forceStartedTyping}
                                labelProps = {{
                                    className: "flex-grow"
                                }}
                                inputProps = {{
                                    value: city,
                                    onChange: setCity,
                                    required: true,
                                    placeholder: "New York"
                                }}
                            >
                                city
                            </LabelAndInput>
                        </div>
                        <LabelAndInput
                            key = {`country-${labelAndInputCompKeySuffix}`}
                            forceStartedTyping = {forceStartedTyping}
                            labelProps = {{
                                className: tabAndUpFirstColWidth
                            }}
                            inputProps = {{
                                value: country,
                                onChange: setCountry,
                                required: true,
                                placeholder: "United States"
                            }}
                        >
                            country
                        </LabelAndInput>
                    </div>
                </fieldset>
                <fieldset>
                    <legend
                        className = {fieldsetClassName}
                    >
                        payment details
                    </legend>
                    <div
                        className = {helpers.formatClassName(
                            `
                                flex
                                flex-col tabAndUp:flex-row
                                tabAndUp:justify-between
                                gap-y-4
                            `
                        )}
                    >
                        <div
                            className = {helpers.formatClassName(
                                `
                                    font-sans
                                    font-bold
                                    text-[0.75rem]
                                    leading-[1.03125rem]
                                    tracking-[-0.013125rem]
                                    capitalize
                                    ${tabAndUpFirstColWidth}
                                `
                            )}
                        >
                            payment method
                        </div>
                        <div
                            className = {helpers.formatClassName(
                                `
                                    flex-grow
                                    flex
                                    flex-col
                                    gap-y-4
                                `
                            )}
                        >
                            <LabelAndRadioBtn
                                labelProps = {{
                                    className: tabAndUpFirstColWidth
                                }}
                                inputProps = {{
                                    checked: paymentMethod === "e-money",
                                    onChange: () => setPaymentMethod("e-money"),
                                    name: paymentMethodInputName
                                }}
                            >
                                e-Money
                            </LabelAndRadioBtn>
                            <LabelAndRadioBtn
                                labelProps = {{
                                    className: tabAndUpFirstColWidth
                                }}
                                inputProps = {{
                                    checked: paymentMethod === "cash-on-delivery",
                                    onChange: () => setPaymentMethod("cash-on-delivery"),
                                    name: paymentMethodInputName
                                }}
                            >
                                Cash on Delivery
                            </LabelAndRadioBtn>
                        </div>
                    </div>
                </fieldset>
                {
                    paymentMethod === "e-money" && (
                        <fieldset>
                            <legend
                                className = "relative"
                            >
                                <VisuallyHidden
                                    inline
                                >
                                    e-money details
                                </VisuallyHidden>
                            </legend>
                            <div
                                className = {fieldsetLeafDivClassName}
                            >
                                <LabelAndInput
                                    key = {`eMoneyNumber-${labelAndInputCompKeySuffix}`}
                                    forceStartedTyping = {forceStartedTyping}
                                    labelProps = {{
                                        className: "flex-grow"
                                    }}
                                    inputProps = {{
                                        value: eMoneyDetails.number,
                                        onChange: newNumber => setEMoneyDetails({
                                            ...eMoneyDetails,
                                            number: newNumber
                                        }),
                                        required: true,
                                        placeholder: "238521993",
                                        pattern: eMoneyNumberRegExp
                                    }}
                                    capitalizeLabel = {false}
                                >
                                    e-Money Number
                                </LabelAndInput>
                                <LabelAndInput
                                    key = {`eMoneyPin-${labelAndInputCompKeySuffix}`}
                                    forceStartedTyping = {forceStartedTyping}
                                    labelProps = {{
                                        className: "flex-grow"
                                    }}
                                    inputProps = {{
                                        value: eMoneyDetails.pin,
                                        onChange: newPin => setEMoneyDetails({
                                            ...eMoneyDetails,
                                            pin: newPin
                                        }),
                                        required: true,
                                        placeholder: "6891",
                                        pattern: eMoneyPinRegExp
                                    }}
                                    capitalizeLabel = {false}
                                >
                                    e-Money PIN
                                </LabelAndInput>
                            </div>
                        </fieldset>
                    )
                }
                {
                    paymentMethod === "cash-on-delivery" && (
                        <div
                            className = {helpers.formatClassName(
                                `
                                    flex
                                    flex-col tabAndUp:flex-row
                                    items-center
                                    text-center tabAndUp:text-start
                                    gap-y-[24px]
                                    gap-x-[32px]
                                `
                            )}
                        >
                            <CashOnDelivery 
                                className = "flex-shrink-0"
                            />
                            <p
                                className = {helpers.formatClassName(
                                    `
                                        cfont-body
                                        text-platinum-granite
                                    `
                                )}
                            >
                                The &apos;Cash on Delivery&apos; option enables you to pay in cash when our delivery courier arrives at your residence. Just make sure your address is correct so that your order will not be cancelled.
                            </p>
                        </div>
                    )
                }
            </div>
        </form>
    );
}
