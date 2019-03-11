import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import Map from "./components/Map";

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route path="/" component={Map} />
			</Switch>
		);
	}
}

export default withRouter(Routes);
