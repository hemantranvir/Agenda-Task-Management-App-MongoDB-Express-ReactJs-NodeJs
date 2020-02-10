import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAgendas } from "../../actions/agendasActions";

import {
  BrowserRouter as Router,
  Route,
  Switch,
  withRouter
} from "react-router-dom";

import Spinner from "../common/Spinner";
import SideNav from "./SideNav/SideNav";
import TopNav from "./TopNav/TopNav";
import Dashboard from "./MainContent/Dashboard";
import Jobs from "./MainContent/Jobs";
import Agenda from "./MainContent/Agenda/Agenda";
import NotFound from "../404/404";

import "./Layout.scss";

class Layout extends Component {
  componentDidMount() {
    this.props.getAgendas();
  }

  render() {
    const { agendas, agendasLoading } = this.props.agendas;

    let dashboardContent;

    if (agendas === null || agendasLoading) {
      dashboardContent = <Spinner />;
    } else if (agendas.length > 0) {
      dashboardContent = (
        <>
          <SideNav agendas={agendas} />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                agendas={agendas}
                component={Dashboard}
              />
              <Route
                exact
                path="/jobs"
                agendas={agendas}
                component={Jobs}
              />
              <Route exact path="/agendas/:agenda" component={Agenda} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    } else {
      dashboardContent = (
        <>
          <SideNav />
          <div className="right">
            <TopNav />
            <Switch>
              <Route
                exact
                path="/dashboard"
                agendas={[]}
                component={Dashboard}
              />
              <Route exact path="/jobs" component={Jobs} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </>
      );
    }

    return (
      <Router>
        <div className="wrapper">{dashboardContent}</div>
      </Router>
    );
  }
}

Layout.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  agendas: state.agendas
});

export default withRouter(
  connect(
    mapStateToProps,
    { getAgendas }
  )(Layout)
);
