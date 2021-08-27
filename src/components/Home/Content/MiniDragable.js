import React, { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import Cart from "../../../assets/images/shopping-cart-white.svg";

import Draggable from "react-draggable";
import { Link } from "react-router-dom";

const MiniDragable = ({ cart }) => {
	const [cartCount, setCartCount] = useState(0);

	let count = 0;

	useEffect(() => {
		cart.map((item) => (count += item.qty));
		setCartCount(count);
	}, [cart, count]);

	const MiniDragableContainer = styled.div`
		position: absolute;
		bottom: 0;
		right: 0;
		z-index: 999;

		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;

		background-color: #8a3730;
		padding: 12px 18px;
		border-radius: 27px;
		box-shadow: 8px 5px 16px rgba(0, 0, 0, 0.15);

		transition: all 300ms;
	`;

	const Title = styled.p`
		margin-left: 8px;
		font-family: "Poppins", sans-serif;
		font-weight: 700;
		font-size: map-get($fonts-sizes, s-small-regular);
		color: white;
	`;

	return (
		<Draggable bounds="parent">
			<MiniDragableContainer>
				<Link to="/cart" style={{ width: "100%" }}>
					<img src={Cart} alt="shopping-cart" />
					<Title>{cartCount}</Title>
				</Link>
			</MiniDragableContainer>
		</Draggable>
	);
};

const mapStateToProps = (state) => ({
	cart: state.shop.cart,
});

export default connect(mapStateToProps)(MiniDragable);
