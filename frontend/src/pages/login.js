import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  let history = useHistory();
  function handleSuubmit(e) {
    e.preventDefault();

    const requestBody = {
      query: `
        query {
          login(email: "${userEmail}", password: "${userPassword}") {
            userId
            token
            tokenExpTime
          }
        }
      `,
    };
    fetch("https://eventbookingappback.herokuapp.com/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData.data.login);
        if (resData.data.login.token) {
          window.localStorage.setItem("app_token", resData.data.login.token);
          window.localStorage.setItem("userId", resData.data.login.userId);

          history.push(`/events`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <form className="mt-5" onSubmit={handleSuubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            name="email"
            type="email"
            className="form-control"
            placeholder="name@example.com"
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            name="Password"
            type="Password"
            className="form-control"
            placeholder="Enter password"
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <div className="d-flex justify-content-end mt-4">
          <button className="col-2 btn btn-outline-danger" type="submit">
            Login
          </button>
        </div>
      </form>
    </>
  );
}
