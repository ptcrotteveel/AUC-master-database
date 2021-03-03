import React, { Component } from "react";
import {MapContainer, Marker, TileLayer} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "./style.scss";
import DatamartController from "../../../api/controllers/datamart";
import SchoolMarker from "./SchoolMarker";
import {LatLngExpression} from "leaflet";
import School from "../../../models/School";

export default class Map extends Component<{ center: LatLngExpression, zoom: number, schools: School[] }> {
  render(): React.ReactNode {
    const { schools } = this.props;
    const locations = DatamartController.getLocations();

    return (
      <div className={"mapWrapper"}>
        <MapContainer className={"map"} center={this.props.center} zoom={this.props.zoom} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=04d2ae4998f544cabe64bf2fd19724c3"
          />
          <MarkerClusterGroup>
            { Object.keys(locations).map(key => {
              const loc = (locations as any)[key];
              const school = schools.find(s => s.school === key);
              if (!school) return null;

              return <SchoolMarker school={school!}
                                   position={[loc.lat, loc.lon]} />
            })}
          </MarkerClusterGroup>
        </MapContainer>
      </div>
    )
  }
}