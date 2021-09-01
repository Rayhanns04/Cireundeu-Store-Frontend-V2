import React from "react";

function Chevron({ fill, width, height, styles }) {
	return (
		<svg
			width={width}
			height={height}
			viewBox="0 0 24 24"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{
				...styles,
			}}
		>
			<path
				d="M15.375 5.25L8.625 12L15.375 18.75"
				stroke={fill}
				stroke-width="2.25"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	);
}

export default Chevron;
