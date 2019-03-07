import {
	Map as LeafletMap,
	GeoJSON,
	TileLayer,
	Marker,
	Popup,
} from "react-leaflet";
import React, { Component } from "react";
import { connect } from "react-redux";

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
		return this.props.communityAreas.features ? (
			<LeafletMap center={position} zoom={this.state.zoom}>
				<TileLayer
					attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>"
					url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
				/>
				<GeoJSON
					data={this.props.communityAreas}
					onEachFeature={(feature, layer) =>
						layer.bindTooltip(feature.properties.community, {
							permanent: true,
						})
					}
				/>{" "}
				{/* <Marker position={position}>
									<Popup>
										A pretty CSS3 popup. <br /> Easily customizable.
									</Popup>
								</Marker> */}{" "}
			</LeafletMap>
		) : (
			""
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	communityAreas: state.map,
});

export default connect(mapStateToProps)(Map);
