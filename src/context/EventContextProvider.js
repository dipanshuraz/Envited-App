import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";

export const EventContext = createContext();

const EventContextProvider = (props) => {
  const navigate = useNavigate();

  const initialData = {
    name: "",
    hostedBy: "",
    startDateTime: "",
    endDateTime: "",
    street: "",
    otherLocationInfo: "",
    image: "",
  };

  const [eventData, setEventData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    console.log(name, value, "event.target");

    let image = "";

    if (name == "image") {
      image = URL.createObjectURL(event.target.files[0]);
    }

    const freshEventData = {
      ...eventData,
      [event.target.name]: name == "image" ? image : value,
    };

    setEventData(freshEventData);
    localStorage.setItem("create-event-data", JSON.stringify(freshEventData));
  };

  const submitForm = (event) => {
    event.preventDefault();
    navigate("/event");
  };

  return (
    <EventContext.Provider
      value={{
        eventData,
        setEventData,
        isEditing,
        setIsEditing,
        showPreview,
        setShowPreview,
        handleInput,
        submitForm,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
export default EventContextProvider;
