import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { ACCOUNT_TYPE } from "./const";

import Home from "./components/Home";
import DoctorContainer from "./containers/DoctorContainer";
import PatientContainer from "./containers/PatientContainer";
import LoginFormContainer from "./containers/LoginFormContainer";
import RegisterFormContainer from "./containers/RegisterFormContainer";
import SettingsContainer from "./containers/SettingsContainer";
import ThirdPartyContainer from "./containers/ThirdPartyContainer";
import NotificationsContainer from "./containers/NotificationsContainer";
import RegisterSuccessForm from "./components/SuccessScreen/RegisterSuccessForm";
import ViewProof from "./containers/ViewProofContainer";

class Routes extends Component {
  render() {
    const { loggedIn, accountType, validating } = this.props;

    return (
      <Switch>
        <Route
          path="/welcome"
          exact
          render={props =>
            loggedIn && accountType ? (
              <Redirect
                to={{ pathname: "/dashboard", state: { from: props.location } }}
              />
            ) : (
              <Home />
            )
          }
        />
        <Route
          path="/login-doctor"
          exact
          render={props => (
            <LoginFormContainer userType={ACCOUNT_TYPE.DOCTOR} />
          )}
        />
        <Route
          path="/login-patient"
          exact
          render={props => (
            <LoginFormContainer userType={ACCOUNT_TYPE.PATIENT} />
          )}
        />
        <Route
          path="/login-thirdparty"
          exact
          render={props => (
            <ThirdPartyContainer userType={ACCOUNT_TYPE.THIRD_PARTY} />
          )}
        />
        <Route
          path="/thirdparty/view/:username"
          exact
          render={props => <ViewProof userType={ACCOUNT_TYPE.THIRD_PARTY} />}
        />
        <Route
          path="/register"
          exact
          render={() => <RegisterFormContainer />}
        />
        <Route
          path="/register-success"
          exact
          render={() => <RegisterSuccessForm />}
        />
        <Route
          path="/dashboard"
          exact
          render={props => {
            if (loggedIn && accountType) {
              switch (accountType) {
                case ACCOUNT_TYPE.PATIENT:
                  return <PatientContainer />;
                case ACCOUNT_TYPE.DOCTOR:
                  return <DoctorContainer />;
                case ACCOUNT_TYPE.THIRD_PARTY:
                  return <ThirdPartyContainer />;
                default:
                  return <div />;
              }
            } else if (accountType) {
              return accountType === ACCOUNT_TYPE.THIRD_PARTY ? (
                <ThirdPartyContainer />
              ) : (
                <LoginFormContainer userType={accountType} />
              );
            } else {
              return (
                <Redirect
                  to={{ pathname: "/welcome", state: { from: props.location } }}
                />
              );
            }
          }}
        />
        <Route
          path="/settings"
          exact
          component={props =>
            loggedIn ? (
              <SettingsContainer />
            ) : (
              <Redirect
                to={{
                  pathname: "/welcome",
                  state: { from: props.location }
                }}
              />
            )
          }
        />
        <Route
          path="/notifications"
          exact
          component={props => {
            return loggedIn ? (
              <NotificationsContainer />
            ) : (
              <Redirect
                to={{
                  pathname: "/welcome",
                  state: { from: props.location }
                }}
              />
            );
          }}
        />
        <Redirect to="/dashboard" />\
      </Switch>
    );
  }
}

export default Routes;
