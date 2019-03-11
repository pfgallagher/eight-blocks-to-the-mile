import {
	Map as LeafletMap,
	GeoJSON,
	TileLayer,
	Marker,
	Tooltip,
} from "react-leaflet";
import L from "leaflet";
import React, { Component } from "react";
import { connect } from "react-redux";
import centroid from "@turf/centroid";
import { featureEach } from "@turf/meta";
import { getCoords } from "@turf/invariant";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { GeoJSONFillable, Patterns } from "react-leaflet-geojson-patterns";
import { fetchLayer, removeLayer } from "./../store/map";
import { Sidebar, Tab } from "react-leaflet-sidetabs";
import { FiHome, FiChevronRight, FiFilter } from "react-icons/fi";
import availableLayers from "./../availableLayers";

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
		const position = [this.state.lat, this.state.lng];
		return (
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
					<Tab id="filters" header="Filters" icon={<FiFilter />}>
						<div>
							<div>
								{availableLayers.map(layer => (
									<React.Fragment key={layer[0]}>
										<label htmlFor={layer[0]}>{layer[1]}</label>
										<button
											onClick={() => this.props.fetchLayer(`${layer[0]}`)}
											type="button"
											name={layer[0]}
										>
											Add
										</button>
										<button
											onClick={() => this.props.removeLayer(`${layer[0]}`)}
											type="button"
										>
											Remove
										</button>
									</React.Fragment>
								))}
							</div>
						</div>
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
					{this.props.fetchedLayers[0] && (
						<GeoJSON
							data={
								this.props.fetchedLayers[0] && this.props.fetchedLayers[0].data
							}
							onEachFeature={(feature, layer) => {
								console.log(layer);
								layer.bindTooltip("test!", {
									sticky: true,
								});
							}}
						/>
					)}
					{this.props.fetchedLayers[1] &&
						this.props.fetchedLayers[1].data && (
						<React.Fragment>
							<GeoJSONFillable
								style={feature => ({
									color: "#FF0000",
								})}
								data={this.props.fetchedLayers[1].data}
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
								{this.props.fetchedLayers[1].data.features.map(el => {
									// console.log(el);
									const [lng, lat] = centroid(el).geometry.coordinates;
									const latLngArr = [lat, lng];
									const coords = L.latLng(latLngArr);
									return (
										<Marker key={el.properties.name} position={coords}>
											<Tooltip position="auto" permanent="true">
												{el.properties.Name}
											</Tooltip>
										</Marker>
									);
								})}
									})}
							</MarkerClusterGroup>
						</React.Fragment>
					)}
				</LeafletMap>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state, ownProps) => ({
	fetchedLayers: state.map,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
	fetchLayer: layer => {
		dispatch(fetchLayer(layer));
	},
	removeLayer: layer => {
		dispatch(removeLayer(layer));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
