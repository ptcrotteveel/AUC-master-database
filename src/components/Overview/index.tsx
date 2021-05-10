import React, { Component } from "react";
import Configuration from "./Configuration";
import Filters from "./Filters";
import {Col, notification, Row} from "antd";
import Map from "./Map";
import SchoolModal from "./SchoolModal";
import {IProps, IState} from "./types";
import DatamartController from "../../api/controllers/datamart";

export default class Overview extends Component<IProps, IState> {

  state = {
    schools: [],
    filterable: {
      continent: null,
      country: null,
      field: null,
      programme: null,
      track: null
    }
  }

  componentDidMount(): void {
    this.setState({ schools: DatamartController.getData() });

    notification.open({
      message: 'Welcome!',
      placement: 'bottomRight',
      duration: 0,
      description: (
        <div>
          <span>Welcome to AUC’s Master’s Database. Here you will find an interactive map of some of the master’s and PhD programmes AUC alumni have completed. This map is based on AUC’s 2020 graduate survey.</span>
          <br /><br />
          <span>The Master’s Database is one starting point for your master’s research. Use the filters to explore which graduate school or programme is right for you. Channel the inspiration you receive from the database into continuing your master’s research on the <a href={"https://canvas.uva.nl/courses/16738"} target={"blank"}>Graduate Futures Information page</a>.</span>
        </div>
      ),
    });
  }

  render(): React.ReactNode {
    const { schools, filterable } = this.state;

    return (
      <div id={"overview"}>
        <Configuration setSchools={schools => this.setState({ schools })}
                       setFilterable={filterable => this.setState({ filterable })}
        />
        <SchoolModal filterable={filterable} />
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