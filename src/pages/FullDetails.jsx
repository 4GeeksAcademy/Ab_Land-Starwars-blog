import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export const FullDetails = () => {
  const [objResults, setObjResults] = useState({});
  const [objProperties, setObjProperties] = useState({});
  const [objPlanet, setObjPlanet] = useState({});

  const { what, uid } = useParams();

  const imageUrl = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/${what}/${uid}.jpg`;
  const fallbackImg = `https://raw.githubusercontent.com/tbone849/star-wars-guide/refs/heads/master/build/assets/img/placeholder.jpg`;

  useEffect(() => {
    if (what.toLowerCase() === "characters") {
      peopleGET();
    } else {
      detailsOfGET();
    }
  }, [what]);

  useEffect(() => {
    if (objProperties?.homeworld) {
      PlanetGET();
    }
  }, [objProperties?.homeworld]);

  const peopleGET = () => {
    fetch(`https://www.swapi.tech/api/people/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setObjProperties(data.result.properties);
        setObjResults(data.result);
      })
      .catch((err) => console.error(err));
  };

  const PlanetGET = () => {
    fetch(objProperties.homeworld)
      .then((res) => res.json())
      .then((data) => {
        setObjPlanet(data.result);
      })
      .catch((err) => console.error(err));
  };

  const detailsOfGET = () => {
    fetch(`https://www.swapi.tech/api/${what}/${uid}`)
      .then((res) => res.json())
      .then((data) => {
        setObjResults(data.result);
        setObjProperties(data.result.properties);
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <div className="card m-2 rounded ">
        <div className="row g-0 ">
          <div className="col-lg-5 ">
            <img
              src={imageUrl}
              className="img-fluid rounded-start w-auto cover-100-h"
              alt={`A picture of ${objProperties.name || objProperties.title}`}
              onError={(e) => {
                e.target.src = fallbackImg;
              }}
            />
          </div>

          <div className="col-lg-7">
            <div className="card-body ">
              <h5 className="card-title">
                {objProperties.name || objProperties.title}
              </h5>

              {what.toLowerCase() === "characters" && (
                <>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Born in :</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.birth_year}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Gender:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.gender}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Height:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.height}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Mass:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.mass}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Eye Color:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.eye_color}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Hair Color:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.hair_color}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Skin Color:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.skin_color}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Home:</span>
                    <Link
                      className="form-control m-0 mx-auto border-0 w-50 "
                      to={`/details/planets/${objPlanet?.uid || "Unknown"}`}
                    >
                      <p className="m-0">
                        {objPlanet?.properties?.name || "Unknown"}
                      </p>
                    </Link>
                  </span>
                </>
              )}

              {what.toLowerCase() === "planets" && (
                <>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Name:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.name}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Climate:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.climate}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Terrain:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.terrain}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Population:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.population}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Gravity:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.gravity}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Diameter:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.diameter} <small>km</small>
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Surface Water:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.surface_water} <small>%</small>
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Orbital Period:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.orbital_period} days
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Rotation Period:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.rotation_period} hours
                    </p>
                  </span>
                </>
              )}

              {what.toLowerCase() === "films" && (
                <>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Episode:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.episode_id}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Director:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.director}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Producer:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.producer}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Release Date:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50 ">
                      {objProperties.release_date}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Opening:</span>
                    <p className="form-control m-0 mx-auto border-0 w-60-text">
                      {objProperties.opening_crawl}
                    </p>
                  </span>
                </>
              )}

              {what.toLowerCase() === "species" && (
                <>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Classification:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.classification}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Designation:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.designation}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Language:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.language}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Average Height:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.average_height}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Average Lifespan:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.average_lifespan}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Eye Colors:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.eye_colors}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Hair Colors:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.hair_colors}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Skin Colors:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.skin_colors}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Homeworld:</span>
                    <Link
                      className="form-control m-0 mx-auto border-0 w-50"
                      to={`/details/planets/${objPlanet?.uid || "Unknown"}`}
                    >
                      <p className="m-0">
                        {objPlanet?.properties?.name || "Unknown"}
                      </p>
                    </Link>
                  </span>
                </>
              )}

              {what.toLowerCase() === "starships" && (
                <>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Name:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.name}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Model:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.model}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Starship Class:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.starship_class}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Manufacturer:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.manufacturer}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Cost in Credits:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.cost_in_credits}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Length:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.length}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Crew:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.crew}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Passengers:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.passengers}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Cargo Capacity:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.cargo_capacity}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Consumables:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.consumables}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Hyperdrive Rating:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.hyperdrive_rating}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Max Atmosphering Speed:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.max_atmosphering_speed}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">MGLT:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.MGLT}
                    </p>
                  </span>
                </>
              )}

              {what.toLowerCase() === "vehicles" && (
                <>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Model:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.model}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Manufacturer:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.manufacturer}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Cost in Credits:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.cost_in_credits}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Length:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.length}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Crew:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.crew}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Passengers:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.passengers}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Cargo Capacity:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.cargo_capacity}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">Consumables:</span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.consumables}
                    </p>
                  </span>
                  <span className="input-group-text">
                    <span className="ms-0 text-start w-20">
                      Max Atmosphering Speed:
                    </span>
                    <p className="form-control m-0 mx-auto border-0 w-50">
                      {objProperties.max_atmosphering_speed}
                    </p>
                  </span>
                </>
              )}

              <p className="card-text">{objResults.description}</p>
              <p className="card-text">
                <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
