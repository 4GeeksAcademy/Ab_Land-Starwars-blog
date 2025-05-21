import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Listing } from "./pages/Listing";
import { FullDetails } from "./pages/FullDetails";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<Layout />}
      errorElement={
        Math.random() > 0.49 ? (
          <h1 className="d-flex-center-vh text-info">
            Not found In The Light!
          </h1>
        ) : (
          <h1 className="d-flex-center-vh bg-dark text-danger">
            Not found In The Darkside!
          </h1>
        )
      }
    >
      {/* Nested Routes: Defines sub-routes within the BaseHome component. */}
      <Route path="/" element={<Home />} />
      <Route path="/listing/:what" element={<Listing />} />
      <Route path="/details/:what/:uid" element={<FullDetails />} />
    </Route>
  )
);
