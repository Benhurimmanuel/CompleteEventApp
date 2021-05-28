import React from "react";

export default function ViewEventModal(props) {
  const token = window.localStorage.getItem("app_token");
  function handleBooking() {
    const requestBody = {
      query: `mutation {
          bookEvent(eventId:"${props.eventId}")
       {_id
       
        createdAt
        updatedAt
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
        console.log(resData);
        // setEventsList.push(resData);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <>
      <div
        className="modal fade"
        id="eventModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {props.title}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div key={props.id} className="modal-body">
              <div className="d-flex justify-content-between">
                <h6>
                  Date Of Event: {new Date(props.date).toLocaleDateString()}
                </h6>
                <h6>Cost per Person: Rs {props.price}</h6>
              </div>
              <p className="eventdes">{props.description}</p>
            </div>
            <div className="modal-footer">
              {!token ? null : (
                <button
                  type="submit"
                  className="btn btn-outline-danger"
                  data-bs-dismiss="modal"
                  onClick={handleBooking}
                >
                  Book Event
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
