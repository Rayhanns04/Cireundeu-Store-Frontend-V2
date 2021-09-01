import React, { useEffect, createRef, memo, useState } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import {
	addToCart,
	getProductsSuccess,
} from "../../../redux/Shopping/Shopping-action";
import Chevron from "../../../assets/images/Chevron";
import ReactPaginate from "react-paginate";

const ProductItem = ({
	products,
	searchTerm,
	Plus,
	Minus,
	Cart,
	handleAddToCart,
	categoryName,
	sorts,
	page,
}) => {
	const dispatch = useDispatch();
	const [totalProduct, setTotalProduct] = useState();
	const [perPage, setPerPage] = useState();

	const getFromApi = (current_page) => {
		return axios
			.get(
				`https://admin.store.cireundeu.solusi.vip/api/products?page=${current_page}&per_page=40&sub=${categoryName}&title=${searchTerm}`
			)
			.then((res) => {
				dispatch(getProductsSuccess(res.data.data));
				setTotalProduct(res.data.pagination.product_total);
				setPerPage(res.data.pagination.per_page);
			})
			.catch((e) => console.log(e));
	};

	const paginationLenght = Math.ceil(totalProduct / perPage);

	useEffect(() => {
		getFromApi();
	}, [categoryName, searchTerm]);

	const handlePageClick = (data) => {
		console.log(data.selected + 1);
		let current_page = data.selected + 1;

		return getFromApi(current_page);
	};

	// convert to rupiah
	const convertToRupiah = (angka) => {
		var rupiah = "";
		var angkarev = angka.toString().split("").reverse().join("");
		for (var i = 0; i < angkarev.length; i++)
			if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + ".";
		return (
			"Rp " +
			rupiah
				.split("", rupiah.length - 1)
				.reverse()
				.join("")
		);
	};

	// render item
	const handleRenderItem = () => {
		const productsFiltered = products
			.sort((a, b) => {
				switch (sorts) {
					case "Terbaru":
						let dateA = new Date(a.created);
						let dateB = new Date(b.created);

						return dateB - dateA;

					case "Harga Tertinggi":
						return b.price - a.price;

					case "Harga Terendah":
						return a.price - b.price;

					default:
						return a.created < b.created;
				}
			})
			.map((item, id) => {
				const qtyRef = createRef();
				let qty = 1;

				const handleIncrement = () => {
					qtyRef.current.value = ++qty;
				};

				const handleDecrement = () => {
					if (qty === 1) {
						return;
					}
					qtyRef.current.value = --qty;
				};

				return (
					<div className="prd__container__singleitem" key={id}>
						{/* ========== thumb */}
						<img
							className="prd__singleitem__thumb"
							src={`${item.image}`}
							alt=""
						/>

						<div className="prd__singleitem__content">
							<h4>
								{item.title} {item.image}
							</h4>
							<p>{convertToRupiah(item.price)}</p>
						</div>

						<div className="prd__singleitem__action">
							<div className="prd__action__fastqty">
								<div
									className="prd__fastqty__min"
									onClick={handleDecrement}
								>
									<img src={Minus} alt="minus" />
								</div>
								<input type="number" ref={qtyRef} value={qty} />
								<div
									className="prd__fastqty__plus"
									onClick={handleIncrement}
								>
									<img src={Plus} alt="plus" />
								</div>
							</div>

							<div
								className="prd__action__add"
								onClick={() =>
									handleAddToCart(item.id, parseInt(qty))
								}
							>
								<img src={Cart} alt="cart" />
							</div>
						</div>
					</div>
				);
			});

		return productsFiltered;
	};

	return (
		<div>
			<div className="prd__container__items">{handleRenderItem()}</div>

			<ReactPaginate
				previousLabel={
					<Chevron width={24} height={24} fill="#DBDEE2" />
				}
				nextLabel={
					<Chevron
						width={24}
						height={24}
						fill="#828282"
						styles={{ transform: "rotate(-180deg)" }}
					/>
				}
				breakLabel={"..."}
				pageCount={paginationLenght}
				marginPagesDisplayed={1}
				pageRangeDisplayed={6}
				onPageChange={handlePageClick}
				initialPage={0}
				containerClassName={"pagination__container"}
				pageLinkClassName={"pagination__a"}
				previousClassName={"pagination__prev"}
				nextClassName={"pagination__next"}
				activeClassName={"pagination__active"}
				breakClassName={"break-me"}
			/>
		</div>
	);
};

const mapStateToProps = (state) => ({
	products: state.shop.products,
});

const mapDispatchToProps = (dispatch) => ({
	handleAddToCart: (id, qty) => dispatch(addToCart(id, qty)),
});

export default memo(connect(mapStateToProps, mapDispatchToProps)(ProductItem));
