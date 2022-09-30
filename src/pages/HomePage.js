import React, { useContext } from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <section className="main-section flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-20 px-4">
      <div className="order-2 lg:order-1">
        <img
          src="/img/landing-page-image.svg"
          alt="Hero"
          className="main-image w-[50%] md:w-[70%] mx-auto lg:max-w-full mt-6 lg:mt-0"
        />
      </div>
      <div className="text-center lg:text-right order-1 lg:order-2 flex flex-col lg:items-end">
        <h1>
          Imagine if
          <br />
          <span className="text-gradient">Snapchat</span>
          <br />
          had events.
        </h1>
        <p className="text-muted mt-3 max-w-xs secondary-description">
          Easily host and share events with your friends across any social
          media.
        </p>

        <Link to="/create" className="hidden lg:block">
          <button className="btn mt-8">🎉 Create my event</button>
        </Link>
      </div>
      <div className="lg:hidden order-3">
        <Link to="/create">
          <button className="btn mt-8">🎉 Create my event</button>
        </Link>
      </div>
    </section>
  );
};

export default HomePage;
