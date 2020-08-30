// Copyright 2020 The casbin Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React from "react";
import {Spin} from "antd";
import * as Setting from "./Setting";
import * as AccountBackend from "./backend/AccountBackend";
import {withRouter} from "react-router-dom";

class CallbackBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: props,
      authType: props.match.params.authType,
      addition: props.match.params.addition,
      state: "",
      code: "",
      isAuthenticated: false,
      isSignedUp: false,
      email: ""
    };
    const params = new URLSearchParams(this.props.location.search);
    this.state.code = params.get("code");
    this.state.state = params.get("state");
  }

  getAuthenticatedInfo() {
    let redirectUrl;
    redirectUrl = `${Setting.ClientUrl}/callback/${this.state.authType}/${this.state.addition}`;
    switch (this.state.authType) {
      case "github":
        AccountBackend.githubLogin(this.state.code, this.state.state, redirectUrl, this.state.addition)
          .then((res) => {
            if (res.status === "ok") {
              window.location.href = '/';
            }else {
              Setting.showMessage("error", res?.msg);
            }
          });
        break;
    }
  }

  componentDidMount() {
    this.getAuthenticatedInfo();
  }

  render() {
    return (
      // https://codesandbox.io/s/antd-reproduction-template-q2dwk
      <div className="App">
        <Spin size="large" tip="Logging in..." style={{paddingTop: "10%"}} />
      </div>
    )
  }
}

export default withRouter(CallbackBox);
