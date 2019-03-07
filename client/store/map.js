import Axios from "axios";
const initialState = {};

const GET_GEOJSON = "GET_GEOJSON";

const getGeoJSON = GEOJSON => ({
	type: GET_GEOJSON,
	GEOJSON,
});

export const fetchGEOJSON = () => async dispatch => {
	try {
		const { data } = await Axios.get("/communityAreas.geojson");
		dispatch(getGeoJSON(data));
	} catch (err) {
		console.error(err);
	}
};

const dispatchers = {
	[GET_GEOJSON]: (state, action) => action.GEOJSON,
};

export default (state = initialState, action) => {
	if (action.type in dispatchers)
		return dispatchers[action.type](state, action);
	return state;
};
