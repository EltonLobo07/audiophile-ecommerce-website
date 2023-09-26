function formatClassName(className: string): string {
    const stack: string[] = [];
    const specialChars = new Set(["\n", "\t", " "]);
    for (const ch of className) {
        const isChSpecial = specialChars.has(ch);
        if (
            !isChSpecial || 
            (
                stack.length > 0 &&
                !specialChars.has(stack[stack.length - 1]) 
            )
        ) {
            stack.push(isChSpecial ? " " : ch);   
        }
    }
    while (stack.length && specialChars.has(stack[stack.length - 1])) {
        stack.pop();
    }
    return stack.join("");
}

function getNewLineIndices(text: string): number[] {
    let output: number[] = [];
    for (let i = 0; i < text.length; i += 1) {
        if (text[i] === "\n") {
            output.push(i);
        }
    }
    return output;
}

function caculateCartTotal(cart: {price: number, quantity: number}[]): number {
    const total = cart.reduce((acc, cartItem) => acc + cartItem.price * cartItem.quantity, 0);
    if (Math.trunc(total) !== total) {
        return Number(total.toFixed(2));
    }
    return total;
}

function addBrandDetails(text: string): string {
    return `${text} | Audiophile shop`;
}

export const helpers = {
    formatClassName,
    getNewLineIndices,
    caculateCartTotal,
    addBrandDetails
};
