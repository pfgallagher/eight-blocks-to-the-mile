import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { Home } from "./components";

class Routes extends Component {
	render() {
		return (
			<Switch>
				<Route path="/" component={Home} />
			</Switch>
		);
	}
}

export default withRouter(Routes);
