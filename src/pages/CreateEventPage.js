import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { InfoRow } from "../components";
import {
  HiOutlineLocationMarker,
  HiOutlineCalendar,
  HiX,
} from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import { EventContext } from "../context/EventContextProvider";

const CreateEventPage = () => {
  const { search } = useLocation();

  const {
    eventData,
    setEventData,
    isEditing,
    setIsEditing,
    showPreview,
    setShowPreview,
    handleInput,
    submitForm,
  } = useContext(EventContext);

  useEffect(() => {
    const edit = new URLSearchParams(search).get("edit");

    if (edit) setIsEditing(true);

    return () => {
      setIsEditing(false);
      const localData = localStorage.getItem("event-data");

      if (localData) {
        setEventData(JSON.parse(localData));
      }
    };
  }, [search]);

  return (
    <section className="bg-primary flex items-center justify-center">
      {showPreview && (
        <div
          className="bg-slate-900 bg-opacity-30 fixed top-0 left-0 right-0 bottom-0"
          onClick={() => setShowPreview(false)}
        ></div>
      )}

      <div className="container">
        <div className="form-holder max-w-5xl mx-auto lg:space-x-20 items-center">
          <div className="flex-1">
            <h2 className="mb-4">Create a new event</h2>
            <form onSubmit={submitForm} novalidate>
              <label className="h-[120px] border-2 border-gray-300 border-dashed mb-3 flex items-center justify-center text-muted cursor-pointer hover:border-[#8456EC]">
                Upload Event Photo
                <input
                  type="file"
                  className="hidden"
                  name="image"
                  onChange={handleInput}
                  accept="image/png, image/jpeg"
                />
              </label>

              <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
                <div className="flex-1">
                  <div className="form-group">
                    <label>Event Name</label>
                    <input
                      type="text"
                      placeholder="Event Name"
                      name="name"
                      required
                      autoComplete="off"
                      value={eventData.name}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="form-group">
                    <label>Host Name</label>
                    <input
                      type="text"
                      placeholder="Host Name"
                      name="hostedBy"
                      autoComplete="off"
                      required
                      value={eventData.hostedBy}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
                <div className="flex-1">
                  <div className="form-group">
                    <label>Start Date Time</label>
                    <input
                      type="datetime-local"
                      placeholder="Start Date Time"
                      name="startDateTime"
                      required
                      autoComplete="off"
                      value={eventData.startDateTime}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="form-group">
                    <label>End Date Time</label>
                    <input
                      type="datetime-local"
                      placeholder="End Date Time"
                      name="endDateTime"
                      required
                      autoComplete="off"
                      value={eventData.endDateTime}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3 md:flex-row md:space-x-3 md:space-y-0">
                <div className="flex-1">
                  <div className="form-group">
                    <label>Street Name</label>
                    <input
                      type="text"
                      placeholder="Street Name"
                      name={`street`}
                      required
                      autoComplete="off"
                      value={eventData.street}
                      onChange={handleInput}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="form-group">
                    <label>Suburb, State, Postcode</label>
                    <input
                      type="text"
                      placeholder="Suburb, State, Postcode"
                      name="otherLocationInfo"
                      required
                      autoComplete="off"
                      value={eventData.otherLocationInfo}
                      onChange={handleInput}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-6">
                <button className="btn mt-3" type="submit">
                  {isEditing ? "Update" : "Create"} Event →
                </button>
                <button
                  type="button"
                  className="lg:hidden"
                  onClick={() => setShowPreview(true)}
                >
                  Preview
                </button>
              </div>
            </form>
          </div>
          <div
            className={`bg-white rounded-lg shadow-sm flex-1 md:max-w-sm lg:block ${
              showPreview
                ? "block fixed bottom-0 w-full left-0 right-0"
                : "hidden relative"
            }`}
          >
            <span className="text-sm px-3 py-0.5 rounded-full absolute -top-3 left-3 bg-[#EDE5FF] text-primary font-semibold">
              Preview
            </span>

            <span
              onClick={() => setShowPreview(false)}
              className="absolute top-4 right-4 w-7 h-7 bg-black bg-opacity-20 flex items-center justify-center rounded-full cursor-pointer lg:hidden"
            >
              <HiX />
            </span>

            <div
              className="h-[300px] bg-center bg-cover rounded-t-lg"
              style={{
                backgroundImage: `url('${
                  eventData?.image || "/img/birthday-cake.png"
                }')`,
              }}
            ></div>

            <div className="p-6">
              <h3 className="primary-heading-color">
                {eventData.name || "Birthday Bash"}
              </h3>
              <p className="text-muted">
                Hosted by <strong>{eventData.hostedBy || "Elysia"}</strong>
              </p>

              <div className="mt-6">
                <InfoRow icon={<HiOutlineCalendar className="w-6 h-6" />}>
                  <h4 className="primary-heading-color font-semibold">
                    {eventData.startDateTime
                      ? dayjs(eventData.startDateTime).format("D MMM h:mmA")
                      : "18 August 6:00PM"}
                  </h4>
                  <p className="text-muted">
                    to{" "}
                    {eventData.startDateTime
                      ? dayjs(eventData.endDateTime).format("D MMM h:mmA")
                      : "18 August 6:00PM"}
                  </p>
                </InfoRow>

                <InfoRow icon={<HiOutlineLocationMarker className="w-6 h-6" />}>
                  <h4 className="primary-heading-color font-semibold">
                    {eventData?.street || "Street name"}
                  </h4>
                  <p className="text-muted">
                    {eventData?.otherLocationInfo || "Suburb, State, Postcode"}
                  </p>
                </InfoRow>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreateEventPage;
