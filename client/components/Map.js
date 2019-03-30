import { Map as LeafletMap, TileLayer } from "react-leaflet";
import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchLayer, removeLayer } from "./../store/map";
import { Sidebar, Tab } from "react-leaflet-sidetabs";
import { FiHome, FiChevronRight, FiFilter } from "react-icons/fi";
import availableLayers from "./../availableLayers";
import Layer from "./Layer";

class Map extends Component {
	constructor() {
		super();
		this.state = {
			lat: 41.8781,
			lng: -87.6298,
			zoom: 15,
			collapsed: false,
			selected: "home",
			height: document.documentElement.clientHeight,
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
	resize = () =>
		this.setState({
			height: document.documentElement.clientHeight,
		});

	componentDidMount() {
		window.addEventListener("resize", this.resize);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.resize);
	}

	render() {
		const position = [this.state.lat, this.state.lng];
		return (
			<React.Fragment>
				<LeafletMap
					className="markercluster-map"
					ref={this.mapRef}
					center={position}
					zoom={this.state.zoom}
					maxZoom={18}
					style={{
						width: "100%",
						height: `${this.state.height - 25}px`,
					}}
				>
					<TileLayer
						attribution="&copy; <a href=&quot;https://www.openstreetmap.org/copyright&quot;>OpenStreetMap</a> contributors &copy; <a href=&quot;https://carto.com/attributions&quot;>CARTO</a>"
						url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png"
					/>
					{this.props.fetchedLayers.map(layer => (
						<Layer key={layer.name} props={layer} />
					))}
				</LeafletMap>
				<Sidebar
					id="sidebar"
					position="right"
					collapsed={this.state.collapsed}
					closeIcon={<FiChevronRight />}
					selected={this.state.selected}
					onOpen={this.onOpen.bind(this)}
					onClose={this.onClose.bind(this)}
				>
					<Tab id="home" header="Eight Blocks To The Mile" icon={<FiHome />}>
						<p>Welcome! To get started, please click the filters tab.</p>
					</Tab>
					<Tab id="filters" header="Filters" icon={<FiFilter />}>
						<div>
							<div>
								{availableLayers.map(layer => (
									<div key={layer[0]}>
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
										<hr />
									</div>
								))}
							</div>
						</div>
					</Tab>
				</Sidebar>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	fetchedLayers: state.map,
});

const mapDispatchToProps = dispatch => ({
	fetchLayer: layer => {
		dispatch(fetchLayer(layer));
	},
	removeLayer: layer => {
		dispatch(removeLayer(layer));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Map);
