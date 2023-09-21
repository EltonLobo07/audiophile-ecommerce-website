import { helpers } from "~/helpers";

export function RootHeader() {
    return (
        <header
            className = {helpers.formatClassName(
                `
                    bg-chaos-black
                    text-white
                    py-4
                `
            )}
        >
            Header (todo)
        </header>
    );
}
