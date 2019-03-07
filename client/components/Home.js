import React, { Component } from "react";
// import { connect } from "react-redux";
import Map from "./Map";

class Home extends Component {
	render() {
		return (
			<div>
				<Map />
			</div>
		);
	}
}

export default // connect(mapStateToProps)
Home;
