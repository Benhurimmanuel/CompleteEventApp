import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import EventList from "../eventsList";

import Modal from "../modal/modal";

export default function Events() {
  useEffect(() => {
    eventsfetch();
  }, []);

  let [eventsList, setEventsList] = useState([{}]);
  let [loading, setLoading] = useState(false);

  const eventsfetch = () => {
    setLoading(true);
    const requestBody = {
      query: `query {
          events 
          {_id
          title
          description
          date
          price
          }
      }
    `,
    };
    fetch("https://eventbookingappback.herokuapp.com/graphql  ", {
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
        setEventsList(resData.data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <button
        className="offset-5 btn btn-danger "
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Create New Event
      </button>
      <div className=" row ">
        <Modal eventsList={eventsList}></Modal>

        {loading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <h2>Events</h2>
            <EventList eventslist={eventsList}></EventList>
          </>
        )}
      </div>
    </>
  );
}
