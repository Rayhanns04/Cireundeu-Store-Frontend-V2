// import React, { useState } from "react";
// import Close from "../assets/images/close.svg";
// import "../sass/main.scss";
// import Twitter from "../assets/images/Twitter.svg";
// import Facebook from "../assets/images/Facebook-square.svg";
// import Whatsapp from "../assets/images/Whatsapp.svg";
// import Youtube from "../assets/images/YouTube - Negative.svg";

// const DetailMenuPopup = ({
//   title,
//   type,
//   desc,
//   price,
//   img,
//   isOpen,
//   isClosed,
//   id,
//   addToCart,
// }) => {
//   const [qtyCount, setQty] = useState(1);
//   let qty = parseInt(qtyCount);

//   const convertToRupiah = (angka) => {
//     var rupiah = "";
//     var angkarev = angka.toString().split("").reverse().join("");
//     for (var i = 0; i < angkarev.length; i++)
//       if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
//     return (
//       "Rp" +
//       rupiah
//         .split("", rupiah.length - 1)
//         .reverse()
//         .join("")
//     );
//   };

//   return (
//     <div
//       className={isOpen ? "dmp__ms__container active" : "dmp__ms__container"}
//     >
//       <div className="dmp__toggle__close" onClick={isClosed}>
//         <img src={Close} alt="tutup" />
//       </div>
//       <div className="dmp__container">
//         <div className="dmp__left">
//           <img src={img} alt={title} />
//         </div>

//         <div className="dmp__right">
//           <p>{type}</p>
//           <h1>{title}</h1>

//           <p>{convertToRupiah(price)}</p>

//           <p>{desc}</p>

//           <div
//             className="dmp__toggle__container"
//             onClick={() => addToCart(id, qty)}
//           >
//             <input
//               type="number"
//               value={qtyCount}
//               onChange={(e) => setQty(e.target.value)}
//             />
//             <button>Keranjang</button>
//           </div>

//           <div className="dmp__socialmedia__container">
//             <p>Share with friends</p>
//             <div className="dmp__socialmedia__itemcontainer">
//               <img src={Twitter} alt="Twitter" />
//               <img src={Facebook} alt="Facebook" />
//               <img src={Whatsapp} alt="Whatsapp" />
//               <img src={Youtube} alt="Youtube" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DetailMenuPopup;
