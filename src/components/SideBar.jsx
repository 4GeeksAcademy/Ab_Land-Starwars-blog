import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const SideBar = () => {
  const { store, dispatch } = useGlobalReducer();

  return (
    <>
      <div className="d-flex align-items-center mb-3 ">
        <span className="fw-bold ps-2">Look in the Force</span>
      </div>

      <ul className="nav nav-pills flex-column mb-auto">
        {store.arrWhats.map((what) => {
          return (
            <li>
              <Link to={`listing/${what}`}>
                <p className="nav-link ">{what}</p>
              </Link>
            </li>
          );
        })}
        <li>
          <a href="#" className="nav-link ">
            More
          </a>
        </li>
      </ul>
    </>
  );
};
