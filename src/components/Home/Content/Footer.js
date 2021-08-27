import React from "react";
import Love from "../../../assets/images/love.svg";
import "../../../sass/main.scss";

const Footer = () => {
	return (
		<div className="ftr__ms__container">
			<div className="ftr__content">
				<div className="ftr__left">
					<p>Made with</p>
					<img src={Love} alt="I Love Dapur Rasha" />
					<p>by Designing World</p>
				</div>

				<h3>CIREUNDEU STORE</h3>
			</div>
		</div>
	);
};

export default Footer;
