import { helpers } from "~/src/helpers";
import { twStyles } from "~/src/app/tw-styles";

export default function Page() {
	return (
		<div
			className = {helpers.formatClassName(
				`
					bg-blue-500
					${twStyles.H1}
				`
			)}
		>
			main content
		</div>
	);
}
