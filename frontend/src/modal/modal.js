import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Modal(props) {
  const history = useHistory();
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  let [eventPrice, setEventPrice] = useState();
  const [eventDate, setEventDate] = useState("");
  eventPrice = parseFloat(eventPrice);
  const event = { eventTitle, eventDescription, eventDate, eventPrice };

  const token = window.localStorage.getItem("app_token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(event);

    if (
      eventTitle.trim().length === 0 ||
      eventPrice < 0 ||
      eventDescription.trim().length === 0 ||
      eventDate.trim().length === 0
    ) {
      return;
    }
    const requestBody = {
      query: `mutation {
        createEvent(eventInput: {
          title: "${eventTitle}",
          description: "${eventDescription}",
          price:${eventPrice},
          date: "${eventDate}"}) 
     {_id
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
        props.eventsList.push(resData);
      })
      .then((resData) => {
        window.location.reload(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Create Event
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form id="eventform" onSubmit={handleSubmit}>
                <div class="mb-3">
                  <label for=" Title" class="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id=" title"
                    value={eventTitle}
                    onChange={(e) => {
                      setEventTitle(e.target.value);
                    }}
                  />
                </div>

                <div class="mb-3">
                  <label for="price" class="form-label">
                    Price
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="Price"
                    value={+eventPrice}
                    onChange={(e) => {
                      setEventPrice(+e.target.value);
                    }}
                  />
                </div>
                <div class="mb-3">
                  <label for="datetime-local" class="form-label">
                    Date
                  </label>
                  <input
                    type="date"
                    class="form-control"
                    id="date"
                    value={eventDate}
                    onChange={(e) => {
                      setEventDate(e.target.value);
                    }}
                  />
                  <div class="mb-3">
                    <label for="description" class="form-label">
                      Description
                    </label>
                    <input
                      type="textarea"
                      class="form-control"
                      id="Description"
                      value={eventDescription}
                      onChange={(e) => {
                        setEventDescription(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="submit"
                class="btn btn-danger"
                form="eventform"
                // data-bs-dismiss="modal"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
