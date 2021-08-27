import React from "react";
import CtaData from "../../../api/CtaData.json";

let RenderCta = CtaData.map((item, index) => {
	return (
		<div className="cta__item" key={index}>
			<div className="cta__item__left">
				<img src={item.image} alt="" />
			</div>
			<div className="cta__vl" />
			<div className="cta__item__right">
				<h3>{item.name}</h3>
				<p>{item.desc}</p>
			</div>
		</div>
	);
});

const Cta = () => {
	return (
		<div className="cta__ms__container">
			<div className="cta__main__container">
				<div className="cta__item__container">{RenderCta}</div>
			</div>
		</div>
	);
};

export default Cta;
