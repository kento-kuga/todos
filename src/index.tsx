import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import "./core/global-style.scss";
import { AppContextProvider } from "./common/context/app-context";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./components/pages/app";
import { AuthContextProvider } from "./common/context/auth-context";

ReactDOM.render(
  <AppContextProvider>
    <AuthContextProvider>
      <Router>
        <App />
      </Router>
    </AuthContextProvider>
  </AppContextProvider>,
  document.getElementById("root")
);
