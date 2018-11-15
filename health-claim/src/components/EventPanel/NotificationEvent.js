import React, { Component } from "react";
import "./EventPanel.scss";

class NotificationEvent extends Component {
  constructor(props) {
    super(props);

    this.state = { masterSecret: null };
  }

  render() {
    const {
      handle,
      acceptAction,
      dismissAction,
      events,
      token,
      id,
      requireMasterSecret
    } = this.props;
    const { masterSecret } = this.state;
    console.log(this.state);
    console.log(this.props);
    var action= acceptAction.substr(0, acceptAction.indexOf('?') + 1); 
    if(action == "create_patient_approve?") action = "Confirm this patient enrolment";
    var eventId= acceptAction.substr(acceptAction.indexOf('?') + 1, acceptAction.length); 
    return (
      <div className={"Event"}>
        <div className="EventBody">
          <p>{action} {eventId}</p>
          {requireMasterSecret ? (
            <div>
              <input
                className="Input__Text"
                type="text"
                value={this.state.masterSecret}
                onChange={e => this.setState({ masterSecret: e.target.value })}
                placeholder="Master Secret"
              />{" "}
              <hr />
            </div>
          ) : null}
        </div>
        <div className="EventActions">
          <div
            className={
              this.props.requireMasterSecret && !this.state.masterSecret
                ? "Action__Accept__Disabled"
                : "Action__Accept"
            }
            onClick={() =>
              this.props.requireMasterSecret && !this.state.masterSecret
                ? null
                : handle(acceptAction, events, id, token, masterSecret)
            }
          >
             <i className="fa fa-check" />
          </div>
          <div
            className="Action__Dismiss"
            onClick={() =>
              handle(dismissAction, events, id, token, masterSecret)
            }
          >
            <i className="fa fa-times" />
          </div>
        </div>
      </div>
    );
  }
}

export default NotificationEvent;
