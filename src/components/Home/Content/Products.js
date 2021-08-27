import React, { useCallback, useContext, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import Dropdown from "../../Dropdown";
import ProductItem from "./ProductItem";
import Ripple from "../../Ripple";
import MiniDragable from "./MiniDragable";
import axios from "axios";

// ========= assets
import Search from "../../../assets/images/search.svg";
import DropdownFilterProduct from "../../DropdownFilterProduct";
import ChevronUpBlack from "../../../assets/images/chevron-black-up.svg";
import ChevronDownBlack from "../../../assets/images/chevron-black-down.svg";
import Plus from "../../../assets/images/Plus.svg";
import Minus from "../../../assets/images/Minus.svg";
import Cart from "../../../assets/images/cart.svg";

import "../../../sass/main.scss";
import { GlobalContext } from "../../../context/GlobalContext";

const getStorefront = () => {
	const URL = "https://admin.store.cireundeu.solusi.vip/api/categories";
	const response = axios
		.get(URL)
		.then((res) => res.data.data)
		.catch((e) => console.log(e));

	return response;
};

const DropDownConfig = {
	// ============== styled background
	background: "#5f66fc",

	// ============== styled dropdown
	dropdown_width: 100,
	dropdown_mb: 6,

	// ============== styled inputselect
	inputselect_paddingtb: 5,
	inputselect_paddingrl: 9,
	inputselect_radius: 5,

	// ============== styled select
	select_top: -10,
	select_paddingtop: 10,
	select_borderadiustl: 0,
	select_borderadiustr: 0,
	select_borderadiusbr: 7,
	select_borderadiusbl: 7,

	// ============== styled title
	title_weight: 600,
	title_fontsize: 14,

	// ============== styled chevron
	chevron_right: 20,
	chevron_bottom: 30,

	// ============== styled optionitem
	optionitem_ptb: 18,
	optionitem_plr: 20,
};

const DropDownConfigSort = {
	// ============== styled dropdown
	dropdown_width: 15.5,
	dropdown_mb: 6,

	// ============== styled inputselect
	inputselect_paddingtb: 12,
	inputselect_paddingrl: 12,
	inputselect_radius: 10,

	// ============== styled select
	select_top: -10,
	select_paddingtop: 10,
	select_borderadiustl: 10,
	select_borderadiustr: 10,
	select_borderadiusbr: 10,
	select_borderadiusbl: 10,

	// ============== styled title
	title_weight: 400,
	title_fontsize: 14,

	// ============== styled chevron
	chevron_right: 20,
	chevron_bottom: 30,

	// ============== styled optionitem
	optionitem_ptb: 18,
	optionitem_plr: 20,
};

// Productst ============================================================
const Products = () => {
	// ===================== State
	const [isOpen, setIsOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");

	const {
		mobileSortIsOpen,
		setMobileSortIsOpen,
		globalSorts,
		setGlobalSorts,
		globalOptionValue,
		globalCategory,
		setGlobalCategory,
		mobileFilterIsOpen,
		setMobileFilterIsOpen,
	} = useContext(GlobalContext);

	const { data, isError, isFetching, isSuccess } = useQuery(
		"storefront",
		getStorefront,
		{
			staleTime: 3000,
			refetchIntervalInBackground: 3000,
		}
	);

	//====================== Function
	const handlePropsCategoryName = useCallback(
		(value) => setGlobalCategory(value),
		[]
	);

	// Sidebar filter
	const handleMappingCategorySelect = useMemo(() => {
		return (
			isSuccess &&
			data.map((item, id) => {
				return (
					<Dropdown
						DropDownConfig={DropDownConfig}
						category={item.name}
						subcategory={item.sub_category}
						getCategoryName={handlePropsCategoryName}
					/>
				);
			})
		);
	}, [isSuccess, data]);

	const handlePropsSorts = useCallback(
		(e) => setGlobalSorts(e),
		[globalSorts]
	);

	const handleClick = useCallback(() => {
		setIsOpen(!isOpen);
	}, [isOpen]);

	const imegStateValidation = useCallback(() => {
		if (!isOpen) return ChevronDownBlack;

		return ChevronUpBlack;
	}, [isOpen]);

	//  ====================== Configuration

	return (
		<div className="prd__main__container">
			<div className="prd__container">
				{/* Draggable component */}
				<MiniDragable />
				<div className="prd__container__left">
					<h2 onClick={() => setGlobalCategory("")}>
						Pilih Kategori
					</h2>

					<div className="left__ctgr__dropdown">
						{isError && (
							<p>There was an error processing your request</p>
						)}
						{handleMappingCategorySelect}
					</div>
				</div>
				<div className="prd__container__right">
					{/* ============= Category Container */}
					<div className="prd__container__header">
						{/* ========== Input */}
						<div className="prd__container__searchmobile">
							<input
								type="text"
								placeholder="Cari produk ..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
							<img src={Search} alt="search" />
						</div>

						{/* Responsive filtering */}
						<div className="prd__ctgr__container">
							<Link
								className="ctgr__link"
								onClick={() =>
									setMobileFilterIsOpen(!mobileFilterIsOpen)
								}
							>
								<p>Etalase Toko</p>
								<img src={ChevronDownBlack} alt="chveron" />
							</Link>

							<Link
								className="ctgr__link"
								onClick={() =>
									setMobileSortIsOpen(!mobileSortIsOpen)
								}
							>
								<p>Urutkan</p>
								<img src={ChevronDownBlack} alt="chveron" />
							</Link>
						</div>

						<div className="dropdownfilter">
							<DropdownFilterProduct
								imegStateValidation={imegStateValidation}
								isOpen={isOpen}
								handleClick={handleClick}
								optionValue={globalOptionValue}
								DropDownConfig={DropDownConfigSort}
								getSorts={handlePropsSorts}
							/>
						</div>
					</div>
					{/* ============= products item container */}
					<ProductItem
						searchTerm={searchTerm}
						Plus={Plus}
						Minus={Minus}
						Cart={Cart}
						categoryName={globalCategory}
						sorts={globalSorts}
					/>
					{isFetching && (
						<div className="prd__container__loading">
							<Ripple
								color="#8a3730"
								style={{ transform: " scale(0.7)" }}
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Products;
