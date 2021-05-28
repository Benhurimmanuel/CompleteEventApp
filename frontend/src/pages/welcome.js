import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      <div className="container-fluid ">
        <h1 className="mt-5">My Event Booking App</h1>
        <div className="row mt-5 jumbo hp">
          <div className="col-12 col-md-6 left">
            {" "}
            <i>
              <h4>Tired of Standing in Queues for Events?</h4>
              <h4>Dont Know how to bring people for you events?</h4>
              <br />
            </i>
            <h3 className="color"> Worry Not!..</h3>
            <br />
          </div>

          <div className="col-6 right">
            <h4> As Easy as 1.2.3..and you are set</h4>
            <br />
            <div className="offset-4 ">
              <h5>
                <strong>Step 1: </strong>
                <Link to="/register" className="color" exact>
                  Register
                </Link>
              </h5>
              <h5>
                <strong>Step 2: </strong>
                <Link to="/login" className="color" exact>
                  Login
                </Link>
              </h5>
              <h5>
                <strong>Step 3: </strong>
                <em>Starting Hosting/Booking Events</em>
              </h5>
            </div>
          </div>
        </div>
        <div className="offset-2 col-8 offset-md-4 col-md-4 mt-5">
          <h2>Host! Book! and Enjoy!</h2>
        </div>
      </div>
    </>
  );
}
