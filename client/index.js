import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import Map from "./components/Map";

ReactDOM.render(
	<Provider store={store}>
		<Map />
	</Provider>,
	document.getElementById("app"),
);
