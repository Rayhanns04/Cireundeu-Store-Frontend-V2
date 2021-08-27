import React, { useContext } from "react";
import Close from "../../assets/images/close.svg";
import NewIcon from "../../assets/images/New.svg";
import LowerPriceIcon from "../../assets/images/LowerPrice.svg";
import HighPriceIcon from "../../assets/images/dollar 1.svg";
import "../../sass/main.scss";
import { GlobalContext } from "../../context/GlobalContext";

const MobileSort = ({ getSorts }) => {
	const items = [
		{
			id: 1,
			name: "Terbaru",
			icon: NewIcon,
		},
		{
			id: 2,
			name: "Harga Tertinggi",
			icon: HighPriceIcon,
		},
		{
			id: 3,
			name: "Harga Terendah",
			icon: LowerPriceIcon,
		},
	];

	const { mobileSortIsOpen, setMobileSortIsOpen } = useContext(GlobalContext);

	return (
		<div className="msort__main__container">
			<div className="msort__container">
				<div className="msort__header">
					<img
						src={Close}
						alt="close"
						style={{ cursor: "pointer" }}
						onClick={() => setMobileSortIsOpen(!mobileSortIsOpen)}
					/>
					<h1>Urutkan</h1>
				</div>
				<div className="msort__border1" />
				<div className="msort__content">
					{items.map((item, id) => {
						return (
							<div
								className="msort__content__item"
								key={id}
								onClick={() => {
									getSorts(item.name);

									// back to home
									setTimeout(() => {
										setMobileSortIsOpen(!mobileSortIsOpen);
									}, 500);
								}}
							>
								<img src={item.icon} alt={item.name} />
								<div className="msort__item__footer">
									<p>{item.name}</p>
									<div className="msort__border1" />
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default MobileSort;
