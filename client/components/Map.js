import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";
import React, { Component } from "react";
// import ReactDOM from "react-dom";
class Map extends Component {
	constructor() {
		super();
		this.state = {
			lat: 41.8781,
			lng: -87.6298,
			zoom: 15,
		};
	}

	render() {
		const position = [this.state.lat, this.state.lng];
		return (
			<LeafletMap center={position} zoom={this.state.zoom}>
				<TileLayer
					attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>"
					url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
				/>
				{/* <Marker position={position}>
					<Popup>
						A pretty CSS3 popup. <br /> Easily customizable.
					</Popup>
				</Marker> */}
			</LeafletMap>
		);
	}
}

export default Map;
