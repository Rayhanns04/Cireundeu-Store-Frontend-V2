import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
	addQty,
	removeFromCart,
	subQty,
} from "../../redux/Shopping/Shopping-action";
import Plus from "../../assets/images/Plus.svg";
import Minus from "../../assets/images/minus-brown.svg";
import Trash from "../../assets/images/trash.svg";
import CartForm from "./CartForm";
import "../../sass/main.scss";
import axios from "axios";

const convertToRupiah = (angka) => {
	var rupiah = "";
	var angkarev = angka.toString().split("").reverse().join("");
	for (var i = 0; i < angkarev.length; i++)
		if (i % 3 === 0) rupiah += angkarev.substr(i, 3) + ".";
	return (
		"Rp" +
		rupiah
			.split("", rupiah.length - 1)
			.reverse()
			.join("")
	);
};

const formatNumber = (num) => {
	return Intl.NumberFormat("id-Id").format(num);
};

const Cart = ({ cart, handleAddQty, handleSubQty, handleRemoveFromCart }) => {
	const [subPrice, setSubPrice] = useState(0);
	const [cartCount, setCartCount] = useState("0");
	const [fee, setFee] = useState();

	const getFromApi = () => {
		return axios
			.get("https://admin.store.cireundeu.solusi.vip/api/fee")
			.then((res) => setFee(res.data.data[0].amount))
			.catch((e) => console.log(e));
	};

	console.log(fee && fee);

	useEffect(() => {
		getFromApi();
	}, []);

	const calculateShippingFee = () => {
		let ShippingFee = 0;

		ShippingFee += subPrice * (fee / 100);

		return ShippingFee;
	};

	const calculateTotalFee = () => {
		return calculateShippingFee() + subPrice;
	};

	let RenderItems = cart.map((item, id) => {
		const publicPath = "productsImage";
		return (
			<div className="crt__sigle__item" key={id}>
				<div className="crt__sigle__top">
					<img src={`${item.image}`} alt={item.title} />
					<div className="crt__sigle__head">
						<h3>{item.title}</h3>
						<p>{item.desc}</p>
					</div>
				</div>

				<div className="crt__sigle__information">
					<div className="crt__sigle__toggle">
						<div
							className="crt__sigle__btn __min"
							onClick={() => handleSubQty(item.id, item.qty)}
						>
							<img src={Minus} alt="Kurang" />
						</div>

						<input type="text" value={item.qty} />

						<div
							className="crt__sigle__btn __plus"
							onClick={() => handleAddQty(item.id, item.qty)}
						>
							<img src={Plus} alt="Tambah" />
						</div>
					</div>

					<h4>Rp {formatNumber(item.price)}</h4>

					<div
						className="crt__sigle__btnDel"
						onClick={() => handleRemoveFromCart(item.id)}
					>
						<img src={Trash} alt="Hapus item" />
					</div>
				</div>
				<hr />
			</div>
		);
	});

	useEffect(() => {
		let count = 0;
		let price = 0;

		cart.map((item) => (count += item.qty));
		cart.map((item) => (price += item.qty * item.price));

		setCartCount(count);
		setSubPrice(price);
	}, [cart, cartCount, subPrice]);

	return (
		<div className="crt__ms__container">
			<div className="crt__container">
				<div className="crt__left">
					<div className="crt__item__container">{RenderItems}</div>

					<hr className="hr__border" />

					{/* ----- Payment Detail Information ----- */}
					<div className="crt__pay__information">
						<div className="crt__pay__content">
							<h4>Sub total</h4>
							<p>{convertToRupiah(subPrice)}</p>
						</div>
						<div className="crt__pay__content">
							<h4>Shipping fees</h4>
							<p>{convertToRupiah(calculateShippingFee())}</p>
						</div>
						<div className="crt__pay__content">
							<h4>Total</h4>
							<p>{convertToRupiah(calculateTotalFee())}</p>
						</div>
					</div>
				</div>

				<CartForm
					totalFee={calculateTotalFee()}
					cartCount={cartCount}
					shippingFee={calculateShippingFee()}
				/>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	cart: state.shop.cart,
});

const mapDispatchToProps = (dispatch) => ({
	handleAddQty: (id, qty) => dispatch(addQty(id, qty)),
	handleSubQty: (id, qty) => dispatch(subQty(id, qty)),
	handleRemoveFromCart: (id) => dispatch(removeFromCart(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
