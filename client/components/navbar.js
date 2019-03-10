import React from "react";
import { Link } from "react-router-dom";

const Navbar = props => (
	<div>
		<h1>BOILERMAKER</h1>
		<nav>
			<div>
				<Link to="/home">Home</Link>
			</div>
		</nav>
		<hr />
	</div>
);

export default Navbar;
