import React from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ uid, name, url, what }) => {
  const holdUid = uid || "placeholder";
  const holdName = name || "Unknown";
  const holdUrl = url || "#";
  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${what}/${holdUid}.jpg`;
  const fallbackImg = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg`;

  const { store, dispatch } = useGlobalReducer();

  const addFavorite = () => {
    const objAddLike = { name: holdName, what: what, uid: holdUid };
    dispatch({ type: "Add_Like", payload: objAddLike });
  };

  return (
    <div className={`card m-1 ${what.toLowerCase() == "films"? 'card-tiny-films':'card-tiny'}`} style={{ minWidth: "225px" }}>
      <img
        src={imageUrl}
        className="card-img-top"
        alt={`A picture of ${holdName}`}
        onError={(e) => {
          e.target.src = fallbackImg;
        }}
      />
      {what.toLowerCase() !== "films" && (<div className="card-body">
        <h5 className="card-title">{holdName}</h5>
      </div>)}
      <div className="d-flex card-footer">
        <Link to={`/details/${what}/${uid}`}>
          <button className="btn btn-outline-info btn-sm" onClick={() => {}}>
            More
          </button>
        </Link>
        <button
          className="btn btn-outline-warning  btn-sm ms-auto"
          onClick={() => {
            addFavorite();
          }}
        >
          <i className="fa-solid fa-heart"></i>
        </button>
      </div>
    </div>
  );
};
