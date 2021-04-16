import programmes from "../store/dataset.json";
import locations from "../store/locations.json";
import interviews from "../store/interviews.json";
import School from "../../models/School";

export default class DatamartController {

  public static getData = (school?: string): School[] => {
    let data = programmes.sort((a, b) =>
      (a.programme || "").localeCompare(b.programme || "")).filter(p => p.programme !== null)

    if (school) {
      data = data.filter(
        x => x.school.toLowerCase().includes(school.toLowerCase())
      );
    }

    data = data.filter(
      x => x.field !== "Unspecified"
    )

    return data;
  }

  public static getLocations = () => {
    return locations;
  }

  public static getLocation = (name: string) => {
    if (!Object.keys(locations).includes(name)) return null;
    return (locations as any)[name];
  }

  public static getSchools = () => {
    return Object.keys(locations);
  }

  public static getInterviews = () => {
    return interviews;
  }
}