import PropTypes from "prop-types";
import styled from "styled-components";

export const Slider = styled.div`
	overflow: hidden;
	width: 100%;
`;

export const Frame = styled.ul.attrs({
	style: ({ left }) => ({
		transform: `translateX(${left}px)`,
	}),
})`
	height: 100%;
	width: ${(props) => props.width}px;
	transition: transform ${(props) => props.duration}ms ease-in-out;
	list-style-type: none;
	margin: 0;
	padding: 0;
	touch-action: pan-x;
`;
Frame.propTypes = {
	width: PropTypes.number.isRequired,
	duration: PropTypes.number.isRequired,
	left: PropTypes.number,
};
Frame.defaultProps = {
	left: 0,
};

export const Slide = styled.li`
	display: inline-block;
	width: ${(props) => (props.width ? `${props.width}px` : "100%")};
`;
Slide.propTypes = {
	width: PropTypes.number,
};
