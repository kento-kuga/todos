import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import { AppContextProvider } from "./common/context/AppContext";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./components/Pages/app";

ReactDOM.render(
  <AppContextProvider>
    <Router>
      <App />
    </Router>
  </AppContextProvider>,
  document.getElementById("root")
);
