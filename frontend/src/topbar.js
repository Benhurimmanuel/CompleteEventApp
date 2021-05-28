import React from "react";
import { Link } from "react-router-dom";

function Topbar() {
  let token = window.localStorage.getItem("app_token");
  return (
    <>
      <nav className="navbar navbar-expand-lg  d-flex">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            BookingApp
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex justify-content-ends ">
              <li className="nav-item">
                <Link className="nav-link" to="/events">
                  Event
                </Link>
              </li>
              {!token && (
                <li className="nav-item">
                  <Link className="nav-link " to="/register">
                    Register/Login
                  </Link>
                </li>
              )}
              {token && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/bookings">
                      Bookings
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="/"
                      type="button"
                      onClick={() => {
                        window.localStorage.removeItem("app_token");
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Topbar;

// {
//   window.localStorage.getItem("app_token") && (
//     <button
//       type="button"
//       className="btn btn-primary"
//       data-bs-toggle="modal"
//       data-bs-target="#exampleModal"
//     >
//       Create Event
//     </button>
//   );
// }
// {
//   /* </div> */
// }
// {
//   window.localStorage.getItem("app_token") && (
//     <button className="btn btn-danger">Logout</button>
//   );
// }
