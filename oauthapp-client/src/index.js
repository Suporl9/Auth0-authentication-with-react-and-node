import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/childComponent/App";
import reportWebVitals from "./reportWebVitals";
import { Auth0Provider } from "@auth0/auth0-react";

//pass in the required parameters from auth0 platform
const domainlink = "";
const clientId = "";
const identifier = "";
const scopes = "";

ReactDOM.render(
  <Auth0Provider
    domain={domainlink}
    clientId={clientId}
    redirectUri={window.location.origin}
    audience={identifier}
    scope={scopes}
  >
    <App />
  </Auth0Provider>,

  document.getElementById("root")
);

reportWebVitals();
