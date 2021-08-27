import React, { useState } from "react";
import Footer from "./components/Home/Content/Footer";
import Alert from "./components/Home/Header/Alert";
import Navbar from "./components/Home/Header/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";

import "./sass/main.scss";
import Home from "./screens/Home";
import Cta from "./components/Home/Content/Cta";
import { Provider } from "react-redux";
import store from "./redux/store";
import Cart from "./components/Cart/Cart";
import { ReactQueryDevtools } from "react-query/devtools";
import { GlobalContext } from "./context/GlobalContext";

const queryClient = new QueryClient();

const App = () => {
	const [mobileSortIsOpen, setMobileSortIsOpen] = useState(false);
	const [mobileFilterIsOpen, setMobileFilterIsOpen] = useState(false);
	const [globalSorts, setGlobalSorts] = useState("Terbaru");
	const [globalOptionValue] = useState("Terbaru");
	const [globalCategory, setGlobalCategory] = useState("");

	return (
		<QueryClientProvider client={queryClient}>
			<Provider store={store}>
				<GlobalContext.Provider
					value={{
						mobileSortIsOpen,
						setMobileSortIsOpen,
						mobileFilterIsOpen,
						setMobileFilterIsOpen,
						globalSorts,
						setGlobalSorts,
						globalOptionValue,
						globalCategory,
						setGlobalCategory,
					}}
				>
					<Router>
						<div className="app__ms__container">
							<div className="app__headers">
								<div className="app__alert__container">
									<Alert />
								</div>

								<hr />
								<div className="app__navbar__container">
									<Navbar />
								</div>
							</div>

							<Switch>
								<Route path="/cart">
									<Cart />
								</Route>
								<Route path="/" exact>
									<Home />
								</Route>
							</Switch>

							<div className="app__bottom">
								<Cta />
								<Footer />
							</div>
						</div>
					</Router>
				</GlobalContext.Provider>
				{/* <ReactQueryDevtools /> */}
			</Provider>
		</QueryClientProvider>
	);
};

export default App;
