import React, { Component } from "react";
import Map from "./Map";
import { fetchGEOJSON } from "./../store/map";
import { connect } from "react-redux";
class Home extends Component {
	componentDidMount() {
		this.props.fetchGEOJSON("majorStreets");
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
