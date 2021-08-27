import React, { useEffect, useState } from "react";
import ShoppingCart from "../../../assets/images/shopping-cart.svg";

import "../../../sass/main.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Navbar = ({ cart }) => {
	const [cartCount, setCartCount] = useState(0);

	// const _changeNavbarStatus = () => {
	// 	if (window.scrollY >= 80) {
	// 		setNavbarStatus(true);
	// 	}

	// 	setNavbarStatus(false);
	// };

	// window.addEventListener("scroll", _changeNavbarStatus);

	useEffect(() => {
		let count = 0;

		cart.map((item) => (count += item.qty));

		setCartCount(count);
	}, [cart, cartCount]);

	return (
		<div className="nv__main__container">
			<div className="nv__container">
				<NavLink to="/" className="nv__logo">
					<h2 className="nv__logo">CIREUNDEU STORE</h2>
				</NavLink>

				<NavLink to="/cart" className="nav__right__item">
					<img src={ShoppingCart} alt="shopping cart" />

					<div className="nv__cartcount__container">
						<p>{cartCount}</p>
					</div>
				</NavLink>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	cart: state.shop.cart,
});

export default connect(mapStateToProps)(Navbar);
