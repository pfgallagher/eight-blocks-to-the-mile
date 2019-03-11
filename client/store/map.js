import Axios from "axios";

// Action Types
const GET_GEOJSON = "GET_GEOJSON";
const REMOVE_LAYER = "REMOVE_LAYER";

// Action Creators
const getGEOJSON = layer => ({
	type: GET_GEOJSON,
	layer,
});

export const removeLayer = layer => ({
	type: REMOVE_LAYER,
	layer,
});

// Thunks
export const fetchLayer = layerName => async dispatch => {
	try {
		const { data } = await Axios.get(`/api/layers/${layerName}`);
		dispatch(getGEOJSON(data));
	} catch (err) {
		console.error(err);
	}
};
// Reducer
const initialState = [];

const dispatchers = {
	[GET_GEOJSON]: (state, action) => [...state, action.layer],
	[REMOVE_LAYER]: (state, action) => [
		...state.filter(el => el.name !== action.layer),
	],
};

export default (state = initialState, action) => {
	if (action.type in dispatchers)
		return dispatchers[action.type](state, action);
	return state;
};
