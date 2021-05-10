import React, { Component } from "react";
import FadeIn from "react-fade-in";
import "./style.scss";
import {Input, Tag} from "antd";
import {IProps, IState} from "./types";

export default class Filters extends Component<IProps, IState> {

  state = {
    query: ""
  }

  render(): React.ReactNode {
    const { query } = this.state;
    const { schools } = this.props;

    const schoolNames = schools
      .filter(s => s.school.toLowerCase().includes(query.toLowerCase()))
      .map(s => s.school.toString())
      .filter((item, i, ar) => ar.indexOf(item) === i);

    return (
      <div id={"filters"}>
        <FadeIn>
          <h5>AUC Masters Database</h5>
          <span>This list gives an overview of some universities and research institutes where AUC alumni have completed a master’s degree or PhD</span>

          <Input id={"query"}
                 value={this.state.query}
                 placeholder={"Search by name"}
                 onChange={(e) => this.setState({ query: e.target.value })}
          />
          { query.length !== 0 &&
            <div>
              <Tag id={"resultCount"}>{ schoolNames.length}</Tag> results
            </div>
          }

          <div id={"schools"}>
            { schoolNames.sort((a, b) => a.localeCompare(b)).map(name => (
              <div className={"school"}
                   onClick={() => {
                     document.dispatchEvent(
                       new CustomEvent("schoolSelect", {
                         detail: schools.find(s => s.school === name)
                       })
                     );
                   }}
              >
                { name }
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    )
  }
}