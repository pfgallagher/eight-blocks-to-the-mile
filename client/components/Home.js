import React, { Component } from "react";
// import { connect } from "react-redux";
import Map from "./Map";
import { fetchGEOJSON } from "./../store/map";
import { connect } from "react-redux";
class Home extends Component {
	componentDidMount() {
		this.props.fetchGEOJSON("neighborhoods");
	}
	render() {
		return (
			<div>
				<Map />
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchGEOJSON: layerName => {
		dispatch(fetchGEOJSON(layerName));
	},
});

export default connect(null, mapDispatchToProps)(Home);
