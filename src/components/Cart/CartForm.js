import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { connect } from "react-redux";
import "../../sass/main.scss";
import Swal from "sweetalert2";

const getPhoneNumber = () => {
	const URL = "https://admin.store.cireundeu.solusi.vip/api/phones";
	const response = axios
		.get(URL)
		.then((res) => res.data.data)
		.catch((e) => console.log(e));

	return response;
};

const getPaymentTypes = () => {
	const URL = "https://admin.store.cireundeu.solusi.vip/api/typeofpayment";
	const response = axios
		.get(URL)
		.then((res) => res.data.data)
		.catch((e) => console.log(e));

	return response;
};

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

const CartForm = ({ cart, totalFee, cartCount, shippingFee }) => {
	const [paymentMethod, setPaymentMethod] = useState("");
	const [fullName, setFullName] = useState("");
	const [address, setAddress] = useState("");
	const [dynamicLink, setDynamicLink] = useState();

	const { data, isSuccess } = useQuery("phoneNumber", getPhoneNumber, {
		staleTime: 3000,
		refetchIntervalInBackground: 3000,
	});

	const { data: typeOfPayments, isSuccess: isSuccessTypesofPayments } =
		useQuery("typeofpayments", getPaymentTypes, {
			staleTime: 3000,
			refetchIntervalInBackground: 3000,
		});

	// ----- Wa Chat Generator -----
	const GreetingWA = () => {
		let greeting = encodeURIComponent(` ${greetingGenerator()} Kak`);
		return greeting;
	};

	const loopingInvoice = () => {
		const phone =
			isSuccess &&
			data?.map((item) => {
				return item.name;
			});

		const MessageMap = cart.map((item) => {
			let msg =
				decodeURIComponent(`%E2%9C%85`) +
				decodeURIComponent(`%0D%0A`) +
				encodeURIComponent(
					` ${item.title} *QTY*: ${item.qty} HARGA: ${convertToRupiah(
						item.price * item.qty
					)}`
				);

			let combineMsg = "%0D%0A" + msg + "%0D%0A";

			return combineMsg;
		});

		const DetailShipping = () => {
			let biodata =
				encodeURIComponent(`*Nama Lengkap       :* ${fullName}`) +
				"%0D%0A" +
				encodeURIComponent(`*Alamat             :* ${address}`) +
				"%0D%0A" +
				encodeURIComponent(`*Jenis Pengiriman   :* ${paymentMethod}`);

			return biodata;
		};

		const TotalPembayaranWA = () => {
			let totalPembayaran =
				"%0D%0A" +
				encodeURIComponent(
					`*BIAYA PENGANTARAN :* ${convertToRupiah(shippingFee)}`
				) +
				"%0D%0A" +
				encodeURIComponent(
					`*TOTAL PEMBAYARAN :* ${convertToRupiah(totalFee)}`
				);

			let totalQty = encodeURIComponent(`*JUMLAH BARANG:* ${cartCount}`);

			return "%0D%0A" + totalQty + totalPembayaran;
		};

		const generateItem = () => {
			let urlWA = `https://api.whatsapp.com/send?phone=62${phone}&text=${GreetingWA()}%0D%0A%0D%0A${DetailShipping()}%0D%0A%0D%0AList%20Pesanan%20:${MessageMap}${TotalPembayaranWA()}`;
			return urlWA;
		};

		return generateItem();
	};

	const greetingGenerator = () => {
		var h = new Date().getHours();
		if (h >= 4 && h < 10) return "*Selamat pagi,*";
		if (h >= 10 && h < 15) return "*Selamat siang,*";
		if (h >= 15 && h < 18) return "*Selamat sore,*";
		if (h >= 18 || h < 4) return "*Selamat malam,*";

		return h;
	};

	const validationButton = () => {
		if (totalFee === 0) {
			Swal.fire({
				icon: "error",
				title: "Mohon Maaf",
				text: "Keranjang anda masih kosong!",
			});
			setDynamicLink(null);
		} else if (fullName === "" && paymentMethod === "" && address === "") {
			Swal.fire({
				icon: "error",
				title: "Mohon Maaf",
				text: "Mohon lengkapi form pengiriman!",
			});
		} else {
			setDynamicLink(loopingInvoice());
		}
	};

	return (
		<div className="crt__right">
			<div className="crt__right__content">
				<div className="crt__right__top">
					<div className="crt__right__input">
						<label htmlFor="name of shipping">
							Name of shipping
						</label>
						<input
							type="text"
							name="name of shipping"
							placeholder="Nama Lengkap"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
						/>
					</div>
					<div className="crt__right__input">
						<label htmlFor="Type of payment">Type of payment</label>

						<select
							placeholder="Payment"
							onChange={(e) => setPaymentMethod(e.target.value)}
							name="Type of payment"
							value={paymentMethod}
						>
							{isSuccessTypesofPayments &&
								typeOfPayments.map((item, id) => {
									return (
										<option value={item.name}>
											{item.name}
										</option>
									);
								})}
						</select>
					</div>

					<div className="crt__right__input">
						<label htmlFor="name of shipping">
							Address of shipping
						</label>
						<textarea
							rows="10"
							cols="40"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Alamat Pengiriman"
						/>
					</div>
				</div>

				<div className="crt__right__bottom">
					<button onClick={validationButton}>
						<a href={dynamicLink} target="_blank" rel="noreferrer">
							Make Payment
						</a>
					</button>
					<button>Cancel</button>
				</div>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	cart: state.shop.cart,
});

export default connect(mapStateToProps)(CartForm);
