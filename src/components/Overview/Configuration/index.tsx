import React, { Component } from "react";
import Select from "react-select";
import { Col, Row } from "antd";
import "./style.scss";
import DatamartController from "../../../api/controllers/datamart";
import School from "../../../models/School";

type IState = {
  continent: string | null;
  country: string | null;
  field: string | null,
  programme: string | null
}

export default class Configuration extends Component<{
  setSchools: (schools: School[]) => any
}, IState> {

  state = {
    continent: null,
    country: null,
    field: null,
    programme: null,
  }

  update = () => {
    let schools: School[] = DatamartController.getData();
    const { country, field, programme } = this.state;

    if (field) schools = schools.filter(s => s.field === field);
    if (programme) schools = schools.filter(s => s.programme === programme);
    if (country) schools = schools.filter(s => s.country === country);

    this.props.setSchools(schools);
  }

  render(): React.ReactNode {
    const data = DatamartController.getData();

    const fields = data.map(p => p.field).filter(
        (item, i, ar) => ar.indexOf(item) === i
      );

    const countries = data.map(s => s.country).filter(
      (item, i, ar) => ar.indexOf(item) === i
    );

    const programmes = data.filter(
      p => this.state.field ? p.field === this.state.field : true
    ).map(p => p.programme).filter(
      (item, i, ar) => ar.indexOf(item) === i
    );

    return (
      <div id={"configuration"}>
        <Row gutter={[10, 10]}>
          <Col xs={12} md={6}>
            <Select placeholder={"Region"}
                    isClearable={true}
                    options={[
                      { label: "Africa", value: "Africa" },
                      { label: "Asia", value: "Asia" },
                      { label: "Europe", value: "Europe" },
                      { label: "Latin America", value: "Latin America" },
                      { label: "North America", value: "North America" },
                      { label: "Oceania", value: "Oceania" }
                    ]}
            />
          </Col>
          <Col xs={12} md={6}>
            <Select placeholder={"Country"}
                    value={(this.state.country ?
                        { label: this.state.country!, value: this.state.country! } : null
                    )}
                    isClearable={true}
                    onChange={(e) => this.setState({ country: e ? e.value : null }, this.update)}
                    options={countries.sort((a, b) => a.localeCompare(b)).map(c => ({
                      label: c, value: c
                    }))}
            />
          </Col>
          <Col xs={12} md={6}>
            <Select placeholder={"Field of study"}
                    options={fields.map(f => ({ label: f, value: f}))}
                    value={(this.state.field ?
                        { label: this.state.field!, value: this.state.field! } : null
                    )}
                    isClearable={true}
                    onChange={(e) => this.setState({ field: e ? e.value : null }, this.update)}
            />
          </Col>
          <Col xs={12} md={6}>
            <Select placeholder={"Major"}
                    options={programmes.map(p => ({ label: p, value: p}))}
                    isClearable={true}
                    value={(this.state.programme ?
                      { label: this.state.programme!, value: this.state.programme! } : null
                    )}
                    onChange={(e) => this.setState({ programme: e ? e.value : null }, this.update)}
            />
          </Col>
        </Row>
      </div>
    )
  }
}