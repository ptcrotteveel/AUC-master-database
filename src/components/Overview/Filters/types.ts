import School from "../../../models/School";

export interface IProps {
  schools: School[];
}

export interface IState {
  query: string;
}