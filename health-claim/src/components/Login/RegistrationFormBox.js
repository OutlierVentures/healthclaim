import React from "react";
import "../UI/Containers";
import QRReaderButton from "../QRReader/QRReaderButton";
import RoleButton from "./RoleButton";
import "./LoginForm.scss";

export default class RegistrationFormBox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = { isPatient: true };
  }

  toggleRole = isPatient => this.setState(() => ({ isPatient }));

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    this.props.register(
      this.state.username,
      this.state.password,
      this.state.qr,
      this.state.isPatient
    );
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    const { isPatient } = this.state;
    return (
      <div className="Form__Container">
        <div className="Flex__Column">
          <div
            className="Flex__Blue Flex__Centered Flex__Double"
            style={{ padding: "5px 38px" }}
          >
            <h1 className="Page__Title">{`Create new account`}</h1>
          </div>
          <div className="Box Box__NP">
            <form onSubmit={this.handleSubmit} onChange={this.handleChange}>
              <div className="Flex__Double">
                <div className="Flex__Half Flex__Grey Flex__Separator">
                  {/*<h2 className="Page__Halftitle">Log in</h2>*/}
                  <label className="Input__Label" htmlFor="username">
                    Username
                  </label>
                  <input
                    className="Input__Text"
                    placeholder="Username"
                    type="text"
                    name="username"
                    id="username"
                  />
                  <br />
                  <label className="Input__Label" htmlFor="password">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className="Input__Text"
                    type="password"
                    name="password"
                    id="passowrd"
                  />
                  <br />
                  <label className="Input__Label">I am a:</label>
                  <RoleButton isPatient={isPatient} toggle={this.toggleRole} />
                  <hr />
                  <input
                    onClick={this.handleSubmit}
                    type="button"
                    value="Sign up"
                    className="Button Button__Green"
                  />
                </div>
                <div className="Flex__Half">
                  <h2 className="Page__Halftitle">Approval</h2>
                  <p className="Page__Text">
                    Use an authorirty DID or their QR code to confirm your
                    signup.
                  </p>
                  <QRReaderButton
                    callback={data => this.setState({ qr: data })}
                  />
                  <br />
                  <div className="Page__Text">
                    <label className="Input__Label" htmlFor="password">
                      Or enter authority DID
                    </label>
                    <input
                      onChange={e => this.setState({ qr: e.target.value })}
                      value={this.state.qr}
                      placeholder="Doctor DID"
                      className="Input__Text"
                      type="username"
                      name="did"
                      id="did"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
