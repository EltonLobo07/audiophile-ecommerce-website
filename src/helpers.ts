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

export const helpers = {
    formatClassName,
    getNewLineIndices
};
