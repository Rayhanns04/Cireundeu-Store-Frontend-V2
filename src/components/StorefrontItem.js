import React, { useCallback, useState } from "react";
import Package from "../assets/images/default-package.svg";
import ChevronUp from "../assets/images/chevron-black-up.svg";
import ChevronDown from "../assets/images/chevron-black-down.svg";

const StorefrontItem = ({ subCategory, item, getCategoryName, setIsOpen }) => {
	const [isOpenSub, setIsOpenSub] = useState(false);

	const handleClickSub = useCallback(() => {
		setIsOpenSub(!isOpenSub);
	}, [isOpenSub]);

	const imageStateValidation = useCallback(() => {
		if (!isOpenSub) return ChevronDown;
		return ChevronUp;
	}, [isOpenSub]);

	return (
		<div>
			{/* header */}
			<div
				key={item.id}
				className="mstf__content__item"
				onClick={handleClickSub}
			>
				<img src={Package} alt="package" />
				<div className="mstf__item__footer">
					<div className="mstf__item__footer__left">
						<p>{item.name}</p>

						<img src={imageStateValidation()} alt="chevron" />
					</div>

					<div className="mstf__border1 footer" />
				</div>
			</div>

			{/* Sidebar item title */}
			<div
				className="mstf__content__item"
				style={{
					display: isOpenSub ? "block" : "none",
				}}
				onClick={() => {
					getCategoryName(item.name);

					setTimeout(() => {
						return setIsOpen();
					}, 500);
				}}
			>
				<div className="mstf__item__footer sub">
					<div className="mstf__item__footer__left">
						<p className="mstf__subtext">
							{item.name ? "Semua Produk" : ""}
						</p>
					</div>

					<div className="mstf__border1 footer" />
				</div>
			</div>

			{/* Sidebar subitems */}
			{subCategory.map((itemSub, index) => {
				return (
					<div
						key={index}
						className="mstf__content__item"
						style={{
							display: isOpenSub ? "block" : "none",
						}}
						onClick={() => {
							getCategoryName(itemSub.name);

							setTimeout(() => {
								return setIsOpen();
							}, 500);
						}}
					>
						<div className="mstf__item__footer sub">
							<div className="mstf__item__footer__left">
								<p className="mstf__subtext">{itemSub.name}</p>
							</div>

							<div className="mstf__border1 footer" />
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default StorefrontItem;
