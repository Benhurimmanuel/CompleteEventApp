import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Topbar from "./topbar";
import Welcome from "./pages/welcome";
import Events from "./pages/events";
import Bookings from "./pages/bookings";
import Login from "./pages/login";
import Register from "./pages/register";

export default function App() {
  let token = window.localStorage.getItem("app_token");
  return (
    <>
      <Router>
        <Route path="/" component={Topbar}></Route>
        <div className="container-fluid m-2 mt-5">
          <Switch>
            {!token && <Route path="/login" component={Login} exact />}
            <Route path="/register" component={Register} exact />
            <Route path="/" component={Welcome} exact />
            <Route path="/events" component={Events} exact />
            {token && <Route path="/bookings" component={Bookings} exact />}
          </Switch>
        </div>
      </Router>
    </>
  );
}
