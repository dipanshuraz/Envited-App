import { useContext, useEffect, useState } from "react";
import { InfoRow } from "../components";
import { HiOutlineLocationMarker, HiOutlineCalendar } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { EventContext } from "../context/EventContextProvider";

const EventPage = () => {
  const { eventData, setEventData } = useContext(EventContext);
  const navigate = useNavigate();

  useEffect(() => {
    const localData = localStorage.getItem("create-event-data");
    console.log(localData, "localData");

    if (!localData) {
      navigate("/create?error=true");
      return;
    }

    setEventData(JSON.parse(localData));
  }, []);

  return (
    <section className="bg-[#FBFAFF] flex md:justify-center md:items-center">
      <div className="p-0 flex md:items-center md:justify-center flex-col lg:flex-row lg:space-x-20">
        <div className="lg:flex-1 order-2 lg:order-1 p-6 md:p-0 w-full">
          <h2>{eventData?.name}</h2>
          <p className="text-muted">Hosted by {eventData?.hostedBy}</p>

          <div className="my-6">
            <InfoRow icon={<HiOutlineCalendar className="w-6 h-6" />}>
              <h4 className="primary-heading-color font-semibold">
                {dayjs(eventData?.startDateTime).format("D MMM h:mmA")}
              </h4>
              <p className="text-muted">
                to {dayjs(eventData?.startDateTime).format("D MMM h:mmA")}
              </p>
            </InfoRow>

            <InfoRow icon={<HiOutlineLocationMarker className="w-6 h-6" />}>
              <h4 className="primary-heading-color font-semibold">
                {eventData?.street || "No street provided"}
              </h4>
              <p className="text-muted">{eventData?.otherLocationInfo}</p>
            </InfoRow>
          </div>

          <Link to="/create?edit=true">
            <a className="text-sm text-muted cursor-pointer">← Edit Details</a>
          </Link>
        </div>
        <div className="lg:flex-1 order-1 lg:order-2">
          <img
            src={eventData?.image || "/img/birthday-cake.png"}
            className="w-full md:max-w-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default EventPage;
