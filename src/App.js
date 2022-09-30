import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import PageContextProvider from "./context/EventContextProvider";
import "./App.css";

const HomePage = lazy(() => import("./pages/HomePage"));
const EventPage = lazy(() => import("./pages/EventPage"));
const CreateEventPage = lazy(() => import("./pages/CreateEventPage"));

function App() {
  return (
    <PageContextProvider>
      <Suspense fallback="loading...">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreateEventPage />} />
          <Route path="/event" element={<EventPage />} />
        </Routes>
      </Suspense>
    </PageContextProvider>
  );
}

export default App;
