import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SideBar } from "./SideBar";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Navbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const favoritesRef = useRef(null);
  const { store, dispatch } = useGlobalReducer();

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsideSearch =
        searchRef.current && !searchRef.current.contains(e.target);
      const clickedOutsideFavorites =
        favoritesRef.current && !favoritesRef.current.contains(e.target);

      if (clickedOutsideSearch) {
        setQuery("");
        setResults([]);
        setShowSearch(false);
      }

      if (clickedOutsideFavorites) {
        setShowFavorites(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.trim()) {
      setResults([]);
      return;
    }

    const categories = store.arrWhats.filter((type) => type !== "Films");
    let allResults = [];

    categories.forEach((type) => {
      const data = JSON.parse(localStorage.getItem(`arr${type}`) || "[]");
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      allResults = allResults.concat(
        filtered.map((item) => ({ ...item, type }))
      );
    });

    setResults(allResults);
  };

  const deleteFavorite = (index) => {
    dispatch({ type: "Delete_Like", payload: index });
  };

  return (
    <header className="sticky-top">
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow px-3">
        <div className="container-fluid">
          {/* Mobile layout */}
          <div className="d-flex d-lg-none align-items-center justify-content-between w-100">
            {/* Left: Toggler */}
            <button
              className="btn"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasMenu"
              aria-controls="offcanvasMenu"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Center: Brand */}
            <div className="flex-grow-1 d-flex justify-content-center">
              <a className="navbar-brand mb-0 h1" href="/">
                Star Wars
              </a>
            </div>

            {/* Right: Icons */}
            <div className="d-flex align-items-center gap-2">
              <div className="position-relative" ref={searchRef}>
                <button
                  className="btn btn-outline-secondary btn-sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSearch((prev) => !prev);
                  }}
                >
                  <i className="fas fa-search" />
                </button>

                {showSearch && (
                  <form
                    className="position-absolute mt-2"
                    style={{ zIndex: 1000, right: 0, width: "250px" }}
                    onClick={(e) => e.stopPropagation()} // Prevent closing on input click
                  >
                    <input
                      className="form-control"
                      type="text"
                      value={query}
                      onChange={handleSearch}
                      placeholder="Search..."
                      autoFocus
                    />
                    {results.length > 0 && (
                      <ul className="list-group shadow mt-1">
                        {results.map((item) => (
                          <li
                            className="list-group-item list-group-item-action"
                            key={`${item.uid}-${item.type}`}
                          >
                            <Link
                              to={`/detail/${item.type}/${item.uid}`}
                              className="text-decoration-none d-block "
                            >
                              {item.name}{" "}
                              <small className="text-muted">
                                ({item.type})
                              </small>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </form>
                )}
              </div>

              <div className="position-relative " ref={favoritesRef}>
                <button
                  className="btn btn-outline-warning btn-sm position-relative"
                  onClick={() => setShowFavorites((prev) => !prev)}
                >
                  <i className="fas fa-heart" />

                  {store.favorites.length > 0 && (
                    <span
                      className={`position-absolute top-0 start-0 translate-middle badge rounded-pill ${
                        store.theme === "dark"
                          ? "text-bg-light"
                          : "text-bg-dark"
                      }`}
                    >
                      {store.favorites.length}
                    </span>
                  )}
                </button>

                {showFavorites && store.favorites.length > 0 && (
                  <ul
                    className="list-group position-absolute mt-2 end-0 shadow"
                    style={{ minWidth: "250px", zIndex: 1000 }}
                  >
                    {store.favorites.map(({ name, what, uid }, index) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={`${uid}-${what}`}
                      >
                        <Link
                          to={`/details/${what}/${uid}`}
                          className="text-decoration-none flex-grow-1"
                        >
                          {name}
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => deleteFavorite(index)}
                        >
                          <i className="fa-regular fa-trash-can fa-sm" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="position-relative">
                <button
                  className={`btn btn-sm ${
                    store.theme === "dark"
                      ? "btn-outline-info"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => dispatch({ type: "TOGGLE_THEME" })}
                >
                  {store.theme === "dark" ? (
                    <i className="fas fa-sun" title="Switch to Light Mode" />
                  ) : (
                    <i className="fas fa-moon" title="Switch to Dark Mode" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="collapse navbar-collapse justify-content-between d-none d-lg-flex">
            <a className="navbar-brand" href="/">
              Star Wars
            </a>

            <form
              className="d-flex my-1 position-relative"
              style={{ width: "300px" }}
              ref={searchRef}
            >
              <div className="w-100 position-relative">
                <input
                  className="form-control"
                  type="text"
                  value={query}
                  onChange={handleSearch}
                  placeholder="Search characters, planets, vehicles..."
                />
                {results.length > 0 && (
                  <ul
                    className="list-group position-absolute w-100 shadow"
                    style={{ zIndex: 1000, top: "100%", left: 0 }}
                  >
                    {results.map((item) => (
                      <li
                        className="list-group-item list-group-item-action"
                        key={`${item.uid}-${item.type}`}
                      >
                        <Link
                          to={`/detail/${item.type}/${item.uid}`}
                          className="text-decoration-none d-block "
                        >
                          {item.name}{" "}
                          <small className="text-muted">({item.type})</small>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </form>
            <div className="d-flex align-items-center gap-2">
              <div className="position-relative" ref={favoritesRef}>
                <button
                  className="btn btn-outline-warning position-relative"
                  onClick={() => setShowFavorites((prev) => !prev)}
                >
                  <i className="fas fa-heart" />
                  {store.favorites.length > 0 && (
                    <span
                      className={`position-absolute top-0 start-0 translate-middle badge rounded-pill ${
                        store.theme === "dark"
                          ? "text-bg-light"
                          : "text-bg-dark"
                      }`}
                    >
                      {store.favorites.length}
                    </span>
                  )}
                </button>

                {showFavorites && store.favorites.length > 0 && (
                  <ul
                    className="list-group position-absolute end-0 mt-2 shadow"
                    style={{ minWidth: "250px", zIndex: 1000 }}
                  >
                    {store.favorites.map(({ name, what, uid }, index) => (
                      <li
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={`${uid}-${what}`}
                      >
                        <Link
                          to={`/details/${what}/${uid}`}
                          className="text-decoration-none flex-grow-1"
                        >
                          {name}
                        </Link>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => deleteFavorite(index)}
                        >
                          <i className="fa-regular fa-trash-can fa-sm" />
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="position-relative">
                <button
                  className={`btn ${
                    store.theme === "dark"
                      ? "btn-outline-info"
                      : "btn-outline-danger"
                  }`}
                  onClick={() => dispatch({ type: "TOGGLE_THEME" })}
                >
                  {store.theme === "dark" ? (
                    <i className="fas fa-sun" title="Switch to Light Mode" />
                  ) : (
                    <i className="fas fa-moon" title="Switch to Dark Mode" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Offcanvas Side Menu */}
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="offcanvasMenu"
        aria-labelledby="offcanvasMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <hr className="my-2 mx-3" />
        <div className="offcanvas-body">
          <SideBar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
