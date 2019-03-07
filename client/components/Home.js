import React, { Component } from "react";
// import { connect } from "react-redux";
import Map from "./Map";
import { fetchGEOJSON } from "./../store/map";
import { connect } from "react-redux";
class Home extends Component {
	componentDidMount() {
		this.props.fetchGEOJSON();
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
	fetchGEOJSON: () => {
		dispatch(fetchGEOJSON());
	},
});

export default connect(null, mapDispatchToProps)(Home);
