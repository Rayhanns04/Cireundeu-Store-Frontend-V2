import React, { useContext, useCallback } from "react";
import Products from "../components/Home/Content/Products";
import CarouselContainer from "../components/Home/Header/CarouselContainer";
import MobileSort from "./Mobile/MobileSort";
import { GlobalContext } from "./../context/GlobalContext";
import MobileStorefront from "./Mobile/MobileStorefront";

const Home = () => {
	const {
		mobileSortIsOpen,
		globalSorts,
		setGlobalSorts,
		mobileFilterIsOpen,
	} = useContext(GlobalContext);

	const handlePropsSorts = useCallback(
		(e) => setGlobalSorts(e),
		[globalSorts]
	);

	return (
		<div>
			<div style={{ display: mobileFilterIsOpen ? "block" : "none" }}>
				{/* {isError && <p>There was an error processing your request</p>} */}
				<MobileStorefront />
			</div>

			<div style={{ display: mobileSortIsOpen ? "block" : "none" }}>
				<MobileSort getSorts={handlePropsSorts} />
			</div>

			<div
				style={{
					display:
						mobileSortIsOpen || mobileFilterIsOpen
							? "none"
							: "block",
				}}
			>
				<CarouselContainer />
				<Products />
			</div>
		</div>
	);
};

export default Home;
