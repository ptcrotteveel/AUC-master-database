import React, { Suspense } from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ScrollToTop from "./scrollTop";
import 'antd/dist/antd.css';
import 'leaflet/dist/leaflet.css';
import 'react-leaflet-markercluster/dist/styles.min.css';
import Header from "./components/Header";

const Overview = React.lazy(() => import('./components/Overview'));


class BitInsights extends React.Component<any, any> {

  componentDidMount(): void {
    const { dispatch } = this.props;
  }

  componentDidUpdate(prevProps: any) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  renderComponent = () => {
    return (
      <Router>
        <ScrollToTop />
        <Header />
        <Suspense fallback={<span>Loading</span>}>
          <Switch>
            <Route path="/" component={Overview} />
          </Switch>
        </Suspense>
      </Router>
    )
  }

  render(): React.ReactNode {

    return (
      <div>
        <Suspense fallback={<span>Loading</span>}>
          { this.renderComponent() }
        </Suspense>
      </div>
    );
  }
}

export default BitInsights;