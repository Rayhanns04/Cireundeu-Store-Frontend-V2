import React, { useEffect, createRef, memo } from "react";
import { connect, useDispatch } from "react-redux";
import axios from "axios";
import {
	addToCart,
	getProductsSuccess,
} from "../../../redux/Shopping/Shopping-action";

const ProductItem = ({
	products,
	searchTerm,
	Plus,
	Minus,
	Cart,
	handleAddToCart,
	categoryName,
	sorts,
}) => {
	const dispatch = useDispatch();

	const getFromApi = () => {
		return axios
			.get("https://admin.store.cireundeu.solusi.vip/api/products")
			.then((res) => dispatch(getProductsSuccess(res.data.data)))
			.catch((e) => console.log(e));
	};

	useEffect(() => {
		getFromApi();
	}, []);

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

	return (
		<div className="prd__container__items">
			{products
				.filter((val) => {
					if (categoryName === "") {
						return val;
					} else if (val.sub_category === categoryName) {
						return val;
					} else if (val.category === categoryName) {
						return val;
					}
				})
				.filter((val) => {
					if (searchTerm === "") {
						return val;
					} else if (
						val.title
							.toLowerCase()
							.includes(searchTerm.toLowerCase())
					) {
						return val;
					}
				})
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

					const publicPath = "productsImage";

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
									<input
										type="number"
										ref={qtyRef}
										value={qty}
									/>
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
				})}
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
