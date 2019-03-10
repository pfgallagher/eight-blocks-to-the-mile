import { createStore, combineReducers, applyMiddleware } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import map from "./map";

const reducer = combineReducers({
	map,
});
const middleware = composeWithDevTools(
	applyMiddleware(
		thunkMiddleware,
		createLogger({
			collapsed: true,
		}),
	),
);
const store = createStore(reducer, middleware);

export default store;
