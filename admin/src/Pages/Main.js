import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
import Login from "./Login";
import AdminIndex from "./AdminIndex";

export default function Main() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={Login}></Route>
        <Route path="/index"  component={AdminIndex}></Route>
      </Router>
    </div>
  );
}
