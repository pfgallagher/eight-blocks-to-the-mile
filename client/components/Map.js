import {
	Map as LeafletMap,
	GeoJSON,
	TileLayer,
	Marker,
	Tooltip,
} from "react-leaflet";
import L from "leaflet";
import React, { createRef, Component } from "react";
import { connect } from "react-redux";
import centroid from "@turf/centroid";
import MarkerClusterGroup from "react-leaflet-markercluster";
class Map extends Component {
	constructor() {
		super();
		this.state = {
			lat: 41.8781,
			lng: -87.6298,
			zoom: 15,
			coords: [],
		};
		this.mapRef = createRef(<Map />);
	}

	render() {
		this.props.fetchedLayers.length && console.log(this.props.fetchedLayers);
		const position = [this.state.lat, this.state.lng];
		return this.props.fetchedLayers[0] ? (
			<LeafletMap
				className="markercluster-map"
				ref={this.mapRef}
				center={position}
				zoom={this.state.zoom}
				maxZoom={18}
			>
				<TileLayer
					attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>"
					url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
				/>
				<GeoJSON
					data={this.props.fetchedLayers[0].data}
					onEachFeature={(feature, layer) => {
						const [lng, lat] = centroid(feature).geometry.coordinates;
						const latLngArr = [lat, lng];
						const obj = L.latLng(latLngArr);
						obj.name = feature.properties.Name;
						this.setState(state => ({
							coords: state.coords.concat(obj),
						}));
					}}
				/>
				<MarkerClusterGroup>
					{this.state.coords &&
						this.state.coords.map(el => (
							<Marker key={`${el[0]}${el[1]}`} position={el}>
								<Tooltip position="auto" permanent="true">
									{el.name}
								</Tooltip>
							</Marker>
						))}
				</MarkerClusterGroup>
			</LeafletMap>
		) : (
			""
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	communityAreas: state.map,
	fetchedLayers: state.map.fetchedLayers,
});

// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {
// 		dispatch1: () => {
// 			dispatch(actionCreator)
// 		}
// 	}
// }

export default connect(mapStateToProps)(Map);
