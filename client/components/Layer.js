import { GeoJSON, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import React from "react";
import centroid from "@turf/centroid";
import MarkerClusterGroup from "react-leaflet-markercluster";
import { GeoJSONFillable } from "react-leaflet-geojson-patterns";

const Layer = ({ props }) => {
	if (props.type === "streets")
		return (
			<GeoJSON
				data={props.data}
				onEachFeature={(feature, layer) => {
					layer.bindTooltip(feature.properties.street_nam, { sticky: true });
				}}
			/>
		);
	if (props.type === "boundaries")
		return (
			<React.Fragment>
				<GeoJSONFillable
					style={() => ({
						color: "#FF0000",
					})}
					data={props.data}
				/>
				<MarkerClusterGroup>
					{props.data.features.map(el => {
						const [lng, lat] = centroid(el).geometry.coordinates;
						const latLngArr = [lat, lng];
						const coords = L.latLng(latLngArr);
						return (
							<Marker key={el.properties.Name} position={coords}>
								<Tooltip position="auto" permanent="true">
									{el.properties.Name}
								</Tooltip>
							</Marker>
						);
					})}
					})}
				</MarkerClusterGroup>
			</React.Fragment>
		);
};

export default Layer;
