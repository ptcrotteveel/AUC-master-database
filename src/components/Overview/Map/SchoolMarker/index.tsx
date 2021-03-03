import React, { Component } from "react";
import { divIcon, LatLngExpression } from 'leaflet';
import {Marker} from "react-leaflet";
import {renderToStaticMarkup} from "react-dom/server";
import School from "../../../../models/School";

const iconMarkup = renderToStaticMarkup(<i className=" fa fa-map-marker-alt fa-3x" />);
const customMarkerIcon = divIcon({
  html: iconMarkup,
  iconAnchor: [13, 2]
});

export default class SchoolMarker extends Component<{position: LatLngExpression, school: School}> {
  render(): React.ReactNode {
    return (
      <Marker position={this.props.position}
              icon={customMarkerIcon}
              eventHandlers={{
                click: (e) => {
                  document.dispatchEvent(
                    new CustomEvent("schoolSelect", { detail: this.props.school })
                  );
                  e.originalEvent.stopPropagation();
                  e.originalEvent.preventDefault();
                },
              }}
      />
    )
  }
}