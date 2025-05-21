import React from "react";
import { Card } from "../components/Card.jsx";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Listing = () => {
  const [arrList, setArrList] = useState([]);

  const { what } = useParams();

  useEffect(() => {
    if (what.toLowerCase() === "characters") {
      peoplesGET();
    } else {
      TwentyOfGET(what);
    }
  }, [what]);

  const peoplesGET = () => {
    fetch("https://www.swapi.tech/api/people?limit=20")
      .then((res) => res.json())
      .then((data) => {
        setArrList(data.results);
      })
      .catch((err) => console.error(err));
  };

  const TwentyOfGET = (what) => {
    fetch(`https://www.swapi.tech/api/${what}?limit=20`)
      .then((res) => res.json())
      .then((data) => {
        if (what.toLowerCase() === "films") {
          setArrList(data.result);
        } else {
          setArrList(data.results);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="container-fluid">
      <h4> {what} </h4>
      <div className="d-flex flex-wrap gap-3 pe-3 justify-content-start">
        {arrList.map(({ uid, name, url }, index, array) => {
          return (
            <Card uid={uid} name={name} url={url} what={what.toLowerCase()} />
          );
        })}
      </div>
    </div>
  );
};
