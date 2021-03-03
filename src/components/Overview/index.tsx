import React, { Component } from "react";
import Configuration from "./Configuration";
import Filters from "./Filters";
import { Col, Row } from "antd";
import Map from "./Map";
import SchoolModal from "./SchoolModal";
import {IProps, IState} from "./types";
import DatamartController from "../../api/controllers/datamart";

export default class Overview extends Component<IProps, IState> {

  state = { schools: [] }

  componentDidMount(): void {
    this.setState({ schools: DatamartController.getData() });
  }

  render(): React.ReactNode {
    const { schools } = this.state;

    return (
      <div id={"overview"}>
        <Configuration setSchools={schools => this.setState({ schools })} />
        <SchoolModal />
        <Row>
          <Col xs={10} md={8}>
            <Filters schools={schools} />
          </Col>
          <Col xs={14} md={16}>
            <Map center={[53, 4]} zoom={2} schools={schools} />
          </Col>
        </Row>
      </div>
    )
  }
}