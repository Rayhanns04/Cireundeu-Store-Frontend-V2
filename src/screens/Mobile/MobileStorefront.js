import React, { useContext, useCallback, useMemo, useState } from "react";
import { GlobalContext } from "./../../context/GlobalContext";
import Close from "../../assets/images/close.svg";
import { useQuery } from "react-query";
import axios from "axios";
import StorefrontItem from "../../components/StorefrontItem";

// Fethcing end point
const getStorefront = () => {
	const URL = "https://admin.store.cireundeu.solusi.vip/api/categories";
	const response = axios
		.get(URL)
		.then((res) => res.data.data)
		.catch((e) => console.log(e));

	return response;
};

const MobileStorefront = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { data, isError, isFetching, isSuccess } = useQuery(
		"storefront",
		getStorefront,
		{
			staleTime: 3000,
			refetchIntervalInBackground: 3000,
		}
	);

	const { mobileFilterIsOpen, setMobileFilterIsOpen, setGlobalCategory } =
		useContext(GlobalContext);

	const handlePropsCategoryName = useCallback((value) => {
		setGlobalCategory(value);
		setMobileFilterIsOpen(!mobileFilterIsOpen);
	}, []);

	const handleMappingCategorySelect = useMemo(() => {
		return (
			isSuccess &&
			data.map((item, id) => {
				return (
					<StorefrontItem
						item={item}
						subCategory={item.sub_category}
						getCategoryName={handlePropsCategoryName}
						isOpen={mobileFilterIsOpen}
						setIsOpen={() =>
							setMobileFilterIsOpen(!mobileFilterIsOpen)
						}
					/>
				);
			})
		);
	}, [isSuccess, data, mobileFilterIsOpen]);

	return (
		<div className="mstf__main__container">
			<div className="mstf__container">
				<div className="mstf__header">
					<img
						src={Close}
						alt="close"
						onClick={() =>
							setMobileFilterIsOpen(!mobileFilterIsOpen)
						}
					/>
					<h1>Etalase Toko</h1>
				</div>
				<div className="mstf__border1" />
				<div className="mstf__content">
					{/* render sidebar filter select option */}
					{handleMappingCategorySelect}
				</div>
			</div>
		</div>
	);
};

export default MobileStorefront;
