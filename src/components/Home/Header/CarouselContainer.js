import axios from "axios";
import React, { createRef, useEffect, useState } from "react";
import SliderInitiator from "../../Carousel/slider-initiator";

const CarouselContainer = () => {
	const [all, setAll] = useState([]);
	const [images, setImages] = useState([]);

	const handleFetch = () => {
		axios
			.get("https://admin.store.cireundeu.solusi.vip/api/carousels")
			.then((res) => {
				setAll(res.data.data);
			});
	};

	useEffect(() => {
		handleFetch();
	}, []);

	useEffect(() => {
		setImages(all.map(() => createRef()));
	}, [all]);

	useEffect(() => {
		SliderInitiator.init({
			items: images.map((item) => item.current),
			interval: 3000,
		});
	}, [images]);

	return (
		<div className="carousel__main__container">
			<div className="carousel">
				{all.map((item, index) => {
					return (
						<img
							key={index}
							src={`${item.image}`}
							alt="images"
							ref={images[index]}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default CarouselContainer;
