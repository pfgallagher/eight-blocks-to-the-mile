import Axios from "axios";

// Action Types
const GET_GEOJSON = "GET_GEOJSON";
const ADD_LAYER = "ADD_LAYER";

// Action Creators
const getGEOJSON = layer => ({
	type: GET_GEOJSON,
	layer,
});

const addLayer = layer => ({
	type: ADD_LAYER,
	layer,
});

// Thunks
export const fetchGEOJSON = layerName => async dispatch => {
	try {
		const { data } = await Axios.get(`/api/layers/${layerName}`);
		dispatch(getGEOJSON(data));
	} catch (err) {
		console.error(err);
	}
};
// Reducer
const initialState = {
	fetchedLayers: [],
	selectedLayers: [],
};

const dispatchers = {
	[GET_GEOJSON]: (state, action) => ({
		...state,
		fetchedLayers: [...state.fetchedLayers, action.layer],
	}),
	[ADD_LAYER]: (state, action) => {
		if (action.layer.name in state.fetchedLayers)
			return {
				...state,
				selectedLayers: [
					...state.selectedLayers,
					state.fetchedLayers[action.layer.name],
				],
			};
		fetchGEOJSON(action.layer.name);
		return {
			...state,
			selectedLayers: [
				...state.selectedLayers,
				state.fetchedLayers[action.layer.name],
			],
		};
	},
};

export default (state = initialState, action) => {
	if (action.type in dispatchers)
		return dispatchers[action.type](state, action);
	return state;
};
