import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import BookingsList from "../bookingsList";

export default function Welcome() {
  useEffect(() => {
    bookingsfetch();
  }, []);

  let [bookingsList, setBookingsList] = useState([{}]);
  let [loading, setLoading] = useState(false);
  const token = window.localStorage.getItem("app_token");
  const user = window.localStorage.getItem("userId");

  const bookingsfetch = () => {
    console.log("in fetch");
    setLoading(true);
    const requestBody = {
      query: `query {
        bookings 
          {_id
         createdAt
         event{
           _id
           title
           date
         }
          }
      }
    `,
    };
    fetch("https://eventbookingappback.herokuapp.com/graphql  ", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        console.log(resData.data.bookings);
        setBookingsList(resData.data.bookings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  function handleCancel(id) {
    // console.log(id);

    setLoading(true);
    const requestBody = {
      query: `mutation {
        cancelBooking (bookingId:"${id}")
          {_id
           title
         }
      }
    `,
    };
    fetch("https://eventbookingappback.herokuapp.com/graphql  ", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then((resData) => {
        setBookingsList(resData.data.bookings);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }
  return (
    <>
      {""}
      <div className="container">
        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            {" "}
            <h2>Your Bookings</h2>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Event</th>
                  <th scope="col">Event Date</th>
                  <th scope="col">Date of Booking</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <BookingsList
                  key="id"
                  bookings={bookingsList}
                  onDelete={handleCancel}
                ></BookingsList>
              </tbody>
            </table>
          </>
        )}
      </div>
    </>
  );
}
