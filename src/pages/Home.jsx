import rigoImageUrl from "../assets/img/rigo-baby.jpg";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";
import { Card } from "../components/Card.jsx";
import { useState, useEffect } from "react";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();

  const [arrCharacters, setArrCharacters] = useState([]);
  const [arrPlanets, setArrPlanets] = useState([]);
  const [arrFilms, setArrFilms] = useState([]);
  const [arrSpecies, setArrSpecies] = useState([]);
  const [arrStarships, setArrStarships] = useState([]);
  const [arrVehicles, setArrVehicles] = useState([]);

  useEffect(() => {
    peoplesGET();
    GETTenOf("Planets");
    filmsGET();
    GETTenOf("Species");
    GETTenOf("Starships");
    GETTenOf("Vehicles");
  }, []);

  const peoplesGET = () => {
    if (localStorage.getItem("arrCharacters") == null) {
      fetch("https://www.swapi.tech/api/people?limit=10")
        .then((res) => res.json())
        .then((data) => {
          setArrCharacters(data.results);
          localStorage.setItem("arrCharacters", JSON.stringify(data.results));
        })
        .catch((err) => console.error(err));
    } else setArrCharacters(JSON.parse(localStorage.getItem("arrCharacters")));
  };

  const filmsGET = () => {
    if (localStorage.getItem("arrFilms") == null) {
      fetch("https://www.swapi.tech/api/films?limit=10")
        .then((res) => res.json())
        .then((data) => {
          setArrFilms(data.result);
          localStorage.setItem("arrFilms", JSON.stringify(data.result));
        })
        .catch((err) => console.error(err));
    } else setArrFilms(JSON.parse(localStorage.getItem("arrFilms")));
  };

  const GETTenOf = (what) => {
    const key = `arr${what}`;
    const storedData = localStorage.getItem(key);

    if (storedData === null) {
      fetch(`https://www.swapi.tech/api/${what}?limit=10`)
        .then((res) => res.json())
        .then((data) => {
          const results = data.results;

          switch (what) {
            case "Planets":
              setArrPlanets(results);
              break;
            case "Species":
              setArrSpecies(results);
              break;
            case "Starships":
              setArrStarships(results);
              break;
            case "Vehicles":
              setArrVehicles(results);
              break;
          }

          localStorage.setItem(key, JSON.stringify(results));
        })
        .catch((err) => console.error(err));
    } else {
      const parsedData = JSON.parse(storedData);

      switch (what) {
        case "Planets":
          setArrPlanets(parsedData);
          break;
        case "Species":
          setArrSpecies(parsedData);
          break;
        case "Starships":
          setArrStarships(parsedData);
          break;
        case "Vehicles":
          setArrVehicles(parsedData);
          break;
      }
    }
  };

  return (
    <>
      <div className="container-fluid">
        <h4> Characters </h4>
        <div className="d-flex overflow-auto gap-3 pe-3">
          {arrCharacters.map(({ uid, name, url }, index, array) => {
            return <Card uid={uid} name={name} url={url} what="characters" />;
          })}
        </div>
      </div>

      <div className="container-fluid my-3">
        <h4> Planets </h4>
        <div className="d-flex overflow-auto gap-3 pe-3">
          {arrPlanets.map(({ uid, name, url }, index, array) => {
            return <Card uid={uid} name={name} url={url} what="planets" />;
          })}
        </div>
      </div>

      <div className="container-fluid my-3">
        <h4> Species </h4>
        <div className="d-flex overflow-auto gap-3 pe-3">
          {arrSpecies.map(({ uid, name, url }, index, array) => {
            return <Card uid={uid} name={name} url={url} what="species" />;
          })}
        </div>
      </div>

      <div className="container-fluid my-3">
        <h4> Starships </h4>
        <div className="d-flex overflow-auto gap-3 pe-3">
          {arrStarships.map(({ uid, name, url }, index, array) => {
            return <Card uid={uid} name={name} url={url} what="starships" />;
          })}
        </div>
      </div>

      <div className="container-fluid my-3">
        <h4> Vehicles </h4>
        <div className="d-flex overflow-auto gap-3 pe-3">
          {arrVehicles.map(({ uid, name, url }, index, array) => {
            return <Card uid={uid} name={name} url={url} what="vehicles" />;
          })}
        </div>
      </div>

      <div className="container-fluid my-3">
        <h4> Films </h4>
        <div className="d-flex overflow-auto gap-3 pe-3">
          {arrFilms.map(({ uid, name, url }, index, array) => {
            return <Card uid={uid} name={name} url={url} what="films" />;
          })}
        </div>
      </div>
    </>
  );
};
