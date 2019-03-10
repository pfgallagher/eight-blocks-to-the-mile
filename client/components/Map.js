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
import { GeoJSONFillable, Patterns } from "react-leaflet-geojson-patterns";
import { Sidebar, Tab } from "react-leaflet-sidetabs";
import { FiHome, FiChevronRight, FiSearch, FiSettings } from "react-icons/fi";
class Map extends Component {
	constructor() {
		super();
		this.state = {
			lat: 41.8781,
			lng: -87.6298,
			zoom: 15,
			coords: [],
			collapsed: false,
			selected: "home",
		};
		this.mapRef = createRef(<Map />);
	}
	onClose() {
		this.setState({ collapsed: true });
	}
	onOpen(id) {
		this.setState({
			collapsed: false,
			selected: id,
		});
	}

	render() {
		this.props.fetchedLayers.length && console.log(this.props.fetchedLayers);
		const position = [this.state.lat, this.state.lng];
		return this.props.fetchedLayers[0] ? (
			<React.Fragment>
				<Sidebar
					id="sidebar"
					position="right"
					collapsed={this.state.collapsed}
					closeIcon={<FiChevronRight />}
					selected={this.state.selected}
					onOpen={this.onOpen.bind(this)}
					onClose={this.onClose.bind(this)}
				>
					<Tab id="home" header="Home" icon={<FiHome />}>
						<p>No place like home!</p>
					</Tab>
					<Tab id="search" header="Search" icon={<FiSearch />}>
						<p>The noblest search is the search for excellence!</p>
					</Tab>
					<Tab
						id="settings"
						header="Settings"
						anchor="bottom"
						icon={<FiSettings />}
					>
						<p>We don't want privacy so much as privacy settings!</p>
					</Tab>
				</Sidebar>
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
					{/* <GeoJSONFillable data={this.props.fetchedLayers[0].data} /> */}
					<GeoJSONFillable
						style={feature => ({
							color: "red",
							fillPattern: Patterns.StripePattern({
								color: "red",
								key: "stripes",
							}),
						})}
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
			</React.Fragment>
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
