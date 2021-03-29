import School from "../../models/School";
import {Filterable} from "../../models/Filterable";

export interface IProps {

}

export interface IState {
  schools: School[]
  filterable: Filterable;
}