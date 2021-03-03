import React, { Component } from "react";
import {Row, Col, Modal, Tag} from "antd";
import DatamartController from "../../../api/controllers/datamart";
import "./style.scss";
import {MapContainer, TileLayer} from "react-leaflet";

type IState = {
  isOpen: boolean,
  name: string | null,
}

export default class SchoolModal extends Component<{}, IState> {

  state = {
    isOpen: false, name: null
  }

  componentDidMount(): void {
    document.addEventListener('schoolSelect', this.handleSchoolSelectEvent);
  }

  componentWillUnmount(): void {
    document.removeEventListener('schoolSelect', this.handleSchoolSelectEvent);
  }

  handleSchoolSelectEvent = (evt: any) => {
    const { isOpen } = this.state;

    if (!isOpen) {
      this.setState({ isOpen: true, name: evt.detail.school }, () => this.forceUpdate());
    }
  }

  render(): React.ReactNode {
    const { isOpen, name } = this.state;
    const programmes = DatamartController.getData(name!);

    const tracks = programmes.length > 0 ?
      programmes.map(p => p.track).filter(
        (item, i, ar) => ar.indexOf(item) === i
      ).join(", ") : "None provided";

    const location = DatamartController.getLocation(name!);

    return (
      <div id={"schoolModal"}>
        <Modal title={(
          <div>
            <div style={{
              height: 60,
              width: 240,
              float: 'right',
              background: 'url(/logo.jpg)',
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat"
            }} />

            <div>
              <span style={{margin: 0, padding: 0}}>AUC Masters Database</span>
              <h5>{ name }</h5>
            </div>
          </div>
        )}
               visible={isOpen}
               onOk={() => this.setState({ isOpen: false })}
               onCancel={() => this.setState({ isOpen: false })}
               okText={"Close"}
               width={'90vw'}
               destroyOnClose={true}
               cancelButtonProps={{ style: { display: 'none' } }}
        >
          <Row gutter={10}>
            <Col xs={24} md={16}>
              <strong>Available tracks:</strong> { tracks }
              <h5 style={{marginTop: 20}}>Master programmes</h5>
              { programmes.map(p => (<p>{ p.programme } <Tag>{ p.field }</Tag></p>))}
            </Col>

            <Col xs={24} md={8}>
              { location &&
                <MapContainer id={"modalMap"}
                              style={{ height: 300, width: '100%'}}
                              key={name}
                              center={[location.lat, location.lon]}
                              zoom={10}
                              scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tile.thunderforest.com/neighbourhood/{z}/{x}/{y}.png?apikey=04d2ae4998f544cabe64bf2fd19724c3"
                  />
                </MapContainer>
              }
            </Col>
          </Row>
        </Modal>
      </div>
    );
  }
}