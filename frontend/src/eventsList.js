import React, { useState } from "react";
import ViewEventModal from "./modal/viewEventModal";
export default function EventList(props) {
  const [eventtitle, setEventTitle] = useState("");
  const [eventdate, setEventDate] = useState("");
  const [eventPrice, setEventPrice] = useState("");
  const [eventId, setEventId] = useState("");
  const [eventdescription, setEventDescription] = useState("");

  const snew = "asda";
  return (
    <>
      {props.eventslist.map((event) => {
        function handleEvent() {
          setEventTitle(event.title);
          setEventDate(event.date);
          setEventPrice(event.price);
          setEventId(event._id);
          setEventDescription(event.description);
        }
        return (
          <>
            <div className="col-12 card col-md-3">
              <div className="card-header">{event.title}</div>
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <p className="card-title">
                    <strong>Event Date:</strong>
                    <br />
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                  <p className="card-title">
                    <strong>Cost per person: </strong>
                    <br />
                    Rs &nbsp;
                    {event.price}
                  </p>
                </div>
                {/* <p className="card-text">{event.description}</p> */}
                <br />
                <div className="d-flex justify-content-end">
                  <button
                    className="btn btn-outline-danger "
                    data-bs-toggle="modal"
                    data-bs-target="#eventModal"
                    onClick={handleEvent}
                  >
                    View Event
                  </button>
                </div>
              </div>
            </div>
            <ViewEventModal
              title={eventtitle}
              date={eventdate}
              price={eventPrice}
              description={eventdescription}
              eventId={eventId}
            ></ViewEventModal>
          </>
        );
      })}
    </>
  );
}
